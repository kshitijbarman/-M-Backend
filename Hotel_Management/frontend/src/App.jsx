import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import SignUp from "./components/AuthComponents/SignUp";
import LogIn from "./components/AuthComponents/LogIn";
import Otp from "./components/AuthComponents/Otp";
import ForgetPassword from "./components/AuthComponents/ForgetPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import User from "./pages/users/user";

import Edit from "./components/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/verification",
    element: <Otp />,
  },
  {
    path: "/forget-pass",
    element: <ForgetPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Edit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <User />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
