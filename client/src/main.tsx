import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { Login } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: null,
      },
      {
        path: "/article/:id",
        element: null,
      },
      {
        path: "about",
        element: null,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: null,
      },
      {
        path: "/profile",
        element: null,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
