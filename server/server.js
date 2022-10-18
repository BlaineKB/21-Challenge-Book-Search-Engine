const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Import the apollo server
const { ApolloServer } = require('apollo-server-express');

// Import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require ('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// New apollo server with schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// Creates new instance of apollo server with GraphQL schema
const runApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}!`);
    })
  })
};

// Calls function to start apollo server
runApolloServer(typeDefs, resolvers);


