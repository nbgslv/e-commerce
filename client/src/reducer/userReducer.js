import { getCart } from '../utils/localStorage';

const productsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        user: {
          guest: false,
          ...action.user,
        },
      };
    case 'SET_GUEST':
      return {
        user: {
          guest: true,
          cart: getCart(),
        },
      };
    case 'REMOVE_USER':
      return [];
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
          cart: { ...state.user.cart },
        },
      };
    default:
      return state;
  }
};

export default productsReducer;
