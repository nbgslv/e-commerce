import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router-dom';
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
import { saveUser, getUser } from '../utils/localStorage';

export const authContext = React.createContext();

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
  fetch: async (uri, options) => {
    const initialRequest = await fetch(uri, options);
    const { headers } = initialRequest;
    const accessToken = headers.get('x-access-token');
    if (accessToken) saveUser(accessToken);
  },
});

cache.writeData({
  data: {
    limit: 16,
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <CssBaseline />
    <authContext.Provider value={Boolean(getUser())}>
      <ThemeProvider theme={Theme.default}>
        <Appbar />
        <Header />
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/products/category/:id" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route
            path="/checkout"
            render={() => (getUser() ? <Checkout /> : <Redirect to="/login/" />)}
          />
          <Route path="/login/" component={Login} />
        </Switch>
      </ThemeProvider>
    </authContext.Provider>
  </ApolloProvider>
);

export default App;
