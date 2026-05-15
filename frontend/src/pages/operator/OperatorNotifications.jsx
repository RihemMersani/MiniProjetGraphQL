import OperatorLayout from "../../layouts/OperatorLayout";

function OperatorNotifications() {
  return (
    <OperatorLayout
      title="Notifications"
      subtitle="Alertes et messages importants"
    >
      <div className="box">
        <h2>Notifications opérateur</h2>

        <div className="notification unread">
          <h3>Nouvel incident signalé</h3>
          <p>Un accident a été déclaré au centre-ville.</p>
        </div>

        <div className="notification unread">
          <h3>Trafic élevé</h3>
          <p>La zone Entrée Nord est actuellement congestionnée.</p>
        </div>

        <div className="notification">
          <h3>Incident résolu</h3>
          <p>L’embouteillage sur la route principale est terminé.</p>
        </div>
      </div>
    </OperatorLayout>
  );
}

export default OperatorNotifications;