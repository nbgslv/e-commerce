const { gql } = require('apollo-server');

const typeDefs = gql`
  type Cart {
    total: Float
    products: [CartProduct]
  }
  type User {
    _id: String
    firstName: String!
    lastName: String!
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
    changeQuantity(productId: String!, quantity: Int!): Cart
    emptyCart: Boolean
    loginUser(email: String!, password: String!): LoginResult
    logoutUser: Boolean
  }
`;

module.exports = typeDefs;
