import React from 'react';
import { useQuery } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { makeStyles, styled } from '@material-ui/core/styles';
import SubHeader from '../Header/SubHeader';
import ProductItem from './ProductItem';
import SkeletonProducts from './SkeletonProducts';
import Filter from './Filter';
import { ProductsContext } from '../../context/ProductsContext';
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
  const { state, dispatch } = React.useContext(ProductsContext);
  const { data } = useQuery(GET_LIMIT);
  const { loading, error, data: productsData } = useQuery(GET_PRODUCTS, {
    variables: { limit: data.limit },
  });

  React.useEffect(() => {
    if (!loading) dispatch({ type: 'SET_PRODUCTS', products: productsData });
  }, [productsData, loading, dispatch]);

  if (loading)
    return (
      <Grid container spacing={3} classes={{ container: classes.root }}>
        <SkeletonProducts limit={data.limit} />
      </Grid>
    );
  if (error) return <Alert>{error}</Alert>;

  return (
    <Grid container spacing={3} classes={{ container: classes.root }}>
      <Grid item md={8}>
        <SubHeader />
      </Grid>
      <Grid item md={4} alignItems="flex-end">
        <Filter limit={parseInt(data.limit, 10)} />
      </Grid>
      {state.products.map(product => (
        <Grid item md={3} key={product._id.toString()}>
          <ProductItem key={product._id.toString()} data={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
