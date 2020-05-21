const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const { setToken, decodeToken } = require('../helpers/auth');
const User = require('./user.model');
const Cart = require('./cart.model');
const Product = require('../product/product.model');

const resolvers = {
  Query: {
    user: async (_, { id, email, token }, { res }) => {
      const findJson = {};
      if (id) findJson._id = id;
      if (email) findJson.email = email;
      console.log('res token', token);
      if (token) {
        const decodedToken = await decodeToken(token);
        console.log('res decoded', decodedToken);
        if (decodedToken) {
          console.log(decodedToken.id);
          const user = await User.findById({ _id: decodedToken.id }).exec();
          console.log('res user', user);
          return User.findById(decodedToken.id).exec();
        }
        return new Error('Invalid token');
      }
      if (id || email) return User.findOne(findJson).exec();
      return new Error('No user fetched');
    },
    cart: async (parent, { id }) => {
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
    addToCart: async (_, { userId, productId }) => {
      const user = await User.findById(userId, 'cart');
      const product = await Product.findById({ _id: productId });
      user.cart.products.push(product);
      user.cart.total += 1;
      const updatedUser = await user.save();
      return updatedUser.cart;
    },
    loginUser: async (_, { email, password }, { res }) => {
      let isValid = false;
      const user = await User.findOne({ email }).exec();
      if (!user) return null;

      if (email === user.email) {
        isValid = await bcrypt.compareSync(password, user.password);
      }

      if (isValid) {
        const token = await setToken(user.email, user._id);
        console.log('login token cooke', token);
        res.cookie('access', token, { httpOnly: true });
        return {
          _id: user._id,
          email,
          cart: user.cart,
          token,
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
