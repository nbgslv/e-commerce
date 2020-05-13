import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      title
    }
  }
`;

export const COMPLETE_CART = gql`
  mutation completeCart {
    completeCart {
      complete
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(userName: $username, password: $password) {
      userName
      token
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
      id
      title
      thumbnail
      price
    }
  }
`;

export const GET_CART_TOTAL = gql`
  query getCartTotal {
    cart {
      total
    }
  }
`;

export const GET_CART = gql`
  query getCart {
    cart {
      total
      products {
        id
        title
        thumbnail
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($productId: Int!) {
    addToCart(input: { productId: $productId }) {
      total
    }
  }
`;
