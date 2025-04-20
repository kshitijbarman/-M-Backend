import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Error from "./components/Error";
import Home from "./components/Home";
import ForgetPass from "./components/ForgetPass";
import ResetPass from "./components/ResetPass";
import Update from "./components/Update";
import AddTask from './components/AddTask';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forget-pass",
    element: <ForgetPass />,
  },
  {
    path: "/rest-pass",
    element: <ResetPass />,
  },
  {
    path: "/add-task",
    element: <AddTask />,
  },
  {
    path: "/update",
    element: <Update />,
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
