const resolvers = require("../graphql/resolvers");

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

const db = require("../config/db");

describe("Tests des Queries", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("hello retourne un message de succès", () => {
    const result = resolvers.Query.hello();

    expect(result).toBe("Serveur GraphQL fonctionne correctement");
  });

  test("users retourne la liste des utilisateurs", async () => {
    const fakeUsers = [
      {
        id: 1,
        name: "Rihem",
        email: "rihem@test.com",
        role: "ADMIN",
      },
    ];

    db.query.mockImplementation((sql, callback) => {
      callback(null, fakeUsers);
    });

    const result = await resolvers.Query.users();

    expect(result).toEqual(fakeUsers);
  });
});