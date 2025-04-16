import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

import { RoutePaths } from "../static/RoutePaths.js";

import { Home } from "../pages/Home.jsx";
import { NotFound } from "../pages/NotFound.jsx";
import { Welcome } from "../pages/Welcome.jsx";



export const Router = () => (
  <Routes>
    <Route
      path={RoutePaths.HOME}
      element={
        <ProtectedRoute>
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path={RoutePaths.WELCOME}
      element={
        <Layout>
          <Welcome />
        </Layout>
      }
    />
    <Route
      path="*"
      element={
        <ProtectedRoute>
          <Layout>
            <NotFound />
          </Layout>
        </ProtectedRoute>
      }
    />
  </Routes>
);
