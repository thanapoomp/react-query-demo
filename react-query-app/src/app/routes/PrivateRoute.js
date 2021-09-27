import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as CONST from "../../Constant";

function PrivateRoute({ component: Component, roles,title, ...rest }) {
  const authReducer = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        roles = roles === undefined ? [] : roles;

        if (roles.length > 0) {
          // check if route is restricted by role
          let intersection = roles.filter((x) => authReducer.roles.includes(x));
          if (intersection.length === 0) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: "/errorUnAuthorized" }} />;
          }
        }

        // authorised so return component
        return (
          <React.Fragment>
            <Helmet>
              <title>
                {title} - {CONST.APP_INFO.name}
              </title>
            </Helmet>
            <Component {...props} />
          </React.Fragment>
        );
      }}
    />
  );
}

export default PrivateRoute;
