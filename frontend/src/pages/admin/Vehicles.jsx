import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Layout from "../../layouts/Layout";

const GET_VEHICLES = gql`
  query {
    vehicles {
      id
      matricule
      type
      marque
      etat
    }
  }
`;

function Vehicles() {
  const { loading, error, data } = useQuery(GET_VEHICLES);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error.message}</div>;

  return (
    <Layout title="Véhicules" subtitle="Suivi des véhicules enregistrés">
      <div className="box">
        <h2>Liste des véhicules</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Matricule</th>
              <th>Type</th>
              <th>Marque</th>
              <th>État</th>
            </tr>
          </thead>

          <tbody>
            {data.vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.matricule}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.marque}</td>
                <td><span className="badge green">{vehicle.etat}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Vehicles;