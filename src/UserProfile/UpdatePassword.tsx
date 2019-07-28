import { Button, Grid, Paper, Snackbar, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';

import { globalStyles } from '../app/App';
import PasswordRequirements, { validatePassword } from '../components/PasswordRequirements';
import SnackbarContentWrapper, { SnackbarVariant } from '../components/SnackbarContentWrapper';
import useUser from '../hooks/useUser';

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword = () => {
  const classes = globalStyles();
  const [user] = useUser();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState(
    SnackbarVariant.SUCCESS
  );
  const [snackbarMessage, setSnackbarMessage] = useState();

  const showSnackbar = (variant: SnackbarVariant, message: string) => {
    setSnackbarOpen(true);
    setSnackbarVariant(variant);
    setSnackbarMessage(message);
  };

  const onSubmit = async (
    values: ChangePasswordFormValues,
    actions: FormikActions<ChangePasswordFormValues>
  ) => {
    Auth.changePassword(user, values.currentPassword, values.newPassword)
      .then(() => {
        showSnackbar(SnackbarVariant.SUCCESS, "Password updated!");
      })
      .catch((err: any) => {
        console.log(err);
        let errorMessage = "An unknown error occured, please try again later.";
        if (err.code === "NotAuthorizedException") {
          actions.setErrors({
            currentPassword: "Wrong Password"
          });
        } else {
          showSnackbar(SnackbarVariant.ERROR, errorMessage);
        }
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validateConfirmPassword = (
    value: string,
    formikBag: FormikProps<ChangePasswordFormValues>
  ) => {
    console.log(formikBag);
    let error;
    if (formikBag.values.newPassword !== value) {
      error = "Does not match new password";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }}
      onSubmit={onSubmit}
      render={(formikBag: FormikProps<ChangePasswordFormValues>) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              {" "}
              Change Password:{" "}
            </Typography>
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
                  validate={(value: string) =>
                    validateConfirmPassword(value, formikBag)
                  }
                  component={TextField}
                  className={classes.textField}
                  FormHelperTextProps={{ className: classes.errorTextField }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <PasswordRequirements password={formikBag.values.newPassword} />
              </Grid>
              <Grid item xs={6}>
                <Button
                  style={{ marginTop: "-1rem" }}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  disabled={formikBag.isSubmitting}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
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
