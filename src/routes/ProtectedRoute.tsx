import React from 'react';
import { Route, Redirect  } from 'react-router-dom';
const ProtectedRoute = ({ render: C, props: childProps, ...rest }: any) => (
  <Route
    {...rest}
    render={rProps =>
      childProps.isLoggedIn ? (
        <C {...rProps} {...childProps} />
      ) : (
        <Redirect
          to={`/login?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);

export default ProtectedRoute;
