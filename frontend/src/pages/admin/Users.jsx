import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Layout from "../../layouts/Layout";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      role
      created_at
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error.message}</div>;

  return (
    <Layout title="Utilisateurs" subtitle="Gestion des administrateurs et opérateurs">
      <div className="box">
        <h2>Liste des utilisateurs</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
            </tr>
          </thead>

          <tbody>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className="badge">{user.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Users;