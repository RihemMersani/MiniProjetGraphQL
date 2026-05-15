import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const REGISTER = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $role: String
  ) {
    register(
      name: $name
      email: $email
      password: $password
      role: $role
    )
  }
`;

function Register() {
  const navigate = useNavigate();

  const [register, { loading }] = useMutation(REGISTER);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "OPERATOR",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await register({
        variables: {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        },
      });

      setMessage("Compte créé avec succès. Redirection vers login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError("Erreur : email déjà utilisé ou données incorrectes.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>TrafficPro</h1>
        <p>Créer un nouveau compte</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="register-select"
          >
            <option value="OPERATOR">OPERATOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          {error && <span className="login-error">{error}</span>}
          {message && <span className="success-message">{message}</span>}

          <button type="submit" disabled={loading}>
            {loading ? "Création..." : "S'inscrire"}
          </button>
        </form>

        <div className="auth-switch">
          <span>Vous avez déjà un compte ?</span>
          <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;