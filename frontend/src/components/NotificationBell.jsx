import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { io } from "socket.io-client";

const GET_NOTIFICATIONS = gql`
  query {
    notifications {
      id
      message
      is_read
      created_at
    }
  }
`;

function NotificationBell() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const { data, refetch } = useQuery(GET_NOTIFICATIONS);

  const [open, setOpen] = useState(false);
  const [liveNotifications, setLiveNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const socket = io("http://localhost:4000", {
      auth: { token },
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

    return () => socket.disconnect();
  }, [refetch]);

  const dbNotifications = data?.notifications || [];
  const notifications = [...liveNotifications, ...dbNotifications];

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const goToNotifications = () => {
    setOpen(false);

    if (user.role === "ADMIN") {
      navigate("/notifications");
    } else {
      navigate("/operator/notifications");
    }
  };

  return (
    <div className="notif-wrapper">
      <button className="notif-btn" onClick={() => setOpen(!open)}>
        <span className="bell-icon">🔔</span>

        {unreadCount > 0 && (
          <span className="notif-count">{unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-dropdown-header">
            <h4>Notifications</h4>
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          {notifications.length === 0 && (
            <p className="notif-empty">Aucune notification</p>
          )}

          {notifications.slice(0, 4).map((notif) => (
            <div
              key={notif.id}
              className={
                notif.is_read ? "notif-item" : "notif-item unread-item"
              }
            >
              <span className="notif-dot"></span>
              <p>{notif.message}</p>
            </div>
          ))}

          <button className="see-more-btn" onClick={goToNotifications}>
            Voir plus
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;