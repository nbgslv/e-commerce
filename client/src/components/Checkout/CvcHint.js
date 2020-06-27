import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cvcHint from './creditcrads.png';

const useStyles = makeStyles({
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

const CvcHint = () => {
  const classes = useStyles();

  return (
    <div>
      The CVC is a 3 digit code located on the back of your card, <br />
      or a 4 digit code located as shown, on your <strong>American Express</strong> card.
      <br />
      <br />
      <img src={cvcHint} alt="CVC Hint" className={classes.img} />
    </div>
  );
};

export default CvcHint;
