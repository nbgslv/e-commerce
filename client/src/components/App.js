import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import * as Theme from '../ui/theme/index';
import Cart from './Cart/Cart';
import Products from './Products/Products';
import Appbar from './Appbar/Appbar';
import Header from './Header/Header';
import Login from './Checkout/Login';
import Checkout from './Checkout/Checkout';
import { getUser } from '../utils/localStorage';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
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

  const handleUpdateCartTotal = total => {
    setCartTotal(total);
  };

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={Theme.default}>
        <Appbar />
        {location.pathname === '/' ? <Header /> : null}
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Products updateTotal={handleUpdateCartTotal} {...props} />}
          />
          <Route path="/products/category/:id" component={Products} />
          <Route
            path="/cart"
            render={props => <Cart updateCartTotal={handleUpdateCartTotal} {...props} />}
          />
          <Route
            path="/checkout"
            render={() => (getUser() ? <Checkout /> : <Redirect to="/login/" />)}
          />
          <Route path="/login/" component={Login} />
        </Switch>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
