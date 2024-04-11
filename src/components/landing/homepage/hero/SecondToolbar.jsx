import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import useUser from '../../../../hooks/useUser';
import Login from '../../login/Login';


const SecondToolbar = ({ nav, isScrolled, isScrolledBody }) => {
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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 20,
                    py: 1,
                    color: '#fff',
                    backdropFilter: isScrolled ? 'blur(7px)' : undefined,
                    backgroundColor: isScrolledBody ? 'rgba(0, 0, 0, .3)' : !isScrolled ? undefined : 'rgba(0, 0, 0, .2)',
                }}
            >
                <Typography variant={isScrolled ? 'h6' : "h5"} component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} flexGrow={1} onClick={() => nav('/')}>
                    <img
                        src="/logo/logo1.png"
                        alt="Resort Logo"
                        width={isScrolled ? '50px' : '70px'}
                    />
                    LuckyLand Resort
                </Typography>
                {!user && <Login button={
                    <Button color='inherit' variant='inherit'>Login</Button>
                } />}
                <Button color="inherit" onClick={() => nav('/')}>Home</Button>
                <Button color="inherit" onClick={() => nav('/about')}>About</Button>
                <Button color="inherit" onClick={() => nav('/contact')}>Contact</Button>
                {
                    user ? <Button color="inherit" onClick={() => nav('/dashboard')}>Dashboard</Button>
                        :
                        <Button variant='contained' onClick={() => nav('/reservation')}>Reservation</Button>
                }
            </Box>
        </Box>
    )
}

export default SecondToolbar 