import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import Layout from "../../layouts/Layout";
import RealtimeNotifications from "../../components/RealtimeNotifications";

const GET_DATA = gql`
  query {
    users {
      id
      name
      email
      role
    }

    vehicles {
      id
      matricule
      type
      marque
      etat
    }
  }
`;

function Dashboard() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">Erreur : {error.message}</div>;
  }

  const usersCount = data?.users?.length || 0;
  const vehiclesCount = data?.vehicles?.length || 0;

  return (
    <Layout
      title="Dashboard"
      subtitle="Plateforme intelligente de gestion du trafic urbain"
    >
      <section className="cards">
        <div className="card">
          <span>Utilisateurs</span>
          <h3>{usersCount}</h3>
          <p>ADMIN / OPERATOR</p>
        </div>

        <div className="card">
          <span>Véhicules</span>
          <h3>{vehiclesCount}</h3>
          <p>Véhicules enregistrés</p>
        </div>

        <div className="card">
          <span>Incidents</span>
          <h3>0</h3>
          <p>Aucun incident actif</p>
        </div>

        <div className="card">
          <span>Trafic</span>
          <h3>Normal</h3>
          <p>Densité faible</p>
        </div>
      </section>

      <section className="content">
        <div className="box">
          <h2>Liste des utilisateurs</h2>

          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
              </tr>
            </thead>

            <tbody>
              {data.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge">{user.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="box">
          <h2>Liste des véhicules</h2>

          <table>
            <thead>
              <tr>
                <th>Matricule</th>
                <th>Type</th>
                <th>Marque</th>
                <th>État</th>
              </tr>
            </thead>

            <tbody>
              {data.vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.matricule}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.marque}</td>
                  <td>
                    <span className="badge green">
                      {vehicle.etat}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <RealtimeNotifications />
    </Layout>
  );
}

export default Dashboard;