const { ApolloError, AuthenticationError } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const bcrypt = require('bcryptjs');
const { setToken, decodeToken } = require('../helpers/auth');
const User = require('./user.model');
const Cart = require('./cart.model');
const { Product, cartProduct } = require('../product/product.model');

const pubsub = new PubSub(); // create a PubSub instance
const CART_CHANGED = 'cartChanged';

const decimalToString = products => {
  products.map(product => {
    product.price = product.price.toString();
    return true;
  });
  return products;
};

const resolvers = {
  Query: {
    getUser: async (_, __, { id, res }) => {
      console.log(id);
      if (id) {
        const user = await User.findById(id);
        user.cart.products = decimalToString(user.cart.products);
        return user;
      }
      throw new AuthenticationError(
        "User credentials couldn't be found. Please login and try again."
      );
    },
    cart: async (_, __, { id }) => {
      const user = await User.findById({ _id: id }, 'cart').exec();
      user.cart.products = decimalToString(user.cart.products);
      if (user) return user.cart;
      throw new ApolloError("Couldn't retrieve cart details.");
    },
  },
  Mutation: {
    addUser: (_, user) => {
      const newUser = new User({
        email: user.email,
        password: user.password,
        cart: new Cart(),
      });
      newUser.save().exec((res, err) => {
        if (res) return res;
        throw new ApolloError(`User registration failed. ${err.message()}`);
      });
    },
    addToCart: async (_, { productId }, { id: userId }) => {
      const user = await User.findById(userId, 'cart');
      let productAdded;
      let addedProduct = false;
      user.cart.products.map(async product => {
        if (product._id.toString() === productId.toString()) {
          // eslint-disable-next-line no-param-reassign
          product.quantity += 1;
          productAdded = product;
          addedProduct = true;
        }
      });
      if (!addedProduct) {
        const product = await Product.findById({ _id: productId });
        // eslint-disable-next-line new-cap
        productAdded = new cartProduct(product);
        user.cart.products.push(productAdded);
      }
      user.cart.total += 1;
      user.cart.markModified('products');
      await pubsub.publish(CART_CHANGED, { cartChanged: user.cart });
      user.save().exec((res, err) => {
        if (res) return productAdded;
        throw new ApolloError(`Adding item to cart failed. ${err.message()}`);
      });
    },
    removeFromCart: async (_, { productId }, { id: userId }) => {
      const user = await User.findById(userId, 'cart');
      let quantity = 0;
      const updatedProducts = user.cart.products.filter(product => {
        if (product._id.toString() !== productId.toString()) {
          return true;
        }
        quantity = product.quantity;
        return false;
      });
      user.cart.total -= quantity;
      user.cart.products = updatedProducts;
      const updatedUser = await user.save();
      updatedUser.cart.products = decimalToString(updatedUser.cart.products);
      await pubsub.publish(CART_CHANGED, { cartChanged: user.cart });
      return updatedUser.cart;
    },
    changeQuantity: async (_, { productId, quantity }, { id: userId }) => {
      const user = await User.findById(userId, 'cart');
      let lastQuantity;
      user.cart.products.map(product => {
        if (product._id.toString() === productId.toString()) {
          lastQuantity = product.quantity;
          // eslint-disable-next-line no-param-reassign
          product.quantity = quantity;
        }
      });
      user.cart.total += quantity - lastQuantity;
      user.cart.markModified('products');
      const updatedUser = await user.save();
      updatedUser.cart.products = decimalToString(updatedUser.cart.products);
      await pubsub.publish(CART_CHANGED, { cartChanged: user.cart });
      return updatedUser.cart;
    },
    emptyCart: async (_, __, { id }) => {
      const user = await User.findById(id, 'cart');
      user.cart.products = [];
      user.cart.total = 0;
      await pubsub.publish(CART_CHANGED, { cartChanged: user.cart });
      await user.save().exec((res, err) => {
        if (res) return true;
        throw new ApolloError(`Couldn't empty cart. ${err.message()}`);
      });
    },
    loginUser: async (_, { email, password }, { res }) => {
      let isValid = false;
      const user = await User.findOne({ email }).exec();
      if (!user) throw new AuthenticationError('Please provide (valid) authentication details');

      if (email === user.email) {
        isValid = await bcrypt.compareSync(password, user.password);
      }

      if (isValid) {
        const token = await setToken(user.email, user._id);
        res.cookie('token', token, {
          httpOnly: true,
        });
        return {
          success: true,
        };
      }
      throw new AuthenticationError('Please provide (valid) authentication details');
    },
    logoutUser: (_, __, { res }) => {
      res.clearCookie('token');
      return true;
    },
  },
  Subscription: {
    cartChanged: {
      subscribe: () => pubsub.asyncIterator([CART_CHANGED]),
    },
  },
};

module.exports = resolvers;
