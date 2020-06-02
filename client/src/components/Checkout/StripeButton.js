import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '@material-ui/core/Button';
import './StripeCardSectionStyles.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeButton = ({ address, totalPayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleServerResponse = async response => {
    if (response.error) {
      // Show error from server on payment form
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } = await stripe.handleCardAction(
        response.payment_intent_client_secret
      );

      if (errorAction) {
        // Show error from Stripe.js in payment form
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch('http://localhost:4000/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            payment_intent_id: paymentIntent.id,
            payment_total: totalPayment * 100, // USD to cents
          }),
        });
        handleServerResponse(await serverResponse.json());
      }
    } else {
      console.log('success');
    }
  };

  const stripePaymentMethodHandler = async result => {
    if (result.error) {
      // Show error in payment form
      console.log(result.error);
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 4)
      const res = await fetch('http://localhost:4000/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
          payment_total: totalPayment * 100, // USD to cents
        }),
      });
      const paymentResponse = await res.json();

      handleServerResponse(paymentResponse);
    }
  };

  const handlePayment = async event => {
    event.preventDefault();

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        address: {
          city: address.city,
          country: address.country,
          line1: address.address1,
          line2: address.address2,
          postal_code: address.zipcode,
          state: null,
        },
        email: null,
        name: address.recipientName,
      },
    });
    stripePaymentMethodHandler(result);
  };

  return (
    <form onSubmit={handlePayment}>
      Card details
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <Button type="submit" disabled={!stripe}>
        Submit Payment
      </Button>
    </form>
  );
};

export default StripeButton;
