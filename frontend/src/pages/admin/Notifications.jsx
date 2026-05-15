import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { io } from "socket.io-client";
import Layout from "../../layouts/Layout";

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

const ADD_NOTIFICATION = gql`
  mutation AddNotification($user_id: ID!, $message: String!) {
    addNotification(user_id: $user_id, message: $message)
  }
`;

const MARK_AS_READ = gql`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id)
  }
`;

function Notifications() {
  const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS);

  const [addNotification] = useMutation(ADD_NOTIFICATION);
  const [markNotificationAsRead] = useMutation(MARK_AS_READ);

  const [liveNotifications, setLiveNotifications] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    message: "",
  });

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    socket.on("notification", (payload) => {
      console.log("Notification reçue :", payload);

      const newNotification = payload.notification || {
        id: Date.now(),
        message: payload.message,
        is_read: false,
      };

      setLiveNotifications((old) => [newNotification, ...old]);

      refetch();
    });

    return () => {
      socket.disconnect();
    };
  }, [refetch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_id || !form.message) {
      return;
    }

    await addNotification({
      variables: {
        user_id: parseInt(form.user_id),
        message: form.message,
      },
    });

    setForm({
      user_id: "",
      message: "",
    });

    refetch();
  };

  const handleRead = async (id) => {
    await markNotificationAsRead({
      variables: { id },
    });

    refetch();
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">Erreur : {error.message}</div>;
  }

  const notifications = data?.notifications || [];

  return (
    <Layout
      title="Notifications"
      subtitle="Alertes envoyées aux utilisateurs"
    >
      <div className="box">
        <h2>Envoyer une notification</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="number"
            name="user_id"
            placeholder="ID utilisateur"
            value={form.user_id}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Envoyer</button>
        </form>
      </div>

      <div className="box">
        <h2>Notifications temps réel</h2>

        {liveNotifications.length === 0 && (
          <p className="empty-message">
            Aucune notification reçue en temps réel.
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
        <h2>Toutes les notifications</h2>

        {notifications.length === 0 && (
          <p className="empty-message">Aucune notification trouvée.</p>
        )}

        {notifications.map((notif) => (
          <div
            className={notif.is_read ? "notification" : "notification unread"}
            key={notif.id}
          >
            <h3>
              {notif.is_read ? "Notification lue" : "Nouvelle notification"}
            </h3>

            <p>{notif.message}</p>

            {!notif.is_read && (
              <button
                className="small-btn"
                onClick={() => handleRead(notif.id)}
              >
                Marquer comme lue
              </button>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Notifications;