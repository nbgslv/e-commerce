const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/dotenv');

const setToken = async (email, id, expiration = 3600) => {
  try {
    return jwt.sign({ email, id }, jwtSecret, {
      expiresIn: expiration,
    });
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

const decodeToken = async token => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

module.exports = {
  setToken,
  decodeToken,
};
