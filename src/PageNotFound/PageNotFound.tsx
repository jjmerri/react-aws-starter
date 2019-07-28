import { CardMedia, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

import missingImage from '../assets/404.png';

const useStyles = makeStyles(theme => ({
  media: { height: '178px', width: '375px', marginTop: theme.spacing(3) },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3)
  }
}));

const PageNotFound: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='sm'>
      <div className={classes.wrapper}>
        <CardMedia className={classes.media} image={missingImage} title='404' />
      </div>
      <div className={classes.wrapper}>
        <Typography align='center' variant='h4'>
          Page Not Found!
        </Typography>
      </div>
      <div className={classes.wrapper}>
        <NavLink to='/'>Back To Home</NavLink>
      </div>
    </Container>
  );
};

export default PageNotFound;
