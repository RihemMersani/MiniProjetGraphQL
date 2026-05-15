import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { io } from "socket.io-client";
import OperatorLayout from "../../layouts/OperatorLayout";

const GET_NOTIFICATIONS = gql`
  query {
    notifications {
      id
      user_id
      message
      is_read
      created_at
    }
  }
`;

const MARK_AS_READ = gql`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id)
  }
`;

function OperatorNotifications() {
  const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS);
  const [markNotificationAsRead] = useMutation(MARK_AS_READ);
  const [liveNotifications, setLiveNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const socket = io("http://localhost:4000", {
      auth: {
        token,
      },
      transports: ["websocket"],
    });

    socket.on("notification", (payload) => {
      const notif = payload.notification || {
        id: Date.now(),
        message: payload.message,
        is_read: false,
      };

      setLiveNotifications((old) => [notif, ...old]);
      refetch();
    });

    return () => {
      socket.disconnect();
    };
  }, [refetch]);

  const handleRead = async (id) => {
    await markNotificationAsRead({
      variables: { id },
    });

    refetch();
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error.message}</div>;

  const notifications = data?.notifications || [];

  return (
    <OperatorLayout
      title="Notifications"
      subtitle="Alertes reçues par l’opérateur"
    >
      <div className="box">
        <h2>Notifications temps réel</h2>

        {liveNotifications.length === 0 && (
          <p className="empty-message">
            Aucune nouvelle notification en temps réel.
          </p>
        )}

        {liveNotifications.map((notif) => (
          <div className="notification unread" key={notif.id}>
            <h3>Nouvelle notification</h3>
            <p>{notif.message}</p>
          </div>
        ))}
      </div>

      <div className="box">
        <h2>Mes notifications</h2>

        {notifications.length === 0 && (
          <p className="empty-message">Aucune notification trouvée.</p>
        )}

        {notifications.map((notif) => (
          <div
            className={notif.is_read ? "notification" : "notification unread"}
            key={notif.id}
          >
            <h3>{notif.is_read ? "Notification lue" : "Nouvelle notification"}</h3>
            <p>{notif.message}</p>

            {!notif.is_read && (
              <button className="small-btn" onClick={() => handleRead(notif.id)}>
                Marquer comme lue
              </button>
            )}
          </div>
        ))}
      </div>
    </OperatorLayout>
  );
}

export default OperatorNotifications;