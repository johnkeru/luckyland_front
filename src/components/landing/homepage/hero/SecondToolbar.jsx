import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useUser from '../../../../hooks/useUser';
import Login from '../../login/Login';

import { ImLocation } from 'react-icons/im';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaSquareFacebook } from 'react-icons/fa6';

const SecondToolbar = ({ nav }) => {
    const { user } = useUser();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrolledBody, setIsScrolledBody] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 135);
            setIsScrolledBody(scrollPosition > 663);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            <Box bgcolor='primary.main' color='primary.contrastText' sx={{ display: 'flex', py: 1, px: 20 }}>
                <Box display="flex" alignItems="center" flexGrow={1} gap={2}>
                    <Box display="flex" gap={1} alignItems='center'>
                        <FaPhoneAlt />
                        <Typography variant="body2" color="inherit" fontSize={14}>
                            09092131231231
                        </Typography>
                    </Box>

                    <Box display="flex" gap={1} alignItems="center">
                        <MdEmail />
                        <Typography variant="body2" color="inherit" fontSize={14}>
                            example@example.com
                        </Typography>
                    </Box>

                    <Box display="flex" gap={1} alignItems="center">
                        <ImLocation />
                        <Typography variant="body2" color="inherit" fontSize={14}>
                            Your Address
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <FaSquareFacebook />
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    px: 20,
                    py: 1,
                    color: '#fff',
                    backdropFilter: isScrolled ? 'blur(7px)' : undefined,
                    backgroundColor: isScrolledBody ? 'rgba(0, 0, 0, .3)' : 'rgba(0, 0, 0, .2)',
                }}
            >
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} flexGrow={1} onClick={() => nav('/')}>
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