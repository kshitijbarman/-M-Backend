import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLogin = localStorage.getItem("isLogin") === "true";
  const userRole = localStorage.getItem("role");

  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
