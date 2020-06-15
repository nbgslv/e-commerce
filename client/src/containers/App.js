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
import Error from '../components/Error/Error';
import CustomSnackbars from '../components/Snackbar/CustomSnackbar';
import { SnackbarContext } from '../context/snackbarContext';
import * as Theme from '../ui/theme';
import Cart from '../components/Cart/Cart';
import Products from '../components/Products/Products';
import Appbar from '../components/Appbar/Appbar';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Checkout from '../components/Checkout/Checkout';
import { getCart } from '../utils/localStorage';

// Apollo client setup
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

// Setup web socker link for apollo to use graphql's subscribe
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

// Split link - queries to go to HTTP link and subscription to go to web socket
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Setup error link to handle Apollo errors
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
  if (networkError)
    return <Error errorCode={networkError.code} errorMessage={networkError.message} />;
});

// Setup Apollo client
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

// Default limit of products number to be shown
cache.writeData({
  data: {
    limit: 16,
  },
});

/*
 * Main app component
 */

const App = () => {
  const location = useLocation();
  const { state, dispatch } = React.useContext(SnackbarContext);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('');

  /* --------------------- Snackbar ------------------------  */
  // Snackbar operation
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
  }, [state]);

  const handleSnackbarOnClose = () => setOpen(false);
  /* ----------------- End of Snackbar -----------------  */

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={Theme.default}>
        <Appbar />
        {
          // Show header only in main page
          location.pathname === '/' ? <Header /> : null
        }
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/category/:id" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login/" component={Login} />
        </Switch>
        <CustomSnackbars
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

// TODO add private routes
