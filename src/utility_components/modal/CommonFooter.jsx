import { DialogActions } from '@mui/material';
import React from 'react';

const CommonFooter = ({ children, sx }) => {
    return (
        <DialogActions sx={{ my: 0.5, ...(sx || {}) }}>{children}</DialogActions>
    );
};

export default CommonFooter;
