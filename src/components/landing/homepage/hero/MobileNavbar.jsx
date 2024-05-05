import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import Login from '../../login/Login';
import { useNavigate } from 'react-router';
import scrollTop from '../../../../utility_functions/scrollTop';
import { FaShoppingCart } from "react-icons/fa";
import PopoverOverview from '../../create-reservation/rooms-services/services/overview/PopoverOverview';
import useServices from '../../../../hooks/reservation/useServices';
import { LOGO } from '../../../../cloud/mainImages';
import { primaryLightColors } from '../../../../styles/globalStyle';

const MobileNavbar = () => {
    const nav = useNavigate();

    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const { selectedRooms, selectedCottages } = useServices();
    const isDisable = selectedRooms.length === 0 && selectedCottages.length === 0;

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClick = () => {
        toggleDrawer();
    }

    const handleGoTo = (path) => {
        nav(path);
        toggleDrawer();
        scrollTop();
    }

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

            <Box display='flex' alignItems='center' gap={2.5}>
                {!isDisable ? <PopoverOverview handleNext={() => nav('/create-reservation')} button={
                    <IconButton size='small' sx={{ color: 'white' }}><FaShoppingCart size={25} /></IconButton>
                } /> : undefined}

                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleDrawer}
                    sx={{ color: primaryLightColors.primary100 }}
                >
                    {open ? <MdClose size={30} /> : <MdMenu size={30} />}
                </IconButton>
            </Box>

            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        width: { xs: '60%', sm: '30%' }, // Adjust the width as needed
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <img alt="Logo" width="80" height="80" src={LOGO}
                        style={{ borderRadius: '50%' }} /> {/* Add your logo here */}

                </Box>
                <Divider sx={{ mt: 2, mb: 2 }} />

                <List>
                    <ListItemButton >
                        <ListItemText onClick={() => handleGoTo('/')} primary={<Typography variant="h6">Home</Typography>} />
                    </ListItemButton>
                    <ListItemButton >
                        <ListItemText onClick={() => handleGoTo('/rooms')} primary={<Typography variant="h6">Rooms</Typography>} />
                    </ListItemButton>
                    <ListItemButton >
                        <ListItemText onClick={() => handleGoTo('/cottages')} primary={<Typography variant="h6">Cottages</Typography>} />
                    </ListItemButton>
                    <ListItemButton href='#about' onClick={handleClick}>
                        <ListItemText primary={<Typography variant="h6">About</Typography>} />
                    </ListItemButton>
                    <ListItemButton href='#gallery' onClick={handleClick}>
                        <ListItemText primary={<Typography variant="h6">Gallery</Typography>} />
                    </ListItemButton>
                    <Login button={<ListItemButton>
                        <ListItemText primary={<Typography variant="h6">Login</Typography>} />
                    </ListItemButton>} />
                </List>
            </Drawer>
        </Box>
    );
};

export default MobileNavbar;
