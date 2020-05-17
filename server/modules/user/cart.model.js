const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  products: [],
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = model('cart', cartSchema);
