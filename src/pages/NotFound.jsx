import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const NotFound = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                p: 4,
            }}
        >
            <BeachAccessIcon sx={{ fontSize: 100, mb: 2, }} />
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Comic Sans MS' }}>
                404
            </Typography>
            <Typography variant="h5" paragraph sx={{ mb: 3, fontFamily: 'Comic Sans MS' }}>
                Oops! The page you are looking for does not exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                    },
                    p: 1.5,
                    borderRadius: '8px',
                }}
            >
                Go to Home
            </Button>
        </Box>
    );
};

export default NotFound;
