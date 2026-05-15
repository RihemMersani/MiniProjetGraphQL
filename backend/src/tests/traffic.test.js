const resolvers = require("../graphql/resolvers");

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

const db = require("../config/db");

describe("Tests Traffic Zone", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("trafficZones retourne la liste des zones", async () => {
    const fakeZones = [
      {
        id: 1,
        name: "Centre Ville",
        location: "Tunis",
        density: 80,
        level: "ELEVE",
      },
    ];

    db.query.mockImplementation((sql, callback) => {
      callback(null, fakeZones);
    });

    const result = await resolvers.Query.trafficZones();

    expect(result).toEqual(fakeZones);
  });

  test("addTrafficZone ajoute une zone avec niveau FAIBLE", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.addTrafficZone(null, {
      name: "Zone A",
      location: "Mateur",
      density: 20,
    });

    expect(db.query).toHaveBeenCalledWith(
      expect.any(String),
      ["Zone A", "Mateur", 20, "FAIBLE"],
      expect.any(Function)
    );

    expect(result).toBe("Zone de trafic ajoutée avec succès");
  });

  test("addTrafficZone ajoute une zone avec niveau MOYEN", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.addTrafficZone(null, {
      name: "Zone B",
      location: "Tunis",
      density: 50,
    });

    expect(db.query).toHaveBeenCalledWith(
      expect.any(String),
      ["Zone B", "Tunis", 50, "MOYEN"],
      expect.any(Function)
    );

    expect(result).toBe("Zone de trafic ajoutée avec succès");
  });

  test("addTrafficZone ajoute une zone avec niveau ELEVE", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.addTrafficZone(null, {
      name: "Zone C",
      location: "Centre Ville",
      density: 90,
    });

    expect(db.query).toHaveBeenCalledWith(
      expect.any(String),
      ["Zone C", "Centre Ville", 90, "ELEVE"],
      expect.any(Function)
    );

    expect(result).toBe("Zone de trafic ajoutée avec succès");
  });
});