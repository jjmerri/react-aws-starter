import React, { useEffect, useState } from 'react';

import useUser from '../hooks/useUser';
import { Paper, Typography, Button, Grid, Snackbar } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { Auth } from 'aws-amplify';
import SnackbarContentWrapper, { SnackbarVariant } from '../components/SnackbarContentWrapper';
import { globalStyles } from '../app/App';

interface ChangeEmailFormValues {
  email: string;
}

const UpdateEmail = () => {
  const classes = globalStyles();
  const [user] = useUser();
  const [initialValues, setInitialValues] = useState({ email: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState(SnackbarVariant.SUCCESS);
  const [snackbarMessage, setSnackbarMessage] = useState();

  useEffect(() => {
    if (user) {
      setInitialValues({ email: user.attributes.email });
    }
  }, [user]);

  const showSnackbar = (variant: SnackbarVariant, message: string) => {
    setSnackbarOpen(true);
    setSnackbarVariant(variant);
    setSnackbarMessage(message);
  }

  const onSubmit = async (values: ChangeEmailFormValues, actions: FormikActions<ChangeEmailFormValues>) => {
    Auth.updateUserAttributes(user, {
      'email': values.email
    })
      .then(() => {
        showSnackbar(SnackbarVariant.SUCCESS, 'Email updated!');
      })
      .catch((error: any) => {
        showSnackbar(SnackbarVariant.ERROR, 'Unknown error updating email. Try again later.');
      })
      .finally(() => {
        actions.setSubmitting(false)
      });
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={(formikBag: FormikProps<ChangeEmailFormValues>) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5" gutterBottom> Update Email: </Typography>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <Field
                  required
                  name="email"
                  label="Email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  component={TextField}
                  className={classes.textField}
                  FormHelperTextProps={{ className: classes.errorTextField }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={6} >
                <Button type='submit' variant="contained" color="secondary" className={classes.button}>
                  Update Email
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <SnackbarContentWrapper
              onClose={handleCloseSnackbar}
              variant={snackbarVariant}
              message={snackbarMessage}
            />
          </Snackbar>
        </Form>
      )}
    />
  )
};

export default UpdateEmail;
