import Layout from "../../layouts/Layout";

function Incidents() {
  return (
    <Layout title="Incidents" subtitle="Suivi des accidents, travaux et embouteillages">
      <div className="box">
        <h2>Liste des incidents</h2>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Localisation</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Accident</td>
              <td>Collision entre deux véhicules</td>
              <td>Centre-ville</td>
              <td><span className="badge red">SIGNALÉ</span></td>
            </tr>

            <tr>
              <td>Travaux</td>
              <td>Maintenance de la route</td>
              <td>Route principale</td>
              <td><span className="badge">EN COURS</span></td>
            </tr>

            <tr>
              <td>Embouteillage</td>
              <td>Trafic très dense</td>
              <td>Entrée Nord</td>
              <td><span className="badge green">RÉSOLU</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Incidents;