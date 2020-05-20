import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import * as Theme from '../ui/theme/index';
import Cart from './Cart/Cart';
import Products from './Products/Products';
import Appbar from './Appbar/Appbar';
import Header from './Header/Header';
import Login from './Checkout/Login';
import Checkout from './Checkout/Checkout';
import { saveUser, getUser, deleteUser } from '../utils/localStorage';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

let serverAuth = false;

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    if (headers) {
      console.log(headers.get('set-cookie'));
      const token = headers.get('x-access-token');
      if (token) {
        saveUser(token);
        serverAuth = true;
      } else {
        deleteUser();
        serverAuth = false;
      }
    }
    return response;
  });
});

export const authContext = React.createContext({
  auth: serverAuth,
  setAuth: () => {},
});

const link = ApolloLink.from([afterwareLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
  resolvers: {},
  typeDefs: `
    extend type Query {
      limit: Int!
      auth: Boolean!
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
  const [auth, setAuth] = React.useState(false);
  const value = { auth, setAuth };

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <authContext.Provider value={value}>
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
};

export default App;
