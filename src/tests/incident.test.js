const resolvers = require("../graphql/resolvers");

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

const db = require("../config/db");

describe("Tests Incident", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("incidents retourne la liste des incidents", async () => {
    const fakeIncidents = [
      {
        id: 1,
        type: "Accident",
        description: "Accident route principale",
        location: "Tunis",
        status: "SIGNALE",
      },
    ];

    db.query.mockImplementation((sql, callback) => {
      callback(null, fakeIncidents);
    });

    const result = await resolvers.Query.incidents();

    expect(result).toEqual(fakeIncidents);
  });

  test("addIncident ajoute un incident", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.addIncident(null, {
      type: "Accident",
      description: "Accident route principale",
      location: "Tunis",
      status: "SIGNALE",
    });

    expect(result).toBe("Incident ajouté avec succès");
  });

  test("updateIncidentStatus modifie le statut d'un incident", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.updateIncidentStatus(null, {
      id: 1,
      status: "RESOLU",
    });

    expect(result).toBe("Statut de l'incident mis à jour");
  });
});