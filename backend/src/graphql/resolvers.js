const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    hello: () => "Serveur GraphQL fonctionne correctement",

    users: async () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
    },

    vehicles: async () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM vehicles", (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
    },

    vehicle: async (_, args) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM vehicles WHERE id = ?",
          [args.id],
          (error, results) => {
            if (error) reject(error);
            else resolve(results[0]);
          }
        );
      });
    },

    vehiclePositions: async (_, args) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM vehicle_positions WHERE vehicle_id = ?",
          [args.vehicle_id],
          (error, results) => {
            if (error) reject(error);
            else resolve(results);
          }
        );
      });
    },

    incidents: async () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM incidents", (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
    },

    trafficZones: async () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM traffic_zones", (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
    },

    notifications: async () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM notifications", (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
    },
  },

  Mutation: {
    register: async (_, args) => {
      const { name, email, password, role } = args;
      const hashedPassword = await bcrypt.hash(password, 10);

      return new Promise((resolve, reject) => {
        const sql = `
          INSERT INTO users(name, email, password, role)
          VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [name, email, hashedPassword, role || "OPERATOR"], (error) => {
          if (error) reject(error);
          else resolve("Utilisateur ajouté avec succès");
        });
      });
    },

    login: async (_, args) => {
      const { email, password } = args;

      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], async (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length === 0) {
            reject(new Error("Email incorrect"));
            return;
          }

          const user = results[0];
          const validPassword = await bcrypt.compare(password, user.password);

          if (!validPassword) {
            reject(new Error("Mot de passe incorrect"));
            return;
          }

          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          resolve({
            token,
            user,
          });
        });
      });
    },

    addVehicle: async (_, args) => {
      const { matricule, type, marque, etat } = args;

      return new Promise((resolve, reject) => {
        const sql = `
          INSERT INTO vehicles(matricule, type, marque, etat)
          VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [matricule, type, marque, etat || "ACTIF"], (error) => {
          if (error) reject(error);
          else resolve("Véhicule ajouté avec succès");
        });
      });
    },

    addVehiclePosition: async (_, args) => {
      const { vehicle_id, latitude, longitude } = args;

      return new Promise((resolve, reject) => {
        const sql = `
          INSERT INTO vehicle_positions(vehicle_id, latitude, longitude)
          VALUES (?, ?, ?)
        `;

        db.query(sql, [vehicle_id, latitude, longitude], (error) => {
          if (error) reject(error);
          else resolve("Position GPS ajoutée avec succès");
        });
      });
    },

    addIncident: async (_, args) => {
      const { type, description, location, status } = args;

      return new Promise((resolve, reject) => {
        const sql = `
          INSERT INTO incidents(type, description, location, status)
          VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [type, description, location, status || "SIGNALE"], (error) => {
          if (error) reject(error);
          else resolve("Incident ajouté avec succès");
        });
      });
    },

    updateIncidentStatus: async (_, args) => {
      const { id, status } = args;

      return new Promise((resolve, reject) => {
        const sql = `
          UPDATE incidents
          SET status = ?
          WHERE id = ?
        `;

        db.query(sql, [status, id], (error) => {
          if (error) reject(error);
          else resolve("Statut de l'incident mis à jour");
        });
      });
    },

    addTrafficZone: async (_, args) => {
      const { name, location, density } = args;

      let level = "FAIBLE";

      if (density > 70) {
        level = "ELEVE";
      } else if (density > 30) {
        level = "MOYEN";
      }

      return new Promise((resolve, reject) => {
        const sql = `
          INSERT INTO traffic_zones(name, location, density, level)
          VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [name, location, density, level], (error) => {
          if (error) reject(error);
          else resolve("Zone de trafic ajoutée avec succès");
        });
      });
    },

    addNotification: async (_, args) => {
      const { user_id, message } = args;

      return new Promise((resolve, reject) => {
        const sql = `
          INSERT INTO notifications(user_id, message)
          VALUES (?, ?)
        `;

        db.query(sql, [user_id, message], (error) => {
          if (error) reject(error);
          else resolve("Notification envoyée");
        });
      });
    },

    markNotificationAsRead: async (_, args) => {
      return new Promise((resolve, reject) => {
        const sql = `
          UPDATE notifications
          SET is_read = true
          WHERE id = ?
        `;

        db.query(sql, [args.id], (error) => {
          if (error) reject(error);
          else resolve("Notification marquée comme lue");
        });
      });
    },
  },
};

module.exports = resolvers;