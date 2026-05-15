import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";

function Layout({ title, subtitle, children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <Link to="/"><h2>TrafficPro</h2></Link>

        <nav>
          <Link className={isActive("/dashboard")} to="/dashboard">Dashboard</Link>
          <Link className={isActive("/vehicles")} to="/vehicles">Véhicules</Link>
          <Link className={isActive("/traffic")} to="/traffic">Trafic</Link>
          <Link className={isActive("/incidents")} to="/incidents">Incidents</Link>
          <Link className={isActive("/notifications")} to="/notifications">Notifications</Link>
          <Link className={isActive("/map")} to="/map">Carte</Link>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="user-area">
            <NotificationBell />
            <span>{user.name || "Admin"}</span>
            <button onClick={logout}>Déconnexion</button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

export default Layout;