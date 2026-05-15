import OperatorLayout from "../../layouts/OperatorLayout";

function OperatorIncidents() {
  return (
    <OperatorLayout
      title="Incidents"
      subtitle="Consultation des incidents signalés"
    >
      <div className="box">
        <h2>Incidents récents</h2>

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

        <p className="info-text">
          L’opérateur peut consulter les incidents. La gestion complète reste
          réservée à l’administrateur.
        </p>
      </div>
    </OperatorLayout>
  );
}

export default OperatorIncidents;