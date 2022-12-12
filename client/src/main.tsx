import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { RequireAuth } from "./components/ui";
import { loader as articleDetailLoader } from "./routes/ArticleDetailRoute";

import {
  ArticleDetailRoute,
  LoginRoute,
  NewArticleRoute,
  RecentArticlesRoute,
} from "./routes";

const queryClient = new QueryClient();

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
        element: <ArticleDetailRoute />,
        loader: articleDetailLoader(queryClient),
      },
      {
        path: "/new-article",
        element: (
          <RequireAuth>
            <NewArticleRoute />
          </RequireAuth>
        ),
      },
      {
        path: "about",
        element: null,
      },
      {
        path: "/login",
        element: <LoginRoute />,
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
