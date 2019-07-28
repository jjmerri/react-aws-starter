import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Amplify from 'aws-amplify';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import awsconfig from '../aws-exports';
import Routes from '../routes/Routes';
import Header from './Header';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true
  }
});

export const globalStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  paper: {
    backgroundColor: "rgb(245, 245, 245)",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "white"
  },
  errorTextField: {
    backgroundColor: "rgb(245, 245, 245)",
    margin: 0,
    fontWeight: "bold",
    paddingLeft: ".75rem",
    paddingTop: ".25rem"
  }
}));

const palette = {
  primary: { main: "#228b22" },
  secondary: { main: "#FFA000" }
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
    onUserNotSignedIn: handleUserNotSignedIn
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes childProps={childProps} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
