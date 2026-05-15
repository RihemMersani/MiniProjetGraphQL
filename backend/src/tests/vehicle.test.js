const resolvers = require("../graphql/resolvers");

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

const db = require("../config/db");

describe("Tests Vehicle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("vehicles retourne la liste des véhicules", async () => {
    const fakeVehicles = [
      {
        id: 1,
        matricule: "123TUN456",
        type: "Voiture",
        marque: "Toyota",
        etat: "ACTIF",
      },
    ];

    db.query.mockImplementation((sql, callback) => {
      callback(null, fakeVehicles);
    });

    const result = await resolvers.Query.vehicles();

    expect(result).toEqual(fakeVehicles);
  });

  test("vehicle retourne un véhicule par id", async () => {
    const fakeVehicle = {
      id: 1,
      matricule: "123TUN456",
      type: "Voiture",
      marque: "Toyota",
      etat: "ACTIF",
    };

    db.query.mockImplementation((sql, params, callback) => {
      callback(null, [fakeVehicle]);
    });

    const result = await resolvers.Query.vehicle(null, {
      id: 1,
    });

    expect(result).toEqual(fakeVehicle);
  });

  test("addVehicle ajoute un véhicule", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.addVehicle(null, {
      matricule: "123TUN456",
      type: "Voiture",
      marque: "Toyota",
      etat: "ACTIF",
    });

    expect(result).toBe("Véhicule ajouté avec succès");
  });

  test("addVehiclePosition ajoute une position GPS", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.addVehiclePosition(null, {
      vehicle_id: 1,
      latitude: 36.8065,
      longitude: 10.1815,
    });

    expect(result).toBe("Position GPS ajoutée avec succès");
  });
});