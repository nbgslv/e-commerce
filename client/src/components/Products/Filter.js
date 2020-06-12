import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  text: {
    margin: '0 8px',
  },
  gridItem: {
    maxHeight: '36px',
    margin: '0 8px',
  },
  filter: {
    display: 'inline',
    float: 'right',
  },
});

const Filter = ({ limit, client }) => {
  const classes = useStyles();

  return (
    <div className={classes.filter}>
      <Typography display="inline" variant="h6" color="textSecondary" className={classes.text}>
        Number of products:{' '}
      </Typography>
      <Select
        className={classes.gridItem}
        id="limit"
        value={limit}
        onChange={e => client.writeData({ data: { limit: e.target.value } })}
      >
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={64}>64</MenuItem>
      </Select>
    </div>
  );
};

Filter.propTypes = {
  limit: PropTypes.number.isRequired,
  client: PropTypes.shape({
    writeData: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(Filter);
