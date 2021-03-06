const mongoose = require('mongoose');
const { Product } = require('./product.model');

const resolvers = {
  Query: {
    product: async (_, { id }) => Product.findById({ _id: id }).exec(),
    products: (_, { limit, category }) => {
      if (category) return Product.find({ category }).limit(limit);
      return Product.find({}).limit(limit);
    },
  },
  Mutation: {
    addProduct: (parent, product) => {
      const newProduct = new Product({
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        category: product.category,
        rating: product.rating,
        voters: product.voters,
      });

      return newProduct.save();
    },
    updateProductRating: async (parent, { id, rating }) => {
      await Product.findById(id, (err, product) => {
        product.rating += rating;
        product.voters += 1;
        product.save();
      }).exec();
      return Product.findById(id);
    },
  },
};

module.exports = resolvers;
