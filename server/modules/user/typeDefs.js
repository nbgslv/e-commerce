const { gql } = require('apollo-server');

const typeDefs = gql`
  enum Products {
    Product
    String
  }
  type Cart {
    total: Float
    products: [Product]
  }
  type User {
    _id: String
    email: String!
    password: String!
    cart: Cart!
    token: String!
  }
  extend type Query {
    user(id: String, email: String): User
    cart(id: String!): Cart
  }
  extend type Mutation {
    addUser(email: String!, password: String!): User
    addToCart(userId: String!, productId: String!): Cart
    loginUser(email: String!, password: String!): User
    logoutUser: Boolean
  }
`;

module.exports = typeDefs;
