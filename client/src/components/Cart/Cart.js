import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SubHeader from '../Header/SubHeader';
import ProductItem from '../Products/ProductItem';
import Totals from './Totals';

const GET_CART = gql`
  query getCart {
    cart {
      total
      products {
        id
        title
        thumbnail
      }
    }
  }
`;

const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Cart = ({ history }) => (
  <>
    {history && <SubHeader title="Cart" goToCart={() => history.push('/cart')} />}
    <Query query={GET_CART}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return <Alert>{loading ? 'Loading...' : error}</Alert>
        }
        return (
          <CartWrapper>
            <CartItemsWrapper>
              {data.cart &&
                data.cart.products.map(product => <ProductItem key={product.id} data={product} />)}
            </CartItemsWrapper>
            <Totals count={data.cart.total} />
          </CartWrapper>
        );
      }}
    </Query>
  </>
);

Cart.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Cart;
