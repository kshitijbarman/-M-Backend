import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import UserDashboard from "./pages/users/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Otp from "./pages/auth/Otp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllUser from "./pages/admin/AllUser";
import AssignTask from "./pages/admin/AssignTask";
import AllAdmin from "./pages/admin/AllAdmin";
import AllTask from "./pages/admin/AllTask";
import UpdateTask from "./pages/users/UpdateTask";
import ShowTask from "./pages/users/ShowTask";
import AddTask from "./pages/users/AddTask";
import TaskPage from './pages/admin/taskPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/verification",
    element: <Otp />,
  },
  // user route
  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-task",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <AddTask />
      </ProtectedRoute>
    ),
  },
  // admin route
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/all-user",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AllUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/assign-task",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AssignTask />
      </ProtectedRoute>
    ),
  },
  {
    path: "/show-task",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <ShowTask />
      </ProtectedRoute>
    ),
  },
  {
    path: "/all-admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AllAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/all-task",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AllTask />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <UpdateTask />
      </ProtectedRoute>
    ),
  },
  {
    path: "/task",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <TaskPage />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
