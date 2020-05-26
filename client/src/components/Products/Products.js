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

const Products = ({ updateTotal, match }) => {
  const classes = useStyles();
  const handleUpdateTotal = newTotal => {
    updateTotal(newTotal);
  };

  return (
    <Query query={GET_LIMIT}>
      {({ data }) => (
        <Grid container spacing={3} classes={{ container: classes.root }}>
          <Grid item md={8}>
            <SubHeader />
          </Grid>
          <Grid item md={4} alignItems="flex-end">
            <Filter limit={parseInt(data.limit, 10)} />
          </Grid>
          <Query
            query={GET_PRODUCTS}
            variables={{ limit: parseInt(data.limit, 10), category: match.params.id }}
          >
            {({ loading, error, data: productData }) => (
              <>
                {error && <Alert>{error}</Alert>}
                {loading && <SkeletonProducts limit={data.limit} />}
                {!loading &&
                  productData.products.map(product => (
                    <Grid item md={3} key={product._id.toString()}>
                      <ProductItem
                        key={product._id.toString()}
                        data={product}
                        updateTotal={handleUpdateTotal}
                      />
                    </Grid>
                  ))}
              </>
            )}
          </Query>
        </Grid>
      )}
    </Query>
  );
};

export default Products;
