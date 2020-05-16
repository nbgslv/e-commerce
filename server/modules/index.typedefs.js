const { gql } = require('apollo-server');

const productTypeDefs = require('./product/typeDefs');
const cartTypeDefs = require('./user/typeDefs');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, productTypeDefs, cartTypeDefs];
