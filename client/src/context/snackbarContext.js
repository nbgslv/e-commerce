import React from 'react';
import PropTypes from 'prop-types';
import snackbarReducer from '../reducer/snackbarReducer';

const initializeState = {
  snackbar: {
    loginSuccessSnackbar: false,
    addItemSuccessSnackbar: false,
    logoutSuccessSnackbar: false,
    cartemptySuccessSnackbar: false,
  },
};

export const SnackbarContext = React.createContext(initializeState);

const SnackbarContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(snackbarReducer, initializeState);
  return (
    <SnackbarContext.Provider value={{ state, dispatch }}>{children}</SnackbarContext.Provider>
  );
};

SnackbarContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default SnackbarContextProvider;
