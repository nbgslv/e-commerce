const { gql } = require('apollo-server');

const typeDefs = gql`
  type Cart {
    total: Float
    products: [CartProduct]
  }
  type User {
    _id: String
    email: String!
    password: String!
    cart: Cart!
    token: String!
  }
  type LoginResult {
    success: Boolean!
  }
  extend type Query {
    user(id: String, email: String): User
    cart: Cart
  }
  extend type Mutation {
    addUser(email: String!, password: String!): User
    addToCart(productId: String!): Cart
    removeFromCart(productId: String!): Cart
    loginUser(email: String!, password: String!): LoginResult
    logoutUser: Boolean
  }
`;

module.exports = typeDefs;
