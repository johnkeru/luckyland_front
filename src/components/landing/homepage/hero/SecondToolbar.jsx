import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import useUser from '../../../../hooks/useUser';
import Login from '../../login/Login';
import MobileNavbar from './MobileNavbar';


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
                    px: { xs: 2, lg: 20 }, // change the lg: 2 if needed.
                    py: !isScrolled ? 1 : .5,
                    color: '#fff',
                    backdropFilter: isScrolled ? 'blur(7px)' : undefined,
                    backgroundColor: isScrolledBody ? 'rgba(0, 0, 0, .5)' : !isScrolled ? undefined : 'rgba(0, 0, 0, .4)',
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

                <Box display={{ xs: 'none', md: 'flex' }} gap={1}>
                    {!user && <Login button={
                        <Button color='inherit' variant='inherit'>Login</Button>
                    } />}
                    <Button color="inherit" onClick={() => nav('/')}>Home</Button>
                    <Button color="inherit" onClick={() => nav('/about')}>About</Button>
                    <Button color="inherit" onClick={() => nav('/contact')}>Contact</Button>
                    {
                        user ? <Button color="inherit" onClick={() => nav('/dashboard')}>Dashboard</Button>
                            :
                            <Button variant='contained' sx={{ bgcolor: 'primary.contrastText', color: 'primary.main', ':hover': { bgcolor: 'primary.contrastText', color: 'primary.main' } }} onClick={() => nav('/create-reservation')}>Reservation</Button>
                    }
                </Box>

                <MobileNavbar />
            </Box>
        </Box>
    )
}

export default SecondToolbar 