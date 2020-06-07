const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  voters: {
    type: Number,
    default: 0,
  },
});

const cartProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
    default: 1,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  voters: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('product', productSchema);
const cartProduct = mongoose.model('cartProduct', cartProductSchema);

module.exports = { Product, cartProduct };
