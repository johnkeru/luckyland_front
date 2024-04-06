import React from 'react'
import { Typography, Button, Box, AppBar, Toolbar } from '@mui/material';
import Login from '../login/Login'
import useUser from '../../../hooks/useUser';

const SecondToolbar = ({ sx }) => {
    const { user } = useUser();
    return (
        <Box sx={sx}>
            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} flexGrow={1}>
                <img
                    src="/logo/logo1.png"
                    alt="Resort Logo"
                    width='45px'
                />
                LuckyLand Resort
            </Typography>
            <Login button={
                <Button color='inherit' variant='outlined'>Login</Button>
            } />
            <Button color="inherit" onClick={() => nav('/')}>Home</Button>
            <Button color="inherit" onClick={() => nav('/about')}>About</Button>
            <Button color="inherit" onClick={() => nav('/contact')}>Contact</Button>
            {
                user ? <Button color="inherit" onClick={() => nav('/dashboard')}>Dashboard</Button>
                    :
                    <Button color="inherit" onClick={() => nav('/reservation')}>Reservation</Button>
            }
        </Box>
    )
}

export default SecondToolbar 