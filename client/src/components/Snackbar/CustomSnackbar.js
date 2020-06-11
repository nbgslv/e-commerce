import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbars = ({ open, severity, message, onCloseHandler }) => {
  const [selfOpen, setSelfOpen] = React.useState(open);
  const classes = useStyles();

  React.useEffect(() => {
    setSelfOpen(open);
  }, [open]);

  const handleOnClose = () => {
    setSelfOpen(false);
    onCloseHandler();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={selfOpen} autoHideDuration={6000} onClose={handleOnClose}>
        <MuiAlert elevation={6} variant="filled" severity={severity} onClose={handleOnClose}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

CustomSnackbars.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};

export default CustomSnackbars;
