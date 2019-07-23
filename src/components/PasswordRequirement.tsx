import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOffRounded';
import { green } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    success: {
        color: green[600],
    },
    error: {
        color: theme.palette.error.dark,
    },
    icon: {
        fontSize: '14px',
        marginRight: theme.spacing(.5),
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    requirement: {
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(-2),
    },
}));

export interface PasswordRequirementProps {
    description: string;
    valid: boolean;
}

function PasswordRequirement({ description, valid, ...rest }: PasswordRequirementProps) {
    const classes: any = useStyles();
    const [Icon, setIcon] = useState<any>(CheckCircleIcon);

    useEffect(() => {
        setIcon(valid ? CheckCircleIcon : HighlightOffIcon);
    }, [valid]);

    return (
        <p className={clsx(classes.requirement, valid && classes.success, !valid && classes.error)}>
            <Icon className={clsx(classes.icon)} />
            {description}
        </p>
    );
}

export default PasswordRequirement;
