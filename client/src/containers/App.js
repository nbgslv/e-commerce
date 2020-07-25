import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Cookies from 'js-cookie';
import { Route, Switch, useLocation } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, HttpLink } from '@apollo/client';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';
import { ApolloProvider } from 'react-apollo';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import OrderConfirmed from '../components/Checkout/OrderConfirmed';
import CustomSnackbar from '../components/Snackbar/CustomSnackbar';
import { SnackbarContext } from '../context/snackbarContext';
import * as Theme from '../ui/theme';
import Cart from './Cart';
import Products from './Products';
import Appbar from '../components/Appbar/Appbar';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Checkout from './Checkout';
import { getCart } from '../utils/localStorage';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      if (extensions.code === 'UNAUTHENTICATED') {
        Cookies.remove('signedin');
        response.errors = null;
      }
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      response.errors = null;
    });
  if (networkError) console.log(networkError);
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: errorLink.concat(splitLink),
  cache,
  resolvers: {},
  typeDefs: `
    extend type Query {
      limit: Int!
    }
  `,
  connectToDevTools: true,
});

cache.writeData({
  data: {
    limit: 16,
  },
});

const App = () => {
  const location = useLocation();
  const { state, dispatch } = React.useContext(SnackbarContext);
  const [cartTotal, setCartTotal] = React.useState();
  const [itemsForCheckout, setItemsForCheckout] = React.useState();
  const [totalForPayment, setTotalForPayment] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('');

  React.useEffect(() => {
    if (state.snackbar.addItemSuccessSnackbar) {
      setOpen(true);
      setMessage('Added item to cart');
      setSeverity('success');
      dispatch({ type: 'SET_ADD_ITEM_SUCCESS_OFF' });
    }
    if (state.snackbar.logoutSuccessSnackbar) {
      setOpen(true);
      setMessage('Logged out successfully');
      setSeverity('success');
      dispatch({ type: 'SET_LOGOUT_SUCCESS_OFF' });
    }
    if (state.snackbar.cartemptySuccessSnackbar) {
      setOpen(true);
      setMessage('Emptied cart successfully');
      setSeverity('success');
      dispatch({ type: 'SET_EMPTY_CART_SUCCESS_OFF' });
    }
    if (state.snackbar.addRatingSuccessSnackbar) {
      setOpen(true);
      setMessage('Rating Added');
      setSeverity('success');
      dispatch({ type: 'SET_ADD_RATING_SUCCESS_OFF' });
    }
  }, [state, dispatch]);

  const handleUpdateCartTotal = total => {
    setCartTotal(total);
  };

  const handleEmptyCart = () => handleUpdateCartTotal(0);

  const handleChangeToLocalCart = () => handleUpdateCartTotal(getCart().total);

  const handleSendItemsToCheckout = items => {
    setItemsForCheckout(items);
  };

  const handleSetTotalForPayment = total => {
    setTotalForPayment(total);
  };

  const handleLoginSuccess = () => {
    setOpen(true);
    setMessage('Logged-in successfully');
    setSeverity('success');
  };

  const handleSnackbarOnClose = () => setOpen(false);

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={Theme.default}>
        <Appbar
          updateEmptyLocalCart={handleEmptyCart}
          changeToLocalCart={handleChangeToLocalCart}
          cartTotal={cartTotal}
        />
        {location.pathname === '/' ? (
          <Header />
        ) : (
          <Box component="div" style={{ marginTop: '86px' }} />
        )}
        <Container>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/category/:id" component={Products} />
            <Route
              path="/cart"
              render={props => (
                <Cart
                  updateCartTotal={handleUpdateCartTotal}
                  itemsForCheckout={handleSendItemsToCheckout}
                  totalForPayment={handleSetTotalForPayment}
                  {...props}
                />
              )}
            />
            <Route
              path="/checkout"
              // render={() => (getUser() ? <Cart /> : <Redirect to="/login/" />)}
              render={props => (
                <Checkout items={itemsForCheckout} totalForPayment={totalForPayment} {...props} />
              )}
            />
            <Route path="/orderconfirmed" component={OrderConfirmed} />
            <Route
              path="/login/"
              render={props => <Login loginSuccess={handleLoginSuccess} {...props} />}
            />
          </Switch>
        </Container>
        <CustomSnackbar
          message={message}
          severity={severity}
          open={open}
          onCloseHandler={handleSnackbarOnClose}
        />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
