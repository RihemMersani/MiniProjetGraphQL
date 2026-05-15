const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `Serveur lancé sur http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();