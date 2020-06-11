import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';
import ProductsContextProvider from './context/ProductsContext';
import SnackbarContextProvider from './context/snackbarContext';
import UserContextProvider from './context/UserContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ProductsContextProvider>
    <UserContextProvider>
      <SnackbarContextProvider>
        <Router>
          <App />
        </Router>
      </SnackbarContextProvider>
    </UserContextProvider>
  </ProductsContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
