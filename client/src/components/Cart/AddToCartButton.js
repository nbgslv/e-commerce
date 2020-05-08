import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Button from '../Button/Button';
import { ADD_TO_CART, GET_CART, GET_CART_TOTAL } from '../../constants';

const AddToCartButton = ({ productId }) => (
  <Mutation
    mutation={ADD_TO_CART}
    refetchQueries={[{ query: GET_CART }, { query: GET_CART_TOTAL }]}>
    {addToCart => (
      <Button onClick={() => addToCart({ variables: { productId } })}>+ Add to Cart</Button>
    )}
  </Mutation>
);

AddToCartButton.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default AddToCartButton;
