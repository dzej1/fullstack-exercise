import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecentArticlesRoute } from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { Login } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <RecentArticlesRoute />,
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
