const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const { setToken, decodeToken } = require('../helpers/auth');
const User = require('./user.model');
const Cart = require('./cart.model');
const { Product, cartProduct } = require('../product/product.model');

const resolvers = {
  Query: {
    user: async (_, { id, email }) => {
      const findJson = {};
      if (id) findJson._id = id;
      if (email) findJson.email = email;
      if (id || email) return User.findOne(findJson).exec();
      return new Error('No user fetched');
    },
    cart: async (_, __, { id }) => {
      const user = await User.findById({ _id: id }, 'cart').exec();
      return user.cart;
    },
  },
  Mutation: {
    addUser: (_, user) => {
      const newUser = new User({
        email: user.email,
        password: user.password,
        cart: new Cart(),
      });

      return newUser.save();
    },
    addToCart: async (_, { productId }, { id: userId }) => {
      const user = await User.findById(userId, 'cart');
      let addedProduct = false;
      user.cart.products.map(async product => {
        if (product._id.toString() === productId.toString()) {
          product.quantity += 1;
          addedProduct = true;
        }
      });
      if (!addedProduct) {
        const productImage = await Product.findById({ _id: productId });
        // eslint-disable-next-line new-cap
        user.cart.products.push(new cartProduct(productImage));
      }
      user.cart.total += 1;
      user.cart.markModified('products');
      const updatedUser = await user.save();
      return updatedUser.cart;
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
      return updatedUser.cart;
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
      res.clearCookie('access');
      return true;
    },
  },
};

module.exports = resolvers;
