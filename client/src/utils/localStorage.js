import Cookies from 'js-cookie';

export const getUser = () => Cookies.get('signedin');

export const deleteUser = () => Cookies.removeItem('signedin');

export const saveUser = () => {
  Cookies.set('signedin', true, { expires: 1 });
};

const NEW_CART = { total: 0, products: [] };

export const getCart = () => JSON.parse(localStorage.getItem('cart'));

export const setCart = (newCart, total = 0, products = []) =>
  localStorage.setItem('cart', JSON.stringify(newCart ? NEW_CART : { total, products }));

export const addProductToCart = shopProduct => {
  const cart = getCart();
  let productExists = false;
  cart.products.map(product => {
    if (product.id === shopProduct._id) {
      product.quantity += 1;
      productExists = true;
    }
  });
  if (!productExists) {
    cart.products.push(shopProduct);
    cart.total += 1;
  }
  setCart(false, cart.total, cart.products);
  return cart;
};

export const removeProductFromCart = productId => {
  const cart = getCart();
  const updatedProducts = cart.products.filter(product => product._id !== productId);
  cart.total -= 1;
  cart.products = updatedProducts;
  setCart(false, cart.total, cart.products);
  return cart;
};

export const changeQuantity = (productId, quantity) => {
  const cart = getCart();
  let lastQuantity;
  cart.products.map(product => {
    if (product._id === productId) {
      lastQuantity = product.quantity;
      product.quantity = quantity;
    }
  });
  cart.total += quantity - lastQuantity;
  setCart(false, cart.total, cart.products);
  return cart;
};

export const emptyCart = () => {
  setCart(true);
};

export const deleteCart = () => localStorage.removeItem('cart');
