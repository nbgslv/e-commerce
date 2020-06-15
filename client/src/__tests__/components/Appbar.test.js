import '@testing-library/jest-dom';
import ObjectID from 'bson-objectid';
import { shallow, mount } from 'enzyme';
import { render, act } from '@testing-library/react';
import toJson from 'enzyme-to-json';
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import UserContextProvider, { UserContext } from '../../context/UserContext';
import SnackbarContextProvider from '../../context/snackbarContext';
import Appbar from '../../components/Appbar/Appbar';
import { GET_USER, CART_CHANGED } from '../../constants';

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        _id: ObjectID,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        cart: {
          total: 0,
          products: [],
        },
      },
    },
  },
  {
    request: {
      query: CART_CHANGED,
    },
    result: {
      data: {
        cartChanged: {
          total: 0,
          products: [
            {
              _id: ObjectID,
              title: 'Hot Chips',
              price: 10,
              quantity: 1,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: CART_CHANGED,
    },
    result: {
      data: {
        cartChanged: {
          total: 0,
          products: [
            {
              _id: ObjectID,
              title: 'Hot Chips',
              price: 10,
              quantity: 1,
            },
          ],
        },
      },
    },
  },
];

const initializeUserState = {
  user: {
    guest: true,
    cart: {
      total: 0,
      products: [],
    },
  },
};

describe('Appbar', () => {
  let wrapper;
  let userContextMock;
  let mockUserContext;
  beforeEach(() => {
    mockUserContext = {
      dispatch: jest.fn(),
      state: {
        user: {
          guest: true,
          cart: {
            total: 0,
            products: [],
          },
        },
      },
    };
    userContextMock = React.useContext = jest.fn();
    wrapper = mount(
      <MemoryRouter initialEntries={['/']} keyLength={0}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Appbar />
        </MockedProvider>
      </MemoryRouter>
    );
  });
  afterEach(() => {
    userContextMock.mockReset();
    wrapper.unmount();
  });
  it('shows sign in button', () => {
    console.log(wrapper.debug());
    expect(wrapper.find(Button).filter('[href="/login/"]').at(0).text()).toEqual('Login');
  });
  it('shows sign up button', () => {
    expect(wrapper.find(Button).filter('[name="signupButton"]').at(0).text()).toEqual('Sign Up');
  });
  it('should hide sign up button when user logged in', async () => {
    const promise = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          userContextMock.mockReturnValue({
            ...mockUserContext,
            state: {
              ...mockUserContext.state,
              user: {
                ...mockUserContext.user,
                guest: false,
              },
            },
          });
          resolve(wrapper);
        }, 3000);
      });
    };
    await act(async () => {
      return promise().then(res => {
        expect(res.find(Button).filter('[name="signupButton"]').at(0).exists()).toBe(false);
      });
    });
  });
});
