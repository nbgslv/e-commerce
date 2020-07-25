import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Hidden } from '@material-ui/core';
import { getUser } from '../utils/localStorage';
import OrderReview from '../components/Checkout/OrderReview';
import GuestDetails from '../components/Checkout/GuestDetails';
import DeliveryDetails from '../components/Checkout/DeliveryDetails';
import StripeForm from '../components/Checkout/StripeForm';
import UserDetails from '../components/Checkout/UserDetails';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const Checkout = ({ history }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [guestForm, setGuestForm] = React.useState(false);
  const [address, setAddress] = React.useState({});
  const [hideButton, setHideButton] = React.useState(false);
  const [disableNext, setDisableNext] = React.useState(false);

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

  const setNextButtonTerms = checked => {
    setDisableNext(checked);
  };

  const handleSetAddress = deliveryAddress => {
    setAddress(deliveryAddress);
  };

  React.useEffect(() => {
    setHideButton(guestForm);
  }, [guestForm]);

  React.useEffect(() => {
    if (activeStep === 1 || activeStep === 3) setHideButton(true);
  }, [activeStep]);

  const stripePromise = loadStripe('pk_test_8u9bKgTYKQsLEKv4YZ0THX8b00XCTueNVx');

  const steps = ['Personal Details', 'Shipping Address', 'Review Your Order', 'Payment'];

  const stepButton = step => {
    switch (step) {
      case 0:
        return {
          labelLeft: getUser() ? 'Back' : 'Continue as a guest',
          functionLeft: () => (getUser() ? handleBack() : handleGuest()),
          labelRight: getUser() ? 'Next' : 'Login',
          functionRight: () => (getUser() ? handleNext() : handleLogin()),
        };
      case 1:
      case 2:
        return {
          labelLeft: 'Back',
          functionLeft: () => handleBack(),
          labelRight: 'Confirm & Continue',
          functionRight: () => handleNext(),
        };
      case 3:
        return {
          labelLeft: 'Back',
          functionLeft: () => handleBack(),
          labelRight: 'I Agree',
          functionRight: () => handleNext(),
        };
      default:
        return 'Unknown button configuration';
    }
  };

  const stepsContent = step => {
    switch (step) {
      case 0:
        return !getUser() ? (
          <>
            {guestForm ? (
              <GuestDetails
                handleBack={() => {
                  setGuestForm(false);
                }}
                handleNext={() => handleNext()}
              />
            ) : (
              <Typography variant="subtitle2">
                You are not connected.
                <br />
                Continue as guest or login?
                <br />
                <br />
              </Typography>
            )}
          </>
        ) : (
          <UserDetails handleNext={() => handleNext()} handleBack={() => handleBack()} />
        );
      case 1:
        return (
          <DeliveryDetails
            handleBack={() => {
              if (!guestForm) setHideButton(false);
              handleBack();
            }}
            handleNext={() => {
              setHideButton(false);
              handleNext();
            }}
            setAdrress={deliveryAddress => handleSetAddress(deliveryAddress)}
          />
        );
      case 2:
        return <OrderReview setNextButton={checked => setNextButtonTerms(checked)} />;
      case 3:
        return <StripeForm address={address} />;
      default:
        return 'Unknown Step';
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <MobileStepper
            variant="dots"
            steps={4}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
              <Button
                size="small"
                disabled={(activeStep === 2 && !disableNext) || hideButton}
                color="primary"
                onClick={stepButton(activeStep).functionRight}
              >
                {hideButton ? 'Next' : stepButton(activeStep).labelRight}
              </Button>
            }
            backButton={
              <Button
                size="small"
                disabled={
                  (activeStep === 0 && stepButton(activeStep).labelLeft === 'Back') || hideButton
                }
                onClick={stepButton(activeStep).functionLeft}
              >
                {hideButton ? 'Back' : stepButton(activeStep).labelLeft}
              </Button>
            }
          />
          <Hidden xsDown>
            <Stepper activeStep={activeStep}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Hidden>
          {activeStep === steps.length ? (
            <>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </>
          ) : (
            <>
              {stepsContent(activeStep)}
              <Hidden xsDown>
                {!hideButton && (
                  <div className={classes.buttons}>
                    <Button
                      disabled={activeStep === 0 && stepButton(activeStep).labelLeft === 'Back'}
                      onClick={stepButton(activeStep).functionLeft}
                      className={classes.button}
                    >
                      {stepButton(activeStep).labelLeft}
                    </Button>
                    <Button
                      disabled={activeStep === 2 && !disableNext}
                      variant="contained"
                      color="primary"
                      onClick={stepButton(activeStep).functionRight}
                      className={classes.button}
                    >
                      {stepButton(activeStep).labelRight}
                    </Button>
                  </div>
                )}
              </Hidden>
            </>
          )}
          {activeStep === 2 && (
            <MobileStepper
              variant="dots"
              steps={4}
              position="static"
              activeStep={activeStep}
              className={classes.root}
              nextButton={
                <Button
                  size="small"
                  disabled={(activeStep === 2 && !disableNext) || hideButton}
                  color="primary"
                  onClick={stepButton(activeStep).functionRight}
                >
                  {hideButton ? 'Next' : stepButton(activeStep).labelRight}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  disabled={
                    (activeStep === 0 && stepButton(activeStep).labelLeft === 'Back') || hideButton
                  }
                  onClick={stepButton(activeStep).functionLeft}
                >
                  {hideButton ? 'Back' : stepButton(activeStep).labelLeft}
                </Button>
              }
            />
          )}
        </Paper>
      </main>
    </Elements>
  );
};

Checkout.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Checkout;
