import React from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import HelpIcon from '@material-ui/icons/Help';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../context/UserContext';
import CustomSnackbar from '../Snackbar/CustomSnackbar';
import CvcHint from './CvcHint';
import StripeInput from './StripeInput';
import { computeTotal } from '../../utils/cart';

const useStyles = makeStyles({
  cvcHintGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cvcHint: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  buttons: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    right: '63px',
    marginTop: -12,
    marginLeft: -12,
  },
});

const StripeForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const { state } = React.useContext(UserContext);
  const [totalForPayment, setTotalForPayment] = React.useState(0);
  const [cardHolderName, setCardHolderName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const closeSnackBar = () => setOpen(false);

  React.useEffect(() => setTotalForPayment(computeTotal(state.user.cart.products)), [
    state.user.cart.total,
    state.user.cart.products,
  ]);

  const handleServerResponse = async response => {
    if (response) setLoading(false);
    if (response.error) {
      setSeverity('error');
      setMessage(response.error);
      setOpen(true);
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } = await stripe.handleCardAction(
        response.payment_intent_client_secret
      );

      if (errorAction) {
        setSeverity('error');
        setMessage(errorAction.message);
        setOpen(true);
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch('http://localhost:4000/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            payment_intent_id: paymentIntent.id,
            payment_total: totalForPayment * 100, // USD to cents
          }),
        });
        handleServerResponse(await serverResponse.json());
      }
    } else {
      history.push('/orderconfirmed');
    }
  };

  const stripePaymentMethodHandler = async result => {
    // Otherwise send paymentMethod.id to your server (see Step 4)
    const res = await fetch('http://localhost:4000/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_method_id: result.paymentMethod.id,
        payment_total: totalForPayment * 100, // USD to cents
      }),
    });
    const paymentResponse = await res.json();

    handleServerResponse(paymentResponse);
  };

  const handlePayment = async event => {
    event.preventDefault();
    setLoading(true);
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        // Include any additional collected billing details.
        address: {
          city: state.user.address.city,
          country: state.user.address.country,
          line1: state.user.address.address1,
          line2: state.user.address.address2,
          postal_code: state.user.address.zipcode,
          state: state.user.address.state,
        },
        email: state.user.email,
        name: cardHolderName,
      },
    });
    stripePaymentMethodHandler(result);
  };

  return (
    <>
      <form onSubmit={handlePayment}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextField
              fullWidth
              onChange={e => setCardHolderName(e.target.value)}
              name="cardHolderName"
              label="Card holder's name"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              name="ccnumber"
              label="Credit Card Number"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputComponent: StripeInput,
                inputProps: {
                  component: CardNumberElement,
                },
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              name="ccnumber"
              label="Credit Expiry"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputComponent: StripeInput,
                inputProps: {
                  component: CardExpiryElement,
                },
              }}
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              fullWidth
              name="ccnumber"
              label="CVC"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputComponent: StripeInput,
                inputProps: {
                  component: CardCvcElement,
                },
              }}
            />
          </Grid>
          <Grid item md={1} className={classes.cvcHintGrid}>
            <Tooltip title={<CvcHint />}>
              <HelpIcon />
            </Tooltip>
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button type="submit" variant="contained" color="primary" disabled={!stripe || loading}>
            Submit Payment
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
      <CustomSnackbar
        open={open}
        severity={severity}
        message={message}
        onCloseHandler={closeSnackBar}
        timeOut={10000}
      />
    </>
  );
};

export default StripeForm;
