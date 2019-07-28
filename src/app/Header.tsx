import {
  AppBar,
  Link,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Auth } from 'aws-amplify';
import React from 'react';
import { NavLink } from 'react-router-dom';

import useUser from '../hooks/useUser';
import NavMenu from './NavMenu';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  activeLink: {
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    padding: '5px 10px 5px 10px'
  },
  headerLink: {
    padding: '5px 10px 7px 10px'
  }
}));

const Header = ({ render: C, props: childProps, ...rest }: any) => {
  const classes = useStyles();

  const [user] = useUser();

  const logout = () => {
    Auth.signOut();
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Logo
        </Typography>

        <Link
          className={classes.headerLink}
          color='inherit'
          component={NavLink}
          activeClassName={classes.activeLink}
          exact={true}
          to={'/'}
        >
          Home
        </Link>
        {user ? (
          <NavMenu menuLabel={user.username}>
            <Link
              className={classes.headerLink}
              color='inherit'
              component={NavLink}
              exact={true}
              to='/user-profile'
            >
              Profile
            </Link>
            <Link
              className={classes.headerLink}
              color='inherit'
              component={NavLink}
              exact={true}
              onClick={logout}
              to='/'
            >
              Log Out
            </Link>
          </NavMenu>
        ) : (
          <Link
            className={classes.headerLink}
            color='inherit'
            component={NavLink}
            activeClassName={classes.activeLink}
            exact={true}
            to='/login'
          >
            Log In
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
