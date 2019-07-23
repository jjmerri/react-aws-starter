import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import PasswordRequirement from './PasswordRequirement';

export const passwordHasUppercase = (password: string): boolean => {
    return password.toLowerCase() !== password;
}
export const passwordHasLowercase = (password: string): boolean => {
    return password.toUpperCase() !== password;
}
export const passwordHasMinLength = (password: string): boolean => {
    return password.length >= 8;
}
export const passwordHasNumber = (password: string): boolean => {
    return /\d/.test(password);
}
export const passwordHasSpecialCharacter = (password: string): boolean => {
    return /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`-]/.test(password);
}
export const passwordHasInvalidCharacters = (password: string): boolean => {
    return /[^^$*.[\]{}()?"!@#%&/\\,><':;|_~`a-zA-Z0-9-]/.test(password)
}

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(-4),
    },
}));

export interface PasswordRequirementsProps {
    password: string;
}

function PasswordRequirements({ password, ...rest }: PasswordRequirementsProps) {
    const classes: any = useStyles();
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasLowerCase, setHasLowerCase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
    const [hasMinLength, setHasMinLength] = useState(false);

    useEffect(() => {
        setHasMinLength(passwordHasMinLength(password));
        setHasLowerCase(passwordHasLowercase(password));
        setHasUpperCase(passwordHasUppercase(password));
        setHasNumber(passwordHasNumber(password));
        setHasSpecialCharacter(passwordHasSpecialCharacter(password));
    }, [password]);

    return (
        <div className={classes.wrapper}>
            <PasswordRequirement description={'Is at least 8 characters long'} valid={hasMinLength} />
            <PasswordRequirement description={'Contains uppercase character'} valid={hasUpperCase} />
            <PasswordRequirement description={'Contains lowercase character'} valid={hasLowerCase} />
            <PasswordRequirement description={'Contains number'} valid={hasNumber} />
            <PasswordRequirement description={'Contains special character'} valid={hasSpecialCharacter} />
        </div>
    );
}

export default PasswordRequirements;
