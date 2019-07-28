import { Container } from '@material-ui/core';
import React from 'react';

import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';

export const UserProfile = () => {
  return (
    <Container maxWidth="sm">
      <UpdateEmail />
      <UpdatePassword />
    </Container>
  );
};
