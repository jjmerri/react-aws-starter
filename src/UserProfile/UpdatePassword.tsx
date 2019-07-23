import React, { useState } from 'react';

import { Formik, FormikActions, FormikProps, Form, Field } from 'formik';

import useUser from '../hooks/useUser';
import { Paper, Button, Grid, Typography, Snackbar } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useProfileStyles } from './UserProfile';
import { Auth } from 'aws-amplify';
import SnackbarContentWrapper, { SnackbarVariant } from '../components/SnackbarContentWrapper';
import PasswordRequirements, { passwordHasUppercase, passwordHasLowercase, passwordHasMinLength, passwordHasSpecialCharacter, passwordHasNumber, passwordHasInvalidCharacters } from '../components/PasswordRequirements';

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword = () => {
  const classes = useProfileStyles();
  const [user] = useUser();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState(SnackbarVariant.SUCCESS);
  const [snackbarMessage, setSnackbarMessage] = useState();

  const showSnackbar = (variant: SnackbarVariant, message: string) => {
    setSnackbarOpen(true);
    setSnackbarVariant(variant);
    setSnackbarMessage(message);
  }

  const onSubmit = async (values: ChangePasswordFormValues, actions: FormikActions<ChangePasswordFormValues>) => {
    Auth.changePassword(user, values.currentPassword, values.newPassword)
      .then(() => {
        showSnackbar(SnackbarVariant.SUCCESS, 'Password updated!');
      })
      .catch((err: any) => {
        console.log(err);
        let errorMessage = 'An unknown error occured, please try again later.';
        if (err.code === 'NotAuthorizedException') {
          actions.setErrors({
            currentPassword: 'Wrong Password',
          });
        } else {
          showSnackbar(SnackbarVariant.ERROR, errorMessage);
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
      });
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  }

  const validatePassword = (value: string) => {
    let error;
    if (!passwordHasMinLength(value)) {
      error = 'Must be at least 8 characters';
    } else if (!passwordHasLowercase(value)) {
      error = 'Must contain lowercase letter';
    } else if (!passwordHasUppercase(value)) {
      error = 'Must contain uppercase letter';
    } else if (!passwordHasNumber(value)) {
      error = 'Must contain a number';
    } else if (!passwordHasSpecialCharacter(value)) {
      error = 'Must contain a special character: ^$*.[]{}()?"!@#%&/\\,><\':;|_~`-';
    } else if (passwordHasInvalidCharacters(value)) {
      error = 'Can contain only letters, numbers, or these special characters: ^$*.[]{}()?"!@#%&/\\,><\':;|_~`-';
    }
    return error;
  }

  const validateConfirmPassword = (value: string, formikBag: FormikProps<ChangePasswordFormValues>) => {
    console.log(formikBag);
    let error;
    if (formikBag.values.newPassword !== value) {
      error = 'Does not match new password';
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
      onSubmit={onSubmit}
      render={(formikBag: FormikProps<ChangePasswordFormValues>) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5" gutterBottom> Change Password: </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  component={TextField}
                  className={classes.textField}
                  FormHelperTextProps={{ className: classes.errorTextField }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={6}>
                <Field
                  required
                  name="newPassword"
                  label="New Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  validate={validatePassword}
                  component={TextField}
                  className={classes.textField}
                  FormHelperTextProps={{ className: classes.errorTextField }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  validate={(value: string) => validateConfirmPassword(value, formikBag)}
                  component={TextField}
                  className={classes.textField}
                  FormHelperTextProps={{ className: classes.errorTextField }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} >
                <PasswordRequirements password={formikBag.values.newPassword}/>
              </Grid>
              <Grid item xs={6} >
                <Button style={{marginTop: '-1rem'}} type='submit' variant="contained" color="secondary" className={classes.button} disabled={formikBag.isSubmitting}>
                  Change Password
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
  );
};

export default UpdatePassword;
