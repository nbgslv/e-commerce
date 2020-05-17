const { gql } = require('apollo-server');

const productTypeDefs = require('./product/typeDefs');
const userTypeDefs = require('./user/typeDefs');
const categoryTypeDefs = require('./category/typeDefs');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, productTypeDefs, userTypeDefs, categoryTypeDefs];
