const jwt = require('jsonwebtoken');

const jwtTokenSecret = process.env.JWT_SECRET_TOKEN;

const setToken = (email, id, expiration = 3600) =>
  jwt.sign({ user: email, id }, jwtTokenSecret, {
    expiresIn: expiration,
  });

const tokenCookie = accessToken => ['access', accessToken, { httpOnly: true }];

module.exports = {
  setToken,
  tokenCookie,
};
