import React from 'react';
import PropTypes from 'prop-types';
import productsReducer from '../reducer/productsReducer';

export const ProductsContext = React.createContext();

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(productsReducer, { products: [] });
  return (
    <ProductsContext.Provider value={{ state, dispatch }}>{children}</ProductsContext.Provider>
  );
};

ProductsContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ProductsContextProvider;
