import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      _id
      title
    }
  }
`;

export const GET_CATEGORY = gql`
  query category($id: String!) {
    category(id: $id) {
      title
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation category($title: String!) {
    category(title: $title) {
      title
    }
  }
`;

export const GET_USER = gql`
  query user($id: String, $email: String) {
    user(id: $id, email: $email) {
      email
      cart {
        total
        products
      }
    }
  }
`;

export const GET_CART = gql`
  query cart($id: String!) {
    cart {
      total
      products {
        _id
        title
        price
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation user($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      _id
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      cart {
        total
        products {
          _id
          title
          price
        }
      }
      token
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($userId: String!, $productId: String!) {
    addToCart(userId: $userId, productId: $productId) {
      total
    }
  }
`;

export const GET_LIMIT = gql`
  query getLimit {
    limit @client
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($limit: Int) {
    products(limit: $limit) {
      _id
      title
      thumbnail
      price
      rating
      voters
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: Int) {
    product(id: $id) {
      _id
      title
      thumbnail
      price
      rating
      voters
    }
  }
`;

export const ADD_RATING = gql`
  mutation updateProductRating($id: Int!, $rating: Int!) {
    updateProductRating(id: $id, rating: $rating) {
      _id
      rating
      voters
    }
  }
`;
