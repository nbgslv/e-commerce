import React from 'react';
import { useQuery } from 'react-apollo';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { styled, makeStyles } from '@material-ui/core/styles';
import SubHeader from '../components/Header/SubHeader';
import ProductItem from '../components/Products/ProductItem';
import SkeletonProducts from '../components/Products/SkeletonProducts';
import Filter from '../components/Products/Filter';
import { ProductsContext } from '../context/ProductsContext';
import { GET_PRODUCTS, GET_LIMIT } from '../constants/graphqlConstants';

const useStyles = makeStyles({
  subHeader: {
    margin: '8px 40px',
    display: 'flex',
    justifyContent: 'center',
  },
});

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
      <Container>
        <Grid container spacing={3}>
          <SkeletonProducts limit={data.limit} />
        </Grid>
      </Container>
    );
  if (error) return <Alert>{error}</Alert>;

  return (
    <>
      <div>
        <SubHeader />
        <Filter limit={parseInt(data.limit, 10)} />
      </div>
      <Container>
        <Grid container spacing={3}>
          {state.products.map(product => (
            <Grid item md={3} key={product._id.toString()}>
              <ProductItem key={product._id.toString()} data={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Products;

// TODO limit items title to 25 chars
