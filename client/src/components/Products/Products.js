import React from 'react';
import ReactRouterPropTpes from 'react-router-prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import SubHeader from '../Header/SubHeader';
import ProductItem from './ProductItem';
import { GET_PRODUCTS } from "../../constants";

const ProductItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Products = ({ history }) => (
  <>
    {history && <SubHeader title="Available products" goToCart={() => history.push('/cart')} />}
    <Query query={GET_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return <Alert>{loading ? 'Loading...' : error}</Alert>;
        }
        return (
          <ProductItemsWrapper>
            {data.products &&
              data.products.map(product => <ProductItem key={product.id} data={product} />)}
          </ProductItemsWrapper>
        );
      }}
    </Query>
  </>
);

Products.propTypes = {
  history: ReactRouterPropTpes.history.isRequired,
};

export default Products;
