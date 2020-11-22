import React from "react";
import Loading from './loading';
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);

export default PrivateRoute;
