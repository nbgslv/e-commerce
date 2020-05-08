import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '../Button/Button';

const GET_CART_TOTAL = gql`
  query getCartTotal {
    cart {
      total
    }
  }
`;

const CartButton = ({ onClick }) => (
  <Query query={GET_CART_TOTAL}>
    {({ loading, error, data }) => (
      <Button onClick={onClick}>
        {`Cart (${loading || error ? 0 : data && data.cart.total})`}
      </Button>
    )}
  </Query>
);

CartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CartButton;
