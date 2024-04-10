import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useUser from '../../../hooks/useUser';
import Login from '../login/Login';
import ContactTop from './ContactTop';

const SecondToolbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrolledBody, setIsScrolledBody] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 100);
            setIsScrolledBody(scrollPosition > 663);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const nav = useNavigate();
    const { user } = useUser();
    return (
        <Box
            sx={{
                // position: isScrolled ? 'fixed' : 'absolute',
                position: 'fixed',
                zIndex: 2,
                top: 0,
                left: 0,
                width: '100%',
            }}
        >
            <ContactTop />
            <Box
                sx={{
                    display: 'flex',
                    px: 20,
                    py: 1,
                    color: '#fff',
                    backdropFilter: isScrolled ? 'blur(7px)' : undefined,
                    backgroundColor: isScrolledBody ? 'rgba(0, 0, 0, .3)' : 'rgba(0, 0, 0, .2)',
                }}
                onClick={() => nav('/')}
            >
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} flexGrow={1}>
                    <img
                        src="/logo/logo1.png"
                        alt="Resort Logo"
                        width='45px'
                    />
                    LuckyLand Resort
                </Typography>
                {!user && <Login button={
                    <Button color='inherit' variant='outlined'>Login</Button>
                } />}
                <Button color="inherit" onClick={() => nav('/')}>Home</Button>
                <Button color="inherit" onClick={() => nav('/about')}>About</Button>
                <Button color="inherit" onClick={() => nav('/contact')}>Contact</Button>
                {
                    user ? <Button color="inherit" onClick={() => nav('/dashboard')}>Dashboard</Button>
                        :
                        <Button color="inherit" onClick={() => nav('/reservation')}>Reservation</Button>
                }
            </Box>
        </Box>
    )
}

export default SecondToolbar 