import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLogin = localStorage.getItem("isLogin") === "true";
  const userRole = localStorage.getItem("role"); // Assuming role is stored as "admin" or "user"

  if (!isLogin) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  // Check if user has access to this route based on their role
  if (!allowedRoles.includes(userRole)) {
    // If user is logged in but doesn't have the correct role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
