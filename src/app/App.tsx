import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

import Routes from './Routes';
import Header from './Header';

Amplify.configure({
  ...awsconfig,
  Analytics: { 
      disabled: true
  }
});

const App: React.FC = () => {
  const [authState, setAuthState] = useState({ isLoggedIn: false });
  const handleUserSignIn = () => {
    setAuthState({ isLoggedIn: true });
  };
  const handleUserNotSignedIn = () => {
    setAuthState({ isLoggedIn: false });
  };
  const childProps = {
    isLoggedIn: authState.isLoggedIn,
    onUserSignIn: handleUserSignIn,
    onUserNotSignedIn: handleUserNotSignedIn,
  };

  return (
    <div className="App">
      <Header/>
      <Routes childProps={childProps}/>
    </div>
  );
}


const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
