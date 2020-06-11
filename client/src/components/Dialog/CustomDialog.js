import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomDialog = ({
  open,
  title,
  message,
  leftButtonLabel,
  rightButtonLabel,
  onCloseHandler,
}) => {
  const [selfOpen, setSelfOpen] = React.useState(false);

  React.useEffect(() => {
    setSelfOpen(open);
  }, [open]);

  const handleOnClose = button => {
    setSelfOpen(false);
    onCloseHandler(button);
  };

  return (
    <Dialog
      open={selfOpen}
      onClose={handleOnClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button name="leftButton" onClick={() => handleOnClose('left')} color="primary">
          {leftButtonLabel}
        </Button>
        <Button name="rightButton" onClick={() => handleOnClose('right')} color="primary" autoFocus>
          {rightButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  leftButtonLabel: PropTypes.string.isRequired,
  rightButtonLabel: PropTypes.string.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};

export default CustomDialog;
