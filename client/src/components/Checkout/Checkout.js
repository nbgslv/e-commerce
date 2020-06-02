import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import marked from 'marked';
import { getUser } from '../../utils/localStorage';
import Products from './Products';
import GuestDetails from './GuestDetails';
import DelveryDetails from './DelveryDetails';
import StripeButton from './StripeButton';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const Checkout = ({ history, items, totalForPayment }) => {
  const [termsAndConditions, setTermsAndConditions] = React.useState();
  const steps = [
    'Purchase Summary',
    'Personal Details',
    'Delivery',
    'Terms & Conditions',
    'Payment',
  ];

  const getTermsAndConditions = () => {
    const mdFile = require('./temsandconditions.md');
    fetch(mdFile)
      .then(res => res.text())
      .then(text => setTermsAndConditions(marked(text)))
      .catch(console.log);
  };

  const [guestForm, setGuestForm] = React.useState(false);

  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(2);

  const [address, setAddress] = React.useState({});

  React.useEffect(() => getTermsAndConditions, [activeStep]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleGuest = () => setGuestForm(true);

  const handleLogin = () => {
    history.push('/login');
  };

  const handleComplete = () => 'Finshed';

  const handleGuestRegister = () => alert('guest registered');

  const [hideButton, setHideButton] = React.useState(false);

  React.useEffect(() => {
    setHideButton(guestForm);
  }, [guestForm]);

  React.useEffect(() => {
    if (activeStep === 2) setHideButton(true);
  }, [activeStep]);

  const stripePromise = loadStripe('pk_test_8u9bKgTYKQsLEKv4YZ0THX8b00XCTueNVx');

  const handleSetAddress = deliveryAddress => {
    setAddress(deliveryAddress);
  };

  const stepButton = step => {
    switch (step) {
      case 0:
      case 2:
        return {
          labelLeft: 'Back',
          functionLeft: () => handleBack(),
          labelRight: 'Next',
          functionRight: () => handleNext(),
        };
      case 1:
        return {
          labelLeft: getUser() ? 'Back' : 'Continue as a guest',
          functionLeft: () => (getUser() ? handleBack() : handleGuest()),
          labelRight: getUser() ? 'Next' : 'Login',
          functionRight: () => (getUser() ? handleNext() : handleLogin()),
        };
      case 3:
        return {
          labelLeft: 'Back',
          functionLeft: () => handleBack(),
          labelRight: 'I Agree',
          functionRight: () => handleNext(),
        };
      case 4:
        return {
          labelLeft: 'Back',
          functionLeft: () => handleBack(),
          labelRight: 'Complete Purchase',
          functionRight: () => handleComplete(),
        };
      default:
        return 'Unknown button configuration';
    }
  };

  const stepsContent = step => {
    switch (step) {
      case 0:
        return <Products products={items} totalForPayment={totalForPayment} />;
      case 1:
        return !getUser() ? (
          <>
            {guestForm ? (
              <GuestDetails
                handleBack={() => {
                  setGuestForm(false);
                  handleBack();
                }}
                handleNext={() => handleNext()}
              />
            ) : (
              <Typography color="textPrimary">
                It seems you are not connected to your account.
                <br />
                Would you like to continue as a guest, or would you rather login to your account?
                <br />
                <br />
              </Typography>
            )}
          </>
        ) : null;
      case 2:
        return (
          <DelveryDetails
            handleBack={() => {
              setHideButton(false);
              handleBack();
            }}
            handleNext={() => {
              setHideButton(false);
              handleNext();
            }}
            setAdrress={deliveryAddress => handleSetAddress(deliveryAddress)}
          />
        );
      case 3:
        // TODO fix div style to look like outlined textarea
        return (
          <div
            dangerouslySetInnerHTML={{ __html: termsAndConditions }}
            style={{ width: '100%', maxHeight: '400px', overflowY: 'scroll' }}
          />
        );
      case 4:
        return <StripeButton address={address} totalPayment={totalForPayment} />;
      default:
        return 'Unknown Step';
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{stepsContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {hideButton ? null : (
                    <>
                      <Button
                        disabled={activeStep === 0}
                        onClick={stepButton(activeStep).functionLeft}
                        className={classes.button}
                      >
                        {stepButton(activeStep).labelLeft}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={stepButton(activeStep).functionRight}
                        className={classes.button}
                      >
                        {stepButton(activeStep).labelRight}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </Elements>
  );
};

Checkout.propTypes = {};

export default Checkout;
