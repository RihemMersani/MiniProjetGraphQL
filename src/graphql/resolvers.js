const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    hello: () => "Serveur GraphQL fonctionne correctement",

    users: async () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
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

        db.query(
          sql,
          [name, email, hashedPassword, role || "OPERATOR"],
          (error) => {
            if (error) {
              reject(error);
            } else {
              resolve("Utilisateur ajouté avec succès");
            }
          }
        );
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
            {
              expiresIn: "1h",
            }
          );

          resolve({
            token,
            user,
          });
        });
      });
    },
  },
};

module.exports = resolvers;