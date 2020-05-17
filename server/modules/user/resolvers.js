const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const JsonWebToken = require('jsonwebtoken');
const User = require('./user.model');
const Cart = require('./cart.model');
const Product = require('../product/product.model');

const jwtSecret = '34%%##@#FGFKFL'; // TODO move to env

const resolvers = {
  Query: {
    user: async (parent, { id, email }) => {
      const findJson = {};
      // eslint-disable-next-line no-underscore-dangle
      if (id) findJson._id = id;
      if (email) findJson.email = email;
      return User.findOne(findJson).exec();
    },
    cart: async (parent, { id }) => {
      const user = await User.findById({ _id: id }, 'cart').exec();
      return user.cart;
    },
  },
  Mutation: {
    addUser: (parent, user) => {
      const newUser = new User({
        email: user.email,
        password: user.password,
        cart: new Cart(),
      });

      return newUser.save();
    },
    addToCart: async (parent, { userId, productId }) => {
      const user = await User.findById(userId, 'cart');
      const product = await Product.findById({ _id: productId });
      user.cart.products.push(product);
      user.cart.total += 1;
      const updatedUser = await user.save();
      return updatedUser.cart;
    },
    loginUser: async (_, { userName, password }) => {
      let isValid = false;
      const user = await User.findOne({ email: userName }).exec();

      if (userName === user.email) {
        isValid = await bcrypt.compareSync(password, user.password);
      }

      if (isValid) {
        const token = JsonWebToken.sign({ user: user.email }, jwtSecret, {
          expiresIn: 3600,
        });
        return {
          email: userName,
          cart: user.cart,
          token,
        };
      }
      throw new AuthenticationError('Please provide (valid) authentication details');
    },
  },
};

module.exports = resolvers;
