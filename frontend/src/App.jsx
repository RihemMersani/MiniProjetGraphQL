import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Vehicles from "./pages/admin/Vehicles";
import Traffic from "./pages/admin/Traffic";
import Incidents from "./pages/admin/Incidents";
import Notifications from "./pages/admin/Notifications";
import MapPage from "./pages/admin/MapPage";

import OperatorDashboard from "./pages/operator/OperatorDashboard";
import OperatorVehicles from "./pages/operator/OperatorVehicles";
import OperatorTraffic from "./pages/operator/OperatorTraffic";
import OperatorIncidents from "./pages/operator/OperatorIncidents";
import OperatorNotifications from "./pages/operator/OperatorNotifications";
import OperatorMap from "./pages/operator/OperatorMap";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
        <Route path="/traffic" element={<ProtectedRoute><Traffic /></ProtectedRoute>} />
        <Route path="/incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />

        {/* OPERATOR */}
        <Route path="/operator" element={<ProtectedRoute><OperatorDashboard /></ProtectedRoute>} />
        <Route path="/operator/vehicles" element={<ProtectedRoute><OperatorVehicles /></ProtectedRoute>} />
        <Route path="/operator/traffic" element={<ProtectedRoute><OperatorTraffic /></ProtectedRoute>} />
        <Route path="/operator/incidents" element={<ProtectedRoute><OperatorIncidents /></ProtectedRoute>} />
        <Route path="/operator/notifications" element={<ProtectedRoute><OperatorNotifications /></ProtectedRoute>} />
        <Route path="/operator/map" element={<ProtectedRoute><OperatorMap /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;