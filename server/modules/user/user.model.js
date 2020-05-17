const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Cart = require('./cart.model');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: Cart.schema,
});

// eslint-disable-next-line consistent-return
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // eslint-disable-next-line consistent-return
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // eslint-disable-next-line consistent-return,no-shadow
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = model('user', userSchema);

module.exports = User;
