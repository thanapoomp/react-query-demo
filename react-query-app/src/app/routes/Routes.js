/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */
import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ContentRoute } from "./ContentRoute";
import { shallowEqual, useSelector } from "react-redux";
import BasePage from "./BasePage";
import Error404 from "../pages/Error404";
import Layout from "../layout/Layout";
import Home from "../pages/Home";

export function Routes() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  return (
    <Layout>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <ContentRoute exact title="home" path="/home" component={Home} />
        <Route path="/error404" component={Error404} />
        {isAuthorized && <BasePage />}
        <Redirect to="/error404"></Redirect>
      </Switch>
    </Layout>
  );
}
