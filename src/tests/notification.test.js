const resolvers = require("../graphql/resolvers");

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

const db = require("../config/db");

describe("Tests Notification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("notifications retourne la liste des notifications", async () => {
    const fakeNotifications = [
      {
        id: 1,
        user_id: 1,
        message: "Nouvelle alerte",
        is_read: false,
      },
    ];

    db.query.mockImplementation((sql, callback) => {
      callback(null, fakeNotifications);
    });

    const result = await resolvers.Query.notifications();

    expect(result).toEqual(fakeNotifications);
  });

  test("addNotification ajoute une notification", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.addNotification(null, {
      user_id: 1,
      message: "Nouvelle alerte",
    });

    expect(result).toBe("Notification envoyée");
  });

  test("markNotificationAsRead marque une notification comme lue", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null);
    });

    const result = await resolvers.Mutation.markNotificationAsRead(null, {
      id: 1,
    });

    expect(result).toBe("Notification marquée comme lue");
  });
});