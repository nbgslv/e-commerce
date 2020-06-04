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
          cart: { ...getCart() },
        },
      };
    case 'REMOVE_USER':
      return [];
    case 'UPDATE_CART':
      return {
        user: {
          ...state.user,
          cart: action.cart.cartItemAdded,
        },
      };
    default:
      return state;
  }
};

export default productsReducer;
