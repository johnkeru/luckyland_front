import React, { useState } from 'react';
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import { MdMenu, MdClose } from 'react-icons/md';
import Login from '../../login/Login';

const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2, }}
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
                        width: '300px',
                        transition: theme.transitions.create(['width'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                }}
            >
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
                    <ListItem >
                        <Login button={
                            <Button color='inherit' variant='inherit'>Login</Button>
                        } />
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default MobileNavbar;
