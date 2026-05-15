import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Layout from "../../layouts/Layout";

const GET_DATA = gql`
  query {
    vehicles {
      id
      etat
      type
    }

    incidents {
      id
      status
      type
    }

    trafficZones {
      id
      name
      density
      level
    }
  }
`;

function Dashboard() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error.message}</div>;

  const vehicles = data?.vehicles || [];
  const incidents = data?.incidents || [];
  const zones = data?.trafficZones || [];

  const activeVehicles = vehicles.filter((v) => v.etat === "ACTIF").length;
  const openIncidents = incidents.filter((i) => i.status !== "RESOLU").length;
  const highZones = zones.filter((z) => z.level === "ELEVE").length;

  return (
    <Layout
      title="Dashboard"
      subtitle="Vue globale intelligente du trafic urbain"
    >
      <section className="cards">
        <div className="card cute-card pink">
          <span>Véhicules</span>
          <h3>{vehicles.length}</h3>
          <p>{activeVehicles} actifs</p>
        </div>

        <div className="card cute-card purple">
          <span>Incidents ouverts</span>
          <h3>{openIncidents}</h3>
          <p>À surveiller</p>
        </div>

        <div className="card cute-card orange">
          <span>Zones trafic</span>
          <h3>{zones.length}</h3>
          <p>{highZones} congestionnées</p>
        </div>

        <div className="card cute-card green-card">
          <span>Système</span>
          <h3>Live</h3>
          <p>WebSocket activé</p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="box">
          <h2>Statut des incidents</h2>

          <div className="stat-row">
            <span>Signalé</span>
            <strong>
              {incidents.filter((i) => i.status === "SIGNALE").length}
            </strong>
          </div>

          <div className="stat-row">
            <span>En cours</span>
            <strong>
              {incidents.filter((i) => i.status === "EN_COURS").length}
            </strong>
          </div>

          <div className="stat-row">
            <span>Résolu</span>
            <strong>
              {incidents.filter((i) => i.status === "RESOLU").length}
            </strong>
          </div>
        </div>

        <div className="box">
          <h2>Densité du trafic</h2>

          {zones.length === 0 && (
            <p className="empty-message">Aucune zone de trafic disponible.</p>
          )}

          {zones.map((zone) => (
            <div className="traffic-progress" key={zone.id}>
              <div className="traffic-progress-header">
                <span>{zone.name}</span>
                <strong>{zone.density}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className={
                    zone.level === "ELEVE"
                      ? "progress-fill danger"
                      : zone.level === "MOYEN"
                      ? "progress-fill warning"
                      : "progress-fill success"
                  }
                  style={{ width: `${zone.density}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content">
        <div className="box">
          <h2>Derniers véhicules</h2>

          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>État</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.slice(0, 5).map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.type}</td>
                  <td>
                    <span className="badge green">{vehicle.etat}</span>
                  </td>
                </tr>
              ))}

              {vehicles.length === 0 && (
                <tr>
                  <td colSpan="2">Aucun véhicule trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="box">
          <h2>Derniers incidents</h2>

          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {incidents.slice(0, 5).map((incident) => (
                <tr key={incident.id}>
                  <td>{incident.type}</td>
                  <td>
                    <span
                      className={
                        incident.status === "RESOLU"
                          ? "badge green"
                          : incident.status === "SIGNALE"
                          ? "badge red"
                          : "badge"
                      }
                    >
                      {incident.status}
                    </span>
                  </td>
                </tr>
              ))}

              {incidents.length === 0 && (
                <tr>
                  <td colSpan="2">Aucun incident trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;