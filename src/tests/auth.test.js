const resolvers = require("../graphql/resolvers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const db = require("../config/db");

describe("Tests Auth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "secret_key_traffic_project";
  });

  test("register ajoute un utilisateur", async () => {
    bcrypt.hash.mockResolvedValue("hashed_password");

    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.register(null, {
      name: "Rihem",
      email: "rihem@test.com",
      password: "123456",
      role: "ADMIN",
    });

    expect(result).toBe("Utilisateur ajouté avec succès");
  });

  test("login retourne un token", async () => {
    const fakeUser = {
      id: 1,
      name: "Rihem",
      email: "rihem@test.com",
      password: "hashed_password",
      role: "ADMIN",
    };

    db.query.mockImplementation((sql, params, callback) => {
      callback(null, [fakeUser]);
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake_token");

    const result = await resolvers.Mutation.login(null, {
      email: "rihem@test.com",
      password: "123456",
    });

    expect(result.token).toBe("fake_token");
    expect(result.user).toEqual(fakeUser);
  });

  test("login échoue si email incorrect", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null, []);
    });

    await expect(
      resolvers.Mutation.login(null, {
        email: "fake@test.com",
        password: "123456",
      })
    ).rejects.toThrow("Email incorrect");
  });

  test("login échoue si mot de passe incorrect", async () => {
    const fakeUser = {
      id: 1,
      email: "rihem@test.com",
      password: "hashed_password",
      role: "ADMIN",
    };

    db.query.mockImplementation((sql, params, callback) => {
      callback(null, [fakeUser]);
    });

    bcrypt.compare.mockResolvedValue(false);

    await expect(
      resolvers.Mutation.login(null, {
        email: "rihem@test.com",
        password: "wrong_password",
      })
    ).rejects.toThrow("Mot de passe incorrect");
  });
});