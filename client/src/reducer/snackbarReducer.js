const snackbarReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGIN_SUCCESS_ON':
      return {
        snackbar: {
          loginSuccessSnackbar: true,
          ...state.snackbar,
        },
      };
    case 'SET_LOGIN_SUCCESS_OFF':
      return {
        snackbar: {
          ...state.snackbar,
          loginSuccessSnackbar: false,
        },
      };
    case 'SET_ADD_ITEM_SUCCESS_ON':
      return {
        snackbar: {
          ...state.snackbar,
          addItemSuccessSnackbar: true,
        },
      };
    case 'SET_ADD_ITEM_SUCCESS_OFF':
      return {
        snackbar: {
          ...state.snackbar,
          addItemSuccessSnackbar: false,
        },
      };
    case 'SET_LOGOUT_SUCCESS_ON':
      return {
        snackbar: {
          ...state.snackbar,
          logoutSuccessSnackbar: true,
        },
      };
    case 'SET_LOGOUT_SUCCESS_OFF':
      return {
        snackbar: {
          ...state.snackbar,
          logoutSuccessSnackbar: false,
        },
      };
    case 'SET_EMPTY_CART_SUCCESS_ON':
      return {
        snackbar: {
          ...state.snackbar,
          cartemptySuccessSnackbar: true,
        },
      };
    case 'SET_EMPTY_CART_SUCCESS_OFF':
      return {
        snackbar: {
          ...state.snackbar,
          cartemptySuccessSnackbar: false,
        },
      };
    case 'SET_ADD_RATING_SUCCESS_ON':
      return {
        snackbar: {
          ...state.snackbar,
          addRatingSuccessSnackbar: true,
        },
      };
    case 'SET_ADD_RATING_SUCCESS_OFF':
      return {
        snackbar: {
          ...state.snackbar,
          addRatingSuccessSnackbar: false,
        },
      };
    default:
      return state;
  }
};

export default snackbarReducer;
