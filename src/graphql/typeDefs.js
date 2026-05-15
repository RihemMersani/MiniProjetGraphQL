const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type User {
    id: ID
    name: String
    email: String
    role: String
    created_at: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    register(
      name: String!,
      email: String!,
      password: String!,
      role: String
    ): String

    login(
      email: String!,
      password: String!
    ): AuthPayload
  }
`;

module.exports = typeDefs;