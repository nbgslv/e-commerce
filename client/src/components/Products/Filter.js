import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

const Filter = ({ limit, client }) => (
  <>
    <label htmlFor="limit">Number of products: </label>{' '}
    <select
      id="limit"
      value={limit}
      onChange={e => client.writeData({ data: { limit: e.target.value } })}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  </>
);

Filter.propTypes = {
  limit: PropTypes.number.isRequired,
  client: PropTypes.shape({
    writeData: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(Filter);
