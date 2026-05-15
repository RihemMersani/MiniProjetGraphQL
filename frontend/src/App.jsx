import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function SimplePage({ title }) {
  return (
    <div className="page-placeholder">
      <h1>{title}</h1>
      <p>Page {title} en cours de développement.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<SimplePage title="Utilisateurs" />} />
        <Route path="/vehicles" element={<SimplePage title="Véhicules" />} />
        <Route path="/traffic" element={<SimplePage title="Trafic" />} />
        <Route path="/incidents" element={<SimplePage title="Incidents" />} />
        <Route path="/notifications" element={<SimplePage title="Notifications" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;