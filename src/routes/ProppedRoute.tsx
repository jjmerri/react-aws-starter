import React from 'react';
import { Route } from 'react-router-dom';

const ProppedRoute = ({ render: C, props: childProps, ...rest }: any) => (
  <Route {...rest} render={rProps => <C {...rProps} {...childProps} />} />
);

export default ProppedRoute;
