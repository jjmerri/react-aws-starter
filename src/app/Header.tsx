import React from 'react';

import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import './Header.css';
import useUser from '../hooks/useUser';
import { Toolbar, AppBar, Typography, Link, makeStyles } from '@material-ui/core';
import NavMenu from './NavMenu';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ render: C, props: childProps, ...rest }: any) => {
  const classes = useStyles();

  const [user] = useUser();

  const logout = ()=>{
    Auth.signOut();
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Logo
        </Typography>

        <Link className='header-link' color="inherit" component={NavLink} activeClassName={'active-link'} exact={true} to={'/'}>Home</Link>
        { user ?
              <NavMenu menuLabel={user.username}>
                <Link className='header-link' color="inherit" component={NavLink} exact={true} to='/user-profile'>Profile</Link>
                <Link className='header-link' color="inherit" component={NavLink} exact={true} onClick={logout} to='/'>Log Out</Link>
              </NavMenu>
          : <Link className='header-link' color="inherit" component={NavLink} activeClassName={'active-link'} exact={true} to='/login'>Log In</Link>
        }
       </Toolbar>
    </AppBar>
  );
};

export default Header;
