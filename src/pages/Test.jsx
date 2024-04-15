import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import { MdMenu, MdClose } from 'react-icons/md';

const ResortDrawer = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
            >
                {open ? <MdClose /> : <MdMenu />}
            </IconButton>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        width: '200px',
                        transition: theme.transitions.create(['width'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                }}
            >
                <List>
                    <ListItem>
                        <img src='/logo/logo1.png' width='100px' />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Typography variant="h6">Home</Typography>} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Typography variant="h6">About</Typography>} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Typography variant="h6">Rooms</Typography>} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Typography variant="h6">Cottages</Typography>} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Typography variant="h6">Activities</Typography>} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Typography variant="h6">Contact</Typography>} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default ResortDrawer;
