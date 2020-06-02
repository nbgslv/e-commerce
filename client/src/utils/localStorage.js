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
    if (product._id.toString() === shopProduct._id.toString()) {
      product.quantity += 1;
      productExists = true;
      return true;
    }
    return false;
  });
  if (!productExists) {
    shopProduct.quantity = 1;
    cart.products.push(shopProduct);
  }
  cart.total += 1;
  setCart(false, cart.total, cart.products);
  return cart;
};

export const removeProductFromCart = productId => {
  const cart = getCart();
  let quantity = 0;
  const updatedProducts = cart.products.filter(product => {
    if (product._id !== productId) {
      return true;
    }
    quantity = product.quantity;
    return false;
  });
  cart.total -= quantity;
  cart.products = updatedProducts;
  setCart(false, cart.total, cart.products);
  return cart;
};

export const changeQuantity = (productId, quantity) => {
  const cart = getCart();
  let lastQuantity;
  cart.products.map(product => {
    if (product._id.toString() === productId.toString()) {
      lastQuantity = product.quantity;
      product.quantity = quantity;
      return true;
    }
    return false;
  });
  cart.total += quantity - lastQuantity;
  setCart(false, cart.total, cart.products);
  return cart;
};

export const emptyCart = () => {
  setCart(true);
};

export const deleteCart = () => localStorage.removeItem('cart');
