import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useMutation } from 'react-apollo';
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { SnackbarContext } from '../context/snackbarContext';
import { UserContext } from '../context/UserContext';
import CustomDialog from '../components/Dialog/CustomDialog';
import CartItems from '../components/Cart/CartItems';
import { CHANGE_QUANTITY, EMPTY_CART, REMOVE_FROM_CART } from '../constants/graphqlConstants';
import {
  removeProductFromCart,
  changeQuantity as changeLocalQuantity,
  setCart,
} from '../utils/localStorage';
import { computeTotal } from '../utils/cart';

const useStyles = makeStyles({
  card: {
    margin: '8px 0',
    textAlign: 'right',
  },
  totalForPayment: {
    marginBottom: '8px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

const ProductsTableWrapper = styled('div')({
  '@media only screen and (max-width: 600px)': {
    margin: '0',
  },
  margin: '0 48px',
});

const Cart = ({ history }) => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(UserContext);
  const { dispatch: snackbarDispatch } = React.useContext(SnackbarContext);
  const [totalForPayment, setTotalForPayment] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => setTotalForPayment(computeTotal(state.user.cart.products)), [
    state.user.cart.total,
    state.user.cart.products,
  ]);

  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const handleRemoveItem = async productId => {
    if (!state.user.guest) await removeFromCart({ variables: { productId } });
    else {
      const cart = removeProductFromCart(productId);
      dispatch({ type: 'UPDATE_CART', cart: { cartChanged: cart } });
    }
  };

  const [emptyCart] = useMutation(EMPTY_CART);
  const handleEmptyCart = async () => {
    setDialogOpen(true);
  };

  const handleDialogOnClose = async button => {
    setDialogOpen(false);
    if (button === 'right') {
      if (!state.user.guest) {
        await emptyCart();
      } else {
        const cart = setCart(true);
        dispatch({ type: 'UPDATE_CART', cart: { cartChanged: cart } });
      }
      snackbarDispatch({ type: 'SET_EMPTY_CART_SUCCESS_ON' });
    }
  };

  const [changeQuantity] = useMutation(CHANGE_QUANTITY);
  const handleQuantityChange = async (productId, quantity) => {
    if (!state.user.guest) {
      await changeQuantity({
        variables: { productId, quantity },
      });
    } else {
      const cart = changeLocalQuantity(productId, quantity);
      dispatch({ type: 'UPDATE_CART', cart: { cartChanged: cart } });
    }
  };

  return (
    <>
      <ProductsTableWrapper>
        <CartItems
          productsData={state.user.cart.products}
          removeItem={handleRemoveItem}
          changeQuantity={handleQuantityChange}
        />
        <Card className={classes.card}>
          <CardContent>
            <Box className={classes.totalForPayment}>
              <Typography component="span" color="primary">
                Total For Payment: &nbsp;
              </Typography>
              <Typography component="span" color="textPrimary">
                <strong>{totalForPayment}$</strong>
              </Typography>
            </Box>
            <Box className={classes.buttons}>
              <Button
                color="primary"
                onClick={() => {
                  handleEmptyCart();
                }}
              >
                Empty Cart
              </Button>
              <Box style={{ margin: 'auto' }} />
              <Button
                disabled={!state.user.cart.total}
                variant="outlined"
                color="primary"
                onClick={() => {
                  history.push('/checkout');
                }}
              >
                Continue to checkout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </ProductsTableWrapper>
      <CustomDialog
        rightButtonLabel="Empty Cart"
        open={dialogOpen}
        onCloseHandler={handleDialogOnClose}
        message="Are you sure you wish to empty the cart?"
        leftButtonLabel="Cancel"
        title="Empty Cart"
      />
    </>
  );
};

Cart.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Cart;

// TODO Buttons responsiveness
