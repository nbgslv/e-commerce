import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { makeStyles, styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

const Cart = ({ history, updateCartTotal, cartTotal, itemsForCheckout, totalForPayment }) => {
  const classes = useStyles();
  const [total, setTotal] = React.useState(cartTotal);

  React.useEffect(() => {
    setTotal(cartTotal);
  }, [cartTotal]);

  const { loading, errors, data } = useQuery(GET_CART);
  const computeTotal = () => {
    let totalForPaymentCalculation = 0;
    if (getUser() && data && !loading && !errors) {
      data.cart.products.map(product => {
        totalForPaymentCalculation += product.price * product.quantity;
        return true;
      });
      return Math.round(totalForPaymentCalculation * 100) / 100;
    }
    const cart = getCart();
    cart.products.map(product => {
      totalForPaymentCalculation += product.price * product.quantity;
      return true;
    });
    return Math.round(totalForPaymentCalculation * 100) / 100;
  };

  let cartData;
  if (getUser() && !errors && !loading) {
    cartData = data.cart.products;
    updateCartTotal(data.cart.total);
  } else cartData = getCart().products;
  React.useEffect(() => {
    setTotal(computeTotal());
  }, [data, errors, loading]);

  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const handleRemoveItem = async productId => {
    if (getUser()) {
      await removeFromCart({ variables: { productId }, refetchQueries: [{ query: GET_CART }] });
    } else {
      const cart = removeProductFromCart(productId);
      updateCartTotal(cart.total);
      cartData = cart;
    }
    setTotal(computeTotal());
  };

  const [changeQuantity] = useMutation(CHANGE_QUANTITY);
  const handleQuantityChange = async (productId, quantity) => {
    if (getUser()) {
      await changeQuantity({
        variables: { productId, quantity },
        refetchQueries: [{ query: GET_CART }],
      });
    } else {
      const cart = changeLocalQuantity(productId, quantity);
      updateCartTotal(cart.total);
      cartData = cart;
    }
    setTotal(computeTotal());
  };

  return (
    <>
      <ProductsTableWrapper>
        <CartItems
          data={cartData}
          removeItem={handleRemoveItem}
          changeQuantity={handleQuantityChange}
        />
        <Card className={classes.card}>
          <CardContent>Total For Payment: {total}$</CardContent>
          <CardActions>
            <Button
              onClick={() => {
                itemsForCheckout(cartData);
                totalForPayment(total);
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

export default Cart;
