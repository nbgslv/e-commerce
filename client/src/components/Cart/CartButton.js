import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Button from '@material-ui/core/Button';
import { GET_CART_TOTAL } from '../../constants';

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
