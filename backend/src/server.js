const express = require("express");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connecté WebSocket :", socket.id);

  socket.emit("notification", {
    title: "Connexion temps réel",
    message: "WebSocket connecté avec succès.",
  });

  socket.on("disconnect", () => {
    console.log("Client déconnecté WebSocket :", socket.id);
  });
});

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      io,
    }),
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(
      `Serveur lancé sur http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(`WebSocket lancé sur http://localhost:${PORT}`);
  });
}

startServer();