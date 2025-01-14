import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Component/Dashboard/DashboardLayout";
import Login from "./Component/Login";
// Assuming you have a HomePage component
import Home from "./Component/Pages/Home";

// A Private Route component to protect routes
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  // Retrieve authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      {/* Public Home Page */}
      <Route path="/" element={<Home />} />

      {/* Public Login Page */}
      <Route path="/login" element={<Login />} />

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
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard/home" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
