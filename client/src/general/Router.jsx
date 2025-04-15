import { Route, Routes } from "react-router-dom";

import { RoutePaths } from "../static/RoutePaths.js";
import { Home } from "../pages/Home.jsx";
import { NotFound } from "../pages/NotFound.jsx";
import { Layout } from "./Layout.jsx";

export const Router = () => (
  <Routes>
    <Route
      path={RoutePaths.HOME}
      element={
        <Layout>
          <Home />
        </Layout>
      }
    />
    <Route
      path="*"
      element={
        <Layout>
          <NotFound />
        </Layout>
      }
    />
  </Routes>
);
