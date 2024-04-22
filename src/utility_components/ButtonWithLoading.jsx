import { Button, CircularProgress } from '@mui/material';
import React from 'react';

const ButtonWithLoading = ({ icon, loading, color = 'primary', sx, fullWidth, loadingText = '', variant = 'contained', size = 'large', disabled, children, type = 'button', onClick }) => {

    return (
        <Button
            onClick={onClick}
            type={type}
            fullWidth={fullWidth}
            variant={variant}
            sx={sx}
            size={size}
            color={color}
            disabled={disabled || loading}
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : icon ? icon : undefined}
        >
            {loading ? (loadingText || children) : children}
        </Button>
    );
};

export default ButtonWithLoading;
