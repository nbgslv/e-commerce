const Category = require('./category.model');

const resolvers = {
  Query: {
    category: async (parent, { id }) => Category.findById({ _id: id }).exec(),
    categories: () => Category.find({}),
  },
  Mutation: {
    addCategory: (parent, category) => {
      const newCategory = new Category({
        title: category.title,
      });
      return newCategory.save();
    },
  },
};

module.exports = resolvers;
