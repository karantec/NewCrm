import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Component/Dashboard/DashboardLayout";
import Login from "./Component/Login";


// A Private Route component to protect routes
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  // Simulating authentication state (replace this with your actual auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Routes>
      {/* Public Login Page */}
      <Route path="/" element={<Login />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard/home" : "/login"} />}
      />
    </Routes>
  );
};

export default App;