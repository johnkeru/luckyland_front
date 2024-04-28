import React, { useState } from 'react';
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Typography, useTheme, Divider } from '@mui/material';
import { MdMenu, MdClose } from 'react-icons/md';
import Login from '../../login/Login';
import logo from '/logo/logo1.png'; // Import your logo image

const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
            >
                {open ? <MdClose size={30} /> : <MdMenu size={30} />}
            </IconButton>

            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        width: { xs: '50%', sm: '30%' }, // Adjust the width as needed
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <img src={logo} alt="Logo" width="80" height="80" /> {/* Add your logo here */}
                </Box>
                <Divider sx={{ mt: 2, mb: 2 }} />

                <List>
                    <ListItem >
                        <ListItemText primary={<Typography variant="h6">Home</Typography>} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary={<Typography variant="h6">About</Typography>} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary={<Typography variant="h6">Rooms</Typography>} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary={<Typography variant="h6">Cottages</Typography>} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary={<Typography variant="h6">Activities</Typography>} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary={<Typography variant="h6">Contact</Typography>} />
                    </ListItem>
                    <ListItem>
                        <Login button={<Button color='inherit' variant='inherit'>Login</Button>} />
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default MobileNavbar;
