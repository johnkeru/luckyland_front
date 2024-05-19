import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import useUser from '../../../../hooks/useUser';
import Login from '../../login/Login';
import MobileNavbar from './MobileNavbar';
import PopoverOverview from '../../create-reservation/rooms-services/services/overview/PopoverOverview';
import scrollTop from '../../../../utility_functions/scrollTop';
import useServices from '../../../../hooks/reservation/useServices';
import { LOGO } from '../../../../cloud/mainImages';

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
                    px: { xs: 1, lg: 20 },
                    py: !isScrolled ? 1 : .5,
                    color: '#fff',
                    backdropFilter: isScrolled ? 'blur(7px)' : undefined,
                    backgroundColor: isScrolledBody ? 'rgba(0, 0, 0, .5)' : !isScrolled ? undefined : 'rgba(0, 0, 0, .4)',
                    transition: 'background-color 0.3s, backdrop-filter 0.3s',
                }}
            >
                <Box display='flex' alignItems='center' width='fit-content' py={.3} gap={1} onClick={() => nav('/')}>
                    <img
                        src={LOGO}
                        style={{ borderRadius: '50%' }}
                        alt="Resort Logo"
                        width={isScrolled ? '53px' : '65px'}
                    />
                    <Typography
                        variant={isScrolled ? 'h6' : 'h5'}
                        sx={{
                            gap: { xs: .5, md: 1 },
                            m: { xs: 'auto', sm: '0' },
                            fontFamily: 'cursive',
                            fontWeight: 600,
                        }}
                    >
                        LuckyLand Resort
                    </Typography>
                </Box>
                <Box display={{ xs: 'none', md: 'flex' }} gap={1}>
                    {!isDisable && <PopoverOverview handleNext={handleGoTo} />}
                    <Button color="inherit" onClick={() => nav('/')}>Home</Button>
                    <Button color="inherit" href='#about'>About</Button>
                    <Button color="inherit" href='#gallery'>Gallery</Button>
                    {user ? <Button color="inherit" onClick={() => nav('/dashboard')}>Dashboard</Button> : null}
                    {!user && <Login button={<Button variant='outlined' sx={{ px: 4, border: '1px solid white', color: 'white', borderRadius: 999, ':hover': { border: '1px solid white', color: 'white' } }}>Login</Button>} />}
                </Box>
                <MobileNavbar />
            </Box>
        </Box>
    );
}

export default SecondToolbar;
