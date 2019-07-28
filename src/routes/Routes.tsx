import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AuthComponent from '../app/AuthComponent';
import PageNotFound from '../PageNotFound/PageNotFound';
import { UserProfile } from '../UserProfile/UserProfile';
import ProppedRoute from './ProppedRoute';
import ProtectedRoute from './ProtectedRoute';

const Routes = ({ childProps }: any) => (
  <Switch>
    <Route exact path="/" render={() => <div>Home</div>} />
    <ProppedRoute
      exact
      path="/login"
      render={AuthComponent}
      props={childProps}
    />
    <ProtectedRoute
      exact
      path="/user-profile"
      props={childProps}
      render={UserProfile}
    />
    <Route exact path="/page-not-found" render={() => <PageNotFound />} />
    <Redirect to="page-not-found" />
  </Switch>
);

export default Routes;
