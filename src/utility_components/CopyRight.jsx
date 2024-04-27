import React from 'react';
import { Typography, Link } from '@mui/material';

const CopyRight = (props) => {
    const currentUrl = window.location.href;

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href={currentUrl}>
                LuckyLand Resort
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default CopyRight;
