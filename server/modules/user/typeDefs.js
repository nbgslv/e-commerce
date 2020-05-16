const { gql } = require('apollo-server');

const typeDefs = gql`
  type Cart {
    total: Float
    products: [String]
  }
  type User {
    _id: String
    email: String!
    password: String!
    cart: Cart!
  }
  extend type Query {
    user(id: String, email: String): User
    cart(id: String!): Cart
  }
  extend type Mutation {
    addUser(email: String!, password: String!): User
    addToCart(userId: String!, productId: String!): Cart
    loginUser(userName: String!, password: String!): User
  }
`;

module.exports = typeDefs;
