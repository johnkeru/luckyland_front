import React from 'react';
import { Typography, Button, Box, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router';
import Login from '../components/landing/login/Login';

const LandingPage = () => {
    const nav = useNavigate();

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Glass effect background
                    color: '#333', // Text color
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#333' }} flexGrow={1}>
                        <img
                            src="/logo/logo1.png"
                            alt="Resort Logo"
                            width='50px'
                            style={{ marginRight: '10px' }}
                        />
                        Paradise Resort
                    </Typography>
                    <Login button={
                        <Button variant='outlined'>Login</Button>
                    } />
                    <Button color="inherit" onClick={() => nav('/')}>Home</Button>
                    <Button color="inherit" onClick={() => nav('/about')}>About</Button>
                    <Button color="inherit" onClick={() => nav('/contact')}>Contact</Button>
                    <Button color="inherit" onClick={() => nav('/reservation')}>Reservation</Button>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    position: 'relative',
                    // Remove backgroundImage property or set it to none
                    // backgroundImage: 'url(https://res.cloudinary.com/kerutman/image/upload/v1712223139/1_aoj4i8.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // Apply colorful gradient background
                    background: 'linear-gradient(45deg, #FFC107, #FF5722, #E91E63)',
                }}
            >

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Glass effect background
                    }}
                />
                <Box sx={{ maxWidth: '100%', zIndex: 1, textAlign: 'center', color: 'white' }}>
                    <Typography variant="h2" sx={{ mb: 4 }}>
                        Welcome to Paradise Resort
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Experience luxury and relaxation at our stunning resort.
                        With breathtaking views and top-notch amenities, your perfect getaway awaits.
                    </Typography>
                    <Button variant='contained' size='large' onClick={() => nav('/reservation')}>Reservation</Button>
                </Box>
            </Box>
        </>
    );
};

export default LandingPage;
