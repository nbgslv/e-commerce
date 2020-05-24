const { gql } = require('apollo-server');

const typeDefs = gql`
  interface GenProduct {
    _id: String!
    title: String!
    thumbnail: String!
    price: Float!
    category: String!
    rating: Int
    voters: Int
  }
  type Product {
    _id: String!
    title: String!
    thumbnail: String!
    price: Float!
    category: String!
    rating: Int
    voters: Int
  }
  type CartProduct {
    _id: String
    title: String
    quantity: Int
    thumbnail: String
    price: Float
    category: String
    rating: Int
    voters: Int
  }
  extend type Query {
    product(id: String!): Product
    products(limit: Int): [Product]
  }
  extend type Mutation {
    addProduct(
      title: String!
      thumbnail: String!
      price: Float!
      category: String!
      rating: Int
      voters: Int
    ): Product
    updateProductRating(id: String!, rating: Int!): Product
  }
`;

module.exports = typeDefs;
