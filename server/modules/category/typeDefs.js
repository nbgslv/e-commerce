const { gql } = require('apollo-server');

const typeDefs = gql`
  type Category {
    _id: String!
    title: String!
  }
  extend type Query {
    category(id: String!): Category
    categories: [Category]
  }
  extend type Mutation {
    addCategory(title: String!): Category
  }
`;

module.exports = typeDefs;
