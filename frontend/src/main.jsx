import React from "react";
import ReactDOM from "react-dom/client";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { ApolloProvider } from "@apollo/client/react";

import App from "./App";
import "./styles.css";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);