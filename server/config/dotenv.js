const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  jwtSecret: process.env.JWT_SECRET_TOKEN,
  stripeSecret: process.env.STRIPE_SECRET_KEY,
};
