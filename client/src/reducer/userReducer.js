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
    case 'SET_LOCAL_USER':
      console.log(getCart());
      return {
        user: {
          guest: true,
          cart: { ...getCart() },
        },
      };
    case 'REMOVE_USER':
      return [];
    default:
      return state;
  }
};

export default productsReducer;
