import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

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

function getCurrentUser() {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return null;
  }

  return JSON.parse(savedUser);
}

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = getCurrentUser();

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "ADMIN") {
      return <Navigate to="/" />;
    }

    return <Navigate to="/operator" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Vehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/traffic"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Traffic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/incidents"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Incidents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <MapPage />
            </ProtectedRoute>
          }
        />

        {/* OPERATOR */}
        <Route
          path="/operator"
          element={
            <ProtectedRoute allowedRoles={["OPERATOR"]}>
              <OperatorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operator/vehicles"
          element={
            <ProtectedRoute allowedRoles={["OPERATOR"]}>
              <OperatorVehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operator/traffic"
          element={
            <ProtectedRoute allowedRoles={["OPERATOR"]}>
              <OperatorTraffic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operator/incidents"
          element={
            <ProtectedRoute allowedRoles={["OPERATOR"]}>
              <OperatorIncidents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operator/notifications"
          element={
            <ProtectedRoute allowedRoles={["OPERATOR"]}>
              <OperatorNotifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operator/map"
          element={
            <ProtectedRoute allowedRoles={["OPERATOR"]}>
              <OperatorMap />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;