import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import ForgetPassword from "./components/authentication/ForgetPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import User from "./components/ui/User";
import AddTask from "./components/ui/AddTask";
import Dashboard from "./components/admin/Dashboard";
import AllTask from "./components/ui/AllTask";
import UserPage from "./components/admin/UserPage";
import AdminPage from "./components/admin/AdminPage";
import TaskPage from "./components/admin/TaskPage";
import Otp from "./components/authentication/Otp";
import AdminDashboard from "./components/dashboard/AdminDashboard";

const isLogin = localStorage.getItem("isLogin") === "true";

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
  {
    path: "/forget-pass",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-pass",
    element: <ResetPassword />,
  },
  {
    path: "/user",
    element: isLogin ? <User /> : <Login />,
  },
  {
    path: "/add-task",
    element: isLogin ? <AddTask /> : <Login />,
  },
  {
    path: "/dashboard",
    element: isLogin ? <Dashboard /> : <Login />,
    // element: isLogin ? <AdminDashboard /> : <Login />,
  },
  {
    path: "/all-task",
    element: isLogin ? <AllTask /> : <Login />,
  },
  {
    path: "/users",
    element: isLogin ? <UserPage /> : <Login />,
  },
  {
    path: "/admin",
    element: isLogin ? <AdminPage /> : <Login />,
  },
  {
    path: "/task",
    element: isLogin ? <TaskPage /> : <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
