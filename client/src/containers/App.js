import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, useLocation } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';
import { ApolloProvider } from 'react-apollo';
import * as Theme from '../ui/theme';
import ProductsContextProvider from '../context/ProductsContext';
import UserContextProvider from '../context/UserContext';
import Cart from '../components/Cart/Cart';
import Products from '../components/Products/Products';
import Appbar from '../components/Appbar/Appbar';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Checkout from '../components/Checkout/Checkout';
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

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
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
  const [cartTotal, setCartTotal] = React.useState();
  const [itemsForCheckout, setItemsForCheckout] = React.useState();
  const [totalForPayment, setTotalForPayment] = React.useState();

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

  return (
    <ApolloProvider client={client}>
      <ProductsContextProvider>
        <UserContextProvider>
          <CssBaseline />
          <ThemeProvider theme={Theme.default}>
            <Appbar
              updateEmptyLocalCart={handleEmptyCart}
              changeToLocalCart={handleChangeToLocalCart}
              cartTotal={cartTotal}
            />
            {location.pathname === '/' ? <Header /> : null}
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Products updateTotal={handleUpdateCartTotal} {...props} />}
              />
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
              <Route path="/login/" component={Login} />
            </Switch>
          </ThemeProvider>
        </UserContextProvider>
      </ProductsContextProvider>
    </ApolloProvider>
  );
};

export default App;
