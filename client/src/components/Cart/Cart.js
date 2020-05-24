import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { styled } from '@material-ui/core/styles';
import CartItems from './CartItems';
import Totals from './Totals';
import { CHANGE_QUANTITY, GET_CART, REMOVE_FROM_CART } from '../../constants';
import {
  getCart,
  getUser,
  removeProductFromCart,
  changeQuantity as changeLocalQuantity,
} from '../../utils/localStorage';

const ProductsTableWrapper = styled('div')({
  margin: '0 48px',
});

const Cart = ({ updateCartTotal }) => {
  const { loading, errors, data } = useQuery(GET_CART);
  let cartData;
  if (getUser() && !errors && !loading) {
    cartData = data.cart.products;
    updateCartTotal(data.cart.total);
  } else cartData = getCart().products;

  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const handleRemoveItem = async productId => {
    if (getUser()) {
      await removeFromCart({ variables: { productId }, refetchQueries: [{ query: GET_CART }] });
    } else {
      const cart = removeProductFromCart(productId);
      updateCartTotal(cart.total);
      cartData = cart;
    }
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
      updateCartTotal(cart.toal);
      cartData = cart;
    }
  };

  return (
    <ProductsTableWrapper>
      <CartItems
        data={cartData}
        removeItem={handleRemoveItem}
        changeQuantity={handleQuantityChange}
      />
      <Totals />
    </ProductsTableWrapper>
  );
};

export default Cart;
