import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import ProductItem from './ProductItem';
import SkeletonProducts from './SkeletonProducts';
import Filter from './Filter';
import { GET_PRODUCTS, GET_LIMIT } from '../../constants';

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Products = () => (
  <>
    <Query query={GET_LIMIT}>
      {({ data }) => (
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Filter limit={parseInt(data.limit, 10)} />
          </Grid>
          <Query query={GET_PRODUCTS} variables={{ limit: parseInt(data.limit, 10) }}>
            {({ loading, error, data: productData }) => (
              <>
                {error && <Alert>{error}</Alert>}
                {loading && <SkeletonProducts />}
                {!loading &&
                  productData.products.map(product => (
                    <Grid item md={3} key={product.id.toString()}>
                      <ProductItem key={product.id.toString()} data={product} />
                    </Grid>
                  ))}
              </>
            )}
          </Query>
        </Grid>
      )}
    </Query>
  </>
);

export default Products;
