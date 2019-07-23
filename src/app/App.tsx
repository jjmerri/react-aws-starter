import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

import Header from './Header';
import Routes from '../routes/Routes';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

Amplify.configure({
  ...awsconfig,
  Analytics: { 
      disabled: true
  }
});

const palette = {
  primary: { main: '#228b22' },
  secondary: { main: '#FFA000' }
};

const theme = createMuiTheme({ palette });

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
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header/>
        <Routes childProps={childProps}/>
      </div>
    </ThemeProvider>
  );
}


const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
