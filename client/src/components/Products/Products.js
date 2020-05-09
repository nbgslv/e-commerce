import React from 'react';
import ReactRouterPropTpes from 'react-router-prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import SubHeader from '../Header/SubHeader';
import ProductItem from './ProductItem';
import Filter from './Filter';
import { GET_PRODUCTS, GET_LIMIT } from '../../constants';

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
    <Query query={GET_LIMIT}>
      {({ data }) => (
        <>
          <Filter limit={parseInt(data.limit, 10)} />
          <Query query={GET_PRODUCTS} variables={{ limit: parseInt(data.limit, 10) }}>
            {({ loading, error, data: productData }) => {
              if (loading || error) {
                return <Alert>{loading ? 'Loading...' : error}</Alert>;
              }
              return (
                <ProductItemsWrapper>
                  {productData.products &&
                    productData.products.map(product => (
                      <ProductItem key={product.id} data={product} />
                    ))}
                </ProductItemsWrapper>
              );
            }}
          </Query>
        </>
      )}
    </Query>
  </>
);

Products.propTypes = {
  history: ReactRouterPropTpes.history.isRequired,
};

export default Products;
