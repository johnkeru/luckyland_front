import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import useUser from '../../../../hooks/useUser';
import Login from '../../login/Login';
import MobileNavbar from './MobileNavbar';
import PopoverOverview from '../../create-reservation/rooms-services/services/overview/PopoverOverview';
import scrollTop from '../../../../utility_functions/scrollTop';
import useServices from '../../../../hooks/reservation/useServices';


const SecondToolbar = ({ nav, isScrolled, isScrolledBody }) => {
    const { user } = useUser();

    const { selectedRooms, selectedCottages } = useServices();
    const isDisable = selectedRooms.length === 0 && selectedCottages.length === 0;

    const handleGoTo = () => {
        nav('/create-reservation');
        scrollTop();
    }

    return (
        <Box
            sx={{
                // position: isScrolled ? 'fixed' : 'absolute',
                position: 'fixed',
                zIndex: 10,
                top: 0,
                left: 0,
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    px: { xs: 1, lg: 20 }, // change the lg: 2 if needed.
                    py: !isScrolled ? 1 : .5,
                    color: '#fff',
                    backdropFilter: isScrolled ? 'blur(7px)' : undefined,
                    backgroundColor: isScrolledBody ? 'rgba(0, 0, 0, .5)' : !isScrolled ? undefined : 'rgba(0, 0, 0, .4)',
                }}
            >
                <Typography
                    variant={isScrolled ? 'h6' : "h5"}
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: .5, md: 1 },
                        fontWeight: 600
                    }}
                    flexGrow={1}
                    onClick={() => nav('/')}
                >
                    <img
                        src="/logo/logo1.png"
                        alt="Resort Logo"
                        width={isScrolled ? '55px' : '65px'}
                    />
                    LuckyLand Resort
                </Typography>

                <Box display={{ xs: 'none', md: 'flex' }} gap={1}>
                    {!isDisable ? <PopoverOverview handleNext={handleGoTo} /> : undefined}
                    <Button color="inherit" onClick={() => nav('/')}>Home</Button>
                    <Button color="inherit" href='#about'>About</Button>
                    <Button color="inherit" href='#gallery'>Gallery</Button>
                    {
                        user ? <Button color="inherit" onClick={() => nav('/dashboard')}>Dashboard</Button>
                            :
                            undefined
                    }
                    {!user && <Login button={
                        <Button variant='outlined' sx={{ px: 4, border: '1px solid white', color: 'white', borderRadius: 999, ':hover': { border: '1px solid white', color: 'white' } }}>Login</Button>
                    } />}
                </Box>

                <MobileNavbar />
            </Box>
        </Box>
    )
}

export default SecondToolbar 