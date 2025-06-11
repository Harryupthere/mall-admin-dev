import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../pages";
import RouteArr from "../configuration/getRoutes";
import Main from "../pages/main";

const baseUrl=process.env.REACT_APP_BASE_URL || '/admin/' // why I am getting undified here ?
const router = createBrowserRouter([
  {
    name: "Login",
    path: `${baseUrl}login`,
    key: "login",
    route: `${baseUrl}login`,
    element: <Login />,
  },


  {
    path: `${baseUrl}`,
    element: <Main />,
    children: RouteArr,
  },
]);
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
