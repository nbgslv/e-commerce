const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('./config/database'); // Must be provided even if not used, to connect to MongoDB instance
const { decodeToken } = require('./modules/helpers/auth');
const configureRoutes = require('./routes');

const typeDefs = require('./modules/index.typedefs');
const resolvers = require('./modules/index.resolvers');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

configureRoutes(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res, connection }) => {
    if (connection) {
      return {
        ...connection.context,
      };
    }
    const token = req.cookies['token'] || '';
    try {
      const { email, id } = await decodeToken(token);
      return { email, id, res };
    } catch (e) {
      console.log('context', e.message);
      res.clearCookie('token');
      return { email: null, id: null, res };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql');
  console.log(`Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`);
});
