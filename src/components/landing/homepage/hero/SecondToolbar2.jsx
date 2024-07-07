import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LOGO } from '../../../../cloud/mainImages';
import useServices from '../../../../hooks/reservation/useServices';
import useUser from '../../../../hooks/useUser';
import scrollTop from '../../../../utility_functions/scrollTop';
import MobileNavbar from './MobileNavbar';
import PopoverOverview from '../../create-reservation/rooms-services/services/overview/PopoverOverview';
import Login from '../../login/Login';

const SecondToolbar2 = ({ nav, isScrolled, isScrolledBody }) => {
    const { user } = useUser();

    const { selectedRooms, selectedCottages, selectedOthers } = useServices();
    const isDisable = selectedRooms.length === 0 && selectedCottages.length === 0 && selectedOthers.length === 0;

    const handleGoTo = (path) => {
        nav(path);
        scrollTop();
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const topButtonSx = {
        bgcolor: 'white',
        color: 'primary.main',
        borderRadius: 0,
        height: isScrolled ? 33 : 35,
        ":hover": {
            bgcolor: 'white',
            color: 'primary.main',
            borderRadius: 0,
        },
        transition: 'height 0.3s ease'
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
                    px: { xs: 1.5, md: 10, lg: 20 },
                    py: .7,
                    color: '#fff',
                    backdropFilter: isScrolled ? 'blur(3px)' : undefined,
                    bgcolor: 'primary.main',
                    transition: 'background-color 0.3s, backdrop-filter 0.3s',
                }}
            >
                <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                    <Box display='flex' alignItems='center' width='fit-content' gap={1} onClick={() => nav('/')}>
                        <img
                            src={LOGO}
                            style={{
                                borderRadius: '50%',
                                width: isScrolled ? '50px' : '60px', // Set width directly here
                                transition: 'width 0.3s ease', // CSS transition for width change
                            }}
                            alt="Resort Logo"
                        />
                        <Typography
                            variant={isScrolled ? 'h6' : 'h5'}
                            sx={{
                                gap: { xs: 0.5, md: 1 },
                                m: { xs: 'auto', sm: '0' },
                                fontFamily: { xs: 'inherit', md: 'cursive' },
                                fontWeight: 600,
                                transition: 'font-size 0.3s ease', // CSS transition for font size change
                            }}
                        >
                            LuckyLand Resort
                        </Typography>
                    </Box>
                    <Box display={{ xs: 'none', sm: 'flex' }} gap={1}>
                        <Login button={<Button variant="contained" sx={topButtonSx}>Login</Button>} />
                        <Button variant="contained" sx={topButtonSx} onClick={() => nav('/create-reservation')}>Book Now</Button>
                    </Box>
                </Box>
                <MobileNavbar />
            </Box>
            <Box
                display={{ xs: 'none', sm: 'flex' }}
                flexWrap='wrap'
                justifyContent='center'
                py={.6}
                gap={1}
                color='white'
                sx={{
                    backgroundColor: isScrolledBody ? 'rgba(0, 0, 0, .5)' : 'rgba(0, 0, 0, .3)',
                    backdropFilter: isScrolled ? 'blur(3px)' : undefined,
                }}>
                {(!isDisable && !isMobile) && <PopoverOverview handleNext={() => handleGoTo('/create-reservation')} />}
                <Button color="inherit" onClick={() => handleGoTo('/')}>Home</Button>
                <Button color="inherit" href='/#accommodations'>Accommodations</Button>
                <Button color="inherit" onClick={() => handleGoTo('/rooms')}>Rooms</Button>
                <Button color="inherit" onClick={() => handleGoTo('/cottages')}>Cottages</Button>
                <Button color="inherit" onClick={() => handleGoTo('/others')}>Others</Button>
                <Button color="inherit" href='/#gallery'>Gallery</Button>
                <Button color="inherit" href='/#about'>About</Button>
                {user ? <Button color="inherit" onClick={() => handleGoTo('/dashboard')}>Dashboard</Button> : null}
            </Box>
        </Box>
    );
}

export default SecondToolbar2;
