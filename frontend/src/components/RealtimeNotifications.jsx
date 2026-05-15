import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function RealtimeNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("notification", (data) => {
      setNotifications((old) => [data, ...old]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="realtime-box">
      <h3>Notifications temps réel</h3>

      {notifications.map((notif, index) => (
        <div className="realtime-notification" key={index}>
          <strong>{notif.title}</strong>
          <p>{notif.message}</p>
        </div>
      ))}
    </div>
  );
}

export default RealtimeNotifications;