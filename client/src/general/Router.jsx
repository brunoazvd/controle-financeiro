import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout.jsx";

import { RoutePaths } from "../static/RoutePaths.js";

import { Home } from "../pages/Home.jsx";
import { NotFound } from "../pages/NotFound.jsx";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";

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
      path={"/login"}
      element={
        <Layout>
          <Login />
        </Layout>
      }
    />
    <Route
      path={"/register"}
      element={
        <Layout>
          <Register />
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
