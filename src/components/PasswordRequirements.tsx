import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import PasswordRequirement from './PasswordRequirement';

const hasUppercase = (password: string): boolean => {
  return password.toLowerCase() !== password;
};
const hasLowercase = (password: string): boolean => {
  return password.toUpperCase() !== password;
};
const hasMinLength = (password: string): boolean => {
  return password.length >= 8;
};
const hasNumber = (password: string): boolean => {
  return /\d/.test(password);
};
const hasSpecialCharacter = (password: string): boolean => {
  return /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`-]/.test(password);
};
const hasInvalidCharacters = (password: string): boolean => {
  return /[^^$*.[\]{}()?"!@#%&/\\,><':;|_~`a-zA-Z0-9-]/.test(password);
};

export const validatePassword = (value: string) => {
  let error;
  if (!hasMinLength(value)) {
    error = "Must be at least 8 characters";
  } else if (!hasLowercase(value)) {
    error = "Must contain lowercase letter";
  } else if (!hasUppercase(value)) {
    error = "Must contain uppercase letter";
  } else if (!hasNumber(value)) {
    error = "Must contain a number";
  } else if (!hasSpecialCharacter(value)) {
    error =
      "Must contain a special character: ^$*.[]{}()?\"!@#%&/\\,><':;|_~`-";
  } else if (hasInvalidCharacters(value)) {
    error =
      "Can contain only letters, numbers, or these special characters: ^$*.[]{}()?\"!@#%&/\\,><':;|_~`-";
  }
  return error;
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(-4)
  }
}));

export interface PasswordRequirementsProps {
  password: string;
}

function PasswordRequirements({
  password,
  ...rest
}: PasswordRequirementsProps) {
  const classes: any = useStyles();

  return (
    <div className={classes.wrapper}>
      <PasswordRequirement
        description={"Is at least 8 characters long"}
        valid={hasMinLength(password)}
      />
      <PasswordRequirement
        description={"Contains uppercase character"}
        valid={hasUppercase(password)}
      />
      <PasswordRequirement
        description={"Contains lowercase character"}
        valid={hasLowercase(password)}
      />
      <PasswordRequirement
        description={"Contains number"}
        valid={hasNumber(password)}
      />
      <PasswordRequirement
        description={"Contains special character"}
        valid={hasSpecialCharacter(password)}
      />
    </div>
  );
}

export default PasswordRequirements;
