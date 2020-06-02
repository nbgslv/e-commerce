const configureStripe = require('stripe');
const { stripeSecret } = require('../config/dotenv');

const stripe = configureStripe(stripeSecret);

const paymentApi = app => {
  const generateResponse = intent => {
    // Note that if your API version is before 2019-02-11, 'requires_action'
    // appears as 'requires_source_action'.
    if (intent.status === 'requires_action' && intent.next_action.type === 'use_stripe_sdk') {
      // Tell the client to handle the action
      return {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret,
      };
    }
    if (intent.status === 'succeeded') {
      // The payment didn’t need any additional actions and completed!
      // Handle post-payment fulfillment
      return {
        success: true,
      };
    }
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status',
    };
  };

  app.post('/payment', async (req, res) => {
    try {
      let intent;
      if (req.body.payment_method_id) {
        // Create the PaymentIntent
        console.log(req.body);
        intent = await stripe.paymentIntents.create({
          payment_method: req.body.payment_method_id,
          amount: req.body.payment_total,
          currency: 'usd',
          confirmation_method: 'manual',
          confirm: true,
        });
      } else if (req.body.payment_intent_id) {
        intent = await stripe.paymentIntents.confirm(req.body.payment_intent_id);
      }
      // Send the response to the client
      res.send(generateResponse(intent));
    } catch (e) {
      // Display error on client
      return res.send({ error: e.message });
    }
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() });
  });
};

module.exports = paymentApi;
