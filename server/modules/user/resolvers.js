const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const { tokenCookie, setToken } = require('../helpers/auth');
const User = require('./user.model');
const Cart = require('./cart.model');
const Product = require('../product/product.model');

const resolvers = {
  Query: {
    user: async (parent, { id, email }) => {
      const findJson = {};
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
    loginUser: async (_, { userName, password }, { res }) => {
      let isValid = false;
      const user = await User.findOne({ email: userName }).exec();

      if (userName === user.email) {
        isValid = await bcrypt.compareSync(password, user.password);
      }

      if (isValid) {
        const token = setToken(user.email, user._id);
        const cookie = tokenCookie(token);
        res.cookie(...cookie);
        return {
          email: userName,
          cart: user.cart,
        };
      }
      throw new AuthenticationError('Please provide (valid) authentication details');
    },
  },
};

module.exports = resolvers;
