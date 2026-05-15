const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    role: String
    created_at: String
  }

  type Vehicle {
    id: ID
    matricule: String
    type: String
    marque: String
    etat: String
    created_at: String
  }

  type VehiclePosition {
    id: ID
    vehicle_id: ID
    latitude: Float
    longitude: Float
    date_position: String
  }

  type Incident {
    id: ID
    type: String
    description: String
    location: String
    status: String
    created_at: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    hello: String
    users: [User]
    vehicles: [Vehicle]
    vehicle(id: ID!): Vehicle
    vehiclePositions(vehicle_id: ID!): [VehiclePosition]
    incidents: [Incident]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, role: String): String

    login(email: String!, password: String!): AuthPayload

    addVehicle(
      matricule: String!
      type: String!
      marque: String!
      etat: String
    ): String

    addVehiclePosition(
      vehicle_id: ID!
      latitude: Float!
      longitude: Float!
    ): String

    addIncident(
      type: String!
      description: String!
      location: String!
      status: String
    ): String

    updateIncidentStatus(
      id: ID!
      status: String!
    ): String
  }
`;

module.exports = typeDefs;