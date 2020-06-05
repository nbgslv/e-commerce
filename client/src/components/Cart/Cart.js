import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useMutation, useQuery } from 'react-apollo';
import { makeStyles, styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { UserContext } from '../../context/UserContext';
import CartItems from './CartItems';
import { CHANGE_QUANTITY, GET_CART, REMOVE_FROM_CART } from '../../constants';
import {
  getCart,
  getUser,
  removeProductFromCart,
  changeQuantity as changeLocalQuantity,
} from '../../utils/localStorage';

const useStyles = makeStyles({
  card: {
    margin: '8px 0',
  },
});

const ProductsTableWrapper = styled('div')({
  margin: '0 48px',
});

const Cart = ({ history }) => {
  const classes = useStyles();
  const [totalForPayment, setTotalForPayment] = React.useState(0);
  const { state, dispatch } = React.useContext(UserContext);

  const computeTotal = () => {
    let totalForPaymentCalculation = 0;
    state.user.cart.products.map(product => {
      totalForPaymentCalculation += product.price * product.quantity;
      return true;
    });
    return Math.round(totalForPaymentCalculation * 100) / 100;
  };

  React.useEffect(() => setTotalForPayment(computeTotal()), [state.user.cart.total]);

  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const handleRemoveItem = async productId => {
    if (!state.user.guest) await removeFromCart({ variables: { productId } });
    else {
      const cart = removeProductFromCart(productId);
      dispatch({ type: 'UPDATE_CART', cart: { cartChanged: cart } });
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
          <CardContent>Total For Payment: {totalForPayment}$</CardContent>
          <CardActions>
            <Button
              onClick={() => {
                history.push('/checkout');
              }}
            >
              Continue to checkout
            </Button>
          </CardActions>
        </Card>
      </ProductsTableWrapper>
    </>
  );
};

Cart.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Cart;
