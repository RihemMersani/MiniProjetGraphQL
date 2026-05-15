import { Link, useLocation, useNavigate } from "react-router-dom";

function OperatorLayout({ title, subtitle, children }) {
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
      <aside className="sidebar operator-sidebar">
        <h2>TrafficPro</h2>

        <nav>
          <Link className={isActive("/operator")} to="/operator">Dashboard</Link>
          <Link className={isActive("/operator/vehicles")} to="/operator/vehicles">Véhicules</Link>
          <Link className={isActive("/operator/traffic")} to="/operator/traffic">Trafic</Link>
          <Link className={isActive("/operator/incidents")} to="/operator/incidents">Incidents</Link>
          <Link className={isActive("/operator/notifications")} to="/operator/notifications">Notifications</Link>
          <Link className={isActive("/operator/map")} to="/operator/map">Carte</Link>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="user-area">
            <span>{user.name || "Operator"}</span>
            <button onClick={logout}>Déconnexion</button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

export default OperatorLayout;