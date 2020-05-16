const productResolvers = require('./product/resolvers');
const cartResolver = require('./user/resolvers');

module.exports = [productResolvers, cartResolver];
