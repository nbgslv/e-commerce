import { getCart } from '../utils/localStorage';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        user: {
          ...state.user,
          loginSuccessSnackbar: state.user.loginSuccessSnackbar,
          guest: false,
          ...action.user,
        },
      };
    case 'SET_GUEST':
      return {
        user: {
          ...state.user,
          guest: true,
          cart: getCart(),
        },
      };
    case 'REMOVE_USER':
      return {
        user: {
          guest: true,
          cart: getCart(),
        },
      };
    case 'UPDATE_CART':
      return {
        user: {
          ...state.user,
          cart: action.cart.cartChanged,
        },
      };
    case 'ADD_PRODUCT_TO_CART':
      let productExists = false;
      state.user.cart.products.map(product => {
        if (product._id === action.product._id) {
          product.quantity += 1;
          productExists = true;
        }
        return true;
      });
      state.user.cart.total += 1;
      if (!productExists) state.user.cart.products.push(action.product);
      return {
        user: {
          ...state.user,
          addItemSuccessSnackbar: true,
          cart: { ...state.user.cart },
        },
      };
    case 'EMPTY_CART':
      return {
        user: {
          ...state.user,
          cart: {
            total: 0,
            products: [],
          },
        },
      };
    default:
      return state;
  }
};

export default userReducer;
