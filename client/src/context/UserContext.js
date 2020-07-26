import React from 'react';
import PropTypes from 'prop-types';
import userReducer from '../reducer/userReducer';

export const UserContext = React.createContext();

const initializeState = {
  user: {
    address: {
      firmName: 'Lodgin Ltd.',
      recipientName: 'Nachman Boguslavski',
      address1: '12 Harav Maymon st.',
      address2: '',
      city: 'Bat-Yam',
      state: '',
      zipcode: '5962627',
      country: 'IL',
    },
    guest: true,
    cart: {
      total: 0,
      products: [],
    },
  },
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initializeState);
  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default UserContextProvider;
