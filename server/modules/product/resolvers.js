const Product = require('./product.model');

const resolvers = {
  Query: {
    product: async (parent, { id }) => Product.findById({ _id: id }).exec(),
    products: (parent, { limit = 16 }) => {
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
