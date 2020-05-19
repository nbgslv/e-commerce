const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('./config/database'); // Must be provided even if not used, to connect to MongoDB instance
const User = require('./modules/user/user.model');
const { tokenCookie, setToken } = require('./modules/helpers/auth');

const typeDefs = require('./modules/index.typedefs');
const resolvers = require('./modules/index.resolvers');

const jwtSecret = process.env.JWT_SECRET_TOKEN;

const validateTokensMiddleware = async (req, res, next) => {
  const parsedToken = req.cookies.access;
  if (!parsedToken) return next();

  const decodedToken = jwt.verify(tokenCookie, jwtSecret);
  if (decodedToken && decodedToken.user) {
    const user = await User.findById(decodedToken.user.id);
    if (!user) {
      // remove cookies if token not valid
      res.clearCookie('access');
      return next();
    }

    const userToken = setToken(user.email, user.id);
    req.user = decodedToken.user;
    // update the cookies with new tokens
    const cookie = tokenCookie(userToken);
    res.cookie(...cookie);

    return next();
  }
  next();
};

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(validateTokensMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    try {
      const token = req ? req.headers.authorization : connection.context.authorization;
      const user = await getUser(token);
      return { token: user };
    } catch (e) {
      console.log('context', e.message);
      return {};
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql');
});
