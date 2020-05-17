import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import * as Theme from '../ui/theme/index';
import Cart from './Cart/Cart';
import Products from './Products/Products';
import Appbar from './Appbar/Appbar';
import Header from './Header/Header';
import Login from './Checkout/Login';
import Checkout from './Checkout/Checkout';

const isAuthenticated = sessionStorage.getItem('token');

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = isAuthenticated;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  typeDefs: `
    extend type Query {
      limit: Int!
    }
  `,
});

cache.writeData({
  data: {
    limit: 5,
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <CssBaseline />
    <ThemeProvider theme={Theme.default}>
      <Appbar />
      <Header />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route path="/products/category/:id" component={Products} />
        <Route path="/cart" component={Cart} />
        <Route
          path="/checkout"
          render={() => (isAuthenticated ? <Checkout /> : <Redirect to="/login/" />)}
        />
        <Route path="/login/" component={Login} />
      </Switch>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
