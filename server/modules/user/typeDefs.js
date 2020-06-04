const { gql } = require('apollo-server');

const typeDefs = gql`
  type Cart {
    total: Float
    products: [CartProduct]
  }
  type User {
    _id: String
    firstName: String
    lastName: String
    birthDate: String
    email: String!
    password: String!
    cart: Cart!
    token: String!
  }
  type LoginResult {
    success: Boolean!
  }
  extend type Subscription {
    cartItemAdded: Cart
  }
  extend type Query {
    cart: Cart
    getUser: User
  }
  extend type Mutation {
    addUser(email: String!, password: String!): User
    addToCart(productId: String!): CartProduct
    removeFromCart(productId: String!): Cart
    changeQuantity(productId: String!, quantity: Int!): Cart
    emptyCart: Boolean
    loginUser(email: String!, password: String!): LoginResult
    logoutUser: Boolean
  }
`;

module.exports = typeDefs;
