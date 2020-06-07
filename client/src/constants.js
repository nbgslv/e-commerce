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

export const GET_CART = gql`
  query cart {
    cart {
      total
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation user(
    $firstName: String!
    $lastName: String!
    $birthDate: Date!
    $email: String!
    $password: String!
  ) {
    user(
      firstName: $firstName
      lastName: $lastName
      birthDate: $birthDate
      email: $email
      password: $password
    ) {
      _id
      email
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      firstName
      lastName
      cart {
        total
        products {
          _id
          title
          price
          quantity
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      success
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($productId: String!) {
    addToCart(productId: $productId) {
      _id
      title
      price
      quantity
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productId: String!) {
    removeFromCart(productId: $productId) {
      total
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;

export const CHANGE_QUANTITY = gql`
  mutation changeQuantity($productId: String!, $quantity: Int!) {
    changeQuantity(productId: $productId, quantity: $quantity) {
      total
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;

export const EMPTY_CART = gql`
  mutation emptyCart {
    emptyCart
  }
`;

export const CART_CHANGED = gql`
  subscription cartChanged {
    cartChanged {
      total
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;

export const GET_LIMIT = gql`
  query getLimit {
    limit @client
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($limit: Int, $category: String) {
    products(limit: $limit, category: $category) {
      _id
      title
      category
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
