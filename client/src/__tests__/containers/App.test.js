import '@testing-library/jest-dom';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import App from '../../containers/App';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']} keyLength={0}>
        <App />
      </MemoryRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
