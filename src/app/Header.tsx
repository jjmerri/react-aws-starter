import React from 'react';
import {Navbar, Dropdown} from 'react-materialize';
import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import './Header.css';
import useUser from '../hooks/useUser';

const Header = ({ render: C, props: childProps, ...rest }: any) => {
  const [user] = useUser();

  const logout = ()=>{
    Auth.signOut();
  };

  return (
    <Navbar fixed className={'nav'} brand={<NavLink to='/' style={{paddingLeft: '10px'}}>Logo</NavLink>} alignLinks='right'>
      <NavLink activeClassName={'active-link'} exact={true} to='/'>Home</NavLink>
      <NavLink activeClassName={'active-link'} exact={true} to='/secret'>Auth Protected Route</NavLink>
      {user ?
      <Dropdown trigger={<a>{user ? user!.username : 'Login'}</a>} options={{coverTrigger: false}}>
        <NavLink activeClassName={'active-link'} to={'/user-profile'}>{'Profile'}</NavLink>
        <NavLink to={'/'} onClick={logout}>Log Out</NavLink>
      </Dropdown>
      : <NavLink activeClassName={'active-link'} to='/auth'>{'Login'}</NavLink>
      }
    </Navbar>
  );
};

export default Header;
