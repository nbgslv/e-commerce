import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  gridItem: {
    maxHeight: '36px',
  },
});

const Filter = ({ limit, client }) => {
  const classes = useStyles();

  return (
    <>
      <Typography display="inline" variant="button">
        Number of products:{' '}
      </Typography>
      <Select
        className={classes.gridItem}
        variant="outlined"
        id="limit"
        value={limit}
        onChange={e => client.writeData({ data: { limit: e.target.value } })}
      >
        <option value={4}>4</option>
        <option value={16}>16</option>
        <option value={64}>64</option>
      </Select>
    </>
  );
};

Filter.propTypes = {
  limit: PropTypes.number.isRequired,
  client: PropTypes.shape({
    writeData: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(Filter);
