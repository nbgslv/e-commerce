const productResolvers = require('./product/resolvers');
const userResolver = require('./user/resolvers');
const categoryResolver = require('./category/resolvers');

module.exports = [productResolvers, userResolver, categoryResolver];
