import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProppedRoute from './ProppedRoute';
import AuthComponent from './AuthComponent';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';

const Routes = ({ childProps }: any) => (
  <Switch>
    <Route exact path='/' render={() => <div>Home</div>} />
    <ProppedRoute
      exact
      path='/auth'
      render={AuthComponent}
      props={childProps}
    />
    <ProtectedRoute
      exact
      path='/secret'
      props={childProps}
      render={() => <div>Keep it secret! Keep it safe!</div>}
    />
    <Route exact path='/page-not-found' render={PageNotFound} />
    <Route exact path='/about' render={() => <div>About Content</div>} />
    <Redirect to='page-not-found'/>
  </Switch>
);

export default Routes;
