import React from 'react';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { makeStyles, styled } from '@material-ui/core/styles';
import SubHeader from '../Header/SubHeader';
import ProductItem from './ProductItem';
import SkeletonProducts from './SkeletonProducts';
import Filter from './Filter';
import { GET_PRODUCTS, GET_LIMIT } from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6),
  },
}));

const Alert = styled('span')`
  width: 100%;
  text-align: center;
`;

const Products = () => {
  const classes = useStyles();

  return (
    <>
      <Query query={GET_LIMIT}>
        {({ data }) => (
          <Grid container spacing={3} className={classes.root}>
            <Grid item md={12}>
              <SubHeader />
            </Grid>
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
                      <Grid item md={3} key={product._id.toString()}>
                        <ProductItem key={product._id.toString()} data={product} />
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
};

export default Products;
