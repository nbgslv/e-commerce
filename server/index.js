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

const { jwtSecret } = require('./config/dotenv');

const validateTokensMiddleware = async (req, res, next) => {
  const parsedToken = req.cookies['access'];
  console.log('token', parsedToken);
  if (!parsedToken) return next();

  const decodeToken = async () => {
    try {
      return jwt.verify(parsedToken, jwtSecret);
    } catch (e) {
      console.log(e.message);
      console.log('cookie cleared, no user found');
      res.clearCookie('access');
      return next();
    }
  };
  const decodedToken = await decodeToken();
  console.log('decoded token', decodedToken);
  if (decodedToken && decodedToken.id) {
    const user = await User.findById(decodedToken.id);
    console.log('user', user);
    if (!user) {
      // remove cookies if token not valid
      console.log('cookie cleared, no user found');
      res.clearCookie('access');
      return next();
    }

    const userToken = setToken(user.email, user.id);
    req.user = decodedToken.email;
    // update the cookies with new tokens
    res.cookie('access', userToken, { httpOnly: true });
    res.set({
      'Access-Control-Expose-Headers': 'x-access-token',
      'x-access-token': userToken,
    });
    console.log('good user', res.cookie);

    return next();
  }
  next();
};

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(validateTokensMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res, connection }) => ({ req, res }),
  //   try {
  //     const token = req ? req.headers.authorization : connection.context.authorization;
  //     const user = await getUser(token);
  //     return { token: user };
  //   } catch (e) {
  //     console.log('context', e.message);
  //     return {};
  //   }
  // },
  cors: false,
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql');
});
