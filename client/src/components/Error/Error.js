import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Error = ({ errorCode, errorMessage }) => {
  return (
    <Paper elevation={3}>
      <Typography variant="caption" color="primary">
        {errorCode}
      </Typography>
      <Typography variant="body1">{errorMessage}</Typography>
    </Paper>
  );
};

Error.propTypes = {
  errorCode: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Error;
