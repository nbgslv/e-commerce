const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/dotenv');

const setToken = (email, id, expiration = 3600) =>
  jwt.sign({ email, id }, jwtSecret, {
    expiresIn: expiration,
  });

module.exports = {
  setToken,
};
