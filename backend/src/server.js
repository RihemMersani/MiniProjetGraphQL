const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
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

function verifyToken(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token;
  const user = verifyToken(token);

  if (user) {
    socket.join(`user_${user.id}`);
    console.log(`Utilisateur ${user.id} connecté WebSocket`);
  }

  socket.on("disconnect", () => {
    console.log("Client déconnecté WebSocket :", socket.id);
  });
});

function getUserFromToken(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  return verifyToken(token);
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = getUserFromToken(req);

      return {
        io,
        user,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`WebSocket lancé sur http://localhost:${PORT}`);
  });
}

startServer();