const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: Int!
    title: String!
    thumbnail: String!
    price: Float
    category: Category
    rating: Int!
    voters: Int!
  }
  type Category {
    id: Int!
    title: String!
  }
  type User {
    userName: String!
    token: String!
  }
  type Cart {
    total: Float
    products: [Product]
    complete: Boolean
  }
  input CartInput {
    productId: Int!
  }
  type Query {
    product(id: Int): Product
    products(limit: Int): [Product]
    categories: [Category]
    cart: Cart
  }
  type Mutation {
    updateProductRating(id: Int!, rating: Int!): Product
    addToCart(input: CartInput!): Cart
    completeCart: Cart
    loginUser(userName: String!, password: String!): User
  }
`;

module.exports = typeDefs;
