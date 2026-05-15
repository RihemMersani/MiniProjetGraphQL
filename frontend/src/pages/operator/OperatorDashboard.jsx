import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import OperatorLayout from "../../layouts/OperatorLayout";

const GET_DATA = gql`
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

function OperatorDashboard() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error.message}</div>;

  return (
    <OperatorLayout
      title="Dashboard Opérateur"
      subtitle="Espace de supervision du trafic urbain"
    >
      <section className="cards">
        <div className="card">
          <span>Véhicules suivis</span>
          <h3>{data.vehicles.length}</h3>
          <p>Consultation seulement</p>
        </div>

        <div className="card">
          <span>Trafic</span>
          <h3>Normal</h3>
          <p>Densité faible</p>
        </div>

        <div className="card">
          <span>Incidents</span>
          <h3>2</h3>
          <p>À surveiller</p>
        </div>

        <div className="card">
          <span>Notifications</span>
          <h3>3</h3>
          <p>Alertes récentes</p>
        </div>
      </section>

      <div className="box">
        <h2>Mission de l’opérateur</h2>
        <p>
          L’opérateur peut consulter les véhicules, suivre l’état du trafic,
          consulter les incidents et recevoir les notifications.
        </p>
      </div>
    </OperatorLayout>
  );
}

export default OperatorDashboard;