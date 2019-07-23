import React from 'react';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import { Container, makeStyles } from '@material-ui/core';

export const useProfileStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    backgroundColor: 'rgb(245, 245, 245)',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: 'white',
  },
  errorTextField: {
    backgroundColor: 'rgb(245, 245, 245)',
    margin: 0,
    fontWeight: 'bold',
    paddingLeft: '.75rem',
    paddingTop: '.25rem',
  },
}));

export const UserProfile = () => {
  return (
    <Container maxWidth="sm">
      <UpdateEmail />
      <UpdatePassword />
    </Container>
  );
};
