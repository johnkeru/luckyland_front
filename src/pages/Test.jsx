import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FiMenu, FiChevronLeft } from 'react-icons/fi';
import { IconContext } from 'react-icons';

const drawerWidth = 240;

const BeautifulDrawer = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '8px' }}>
                    <IconContext.Provider value={{ size: '1.5em' }}>
                        <FiChevronLeft onClick={handleDrawerClose} style={{ cursor: 'pointer' }} />
                    </IconContext.Provider>
                </div>
                <List>
                    <ListItem button>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="About" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Services" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Contact" />
                    </ListItem>
                </List>
            </Drawer>
            <IconContext.Provider value={{ size: '1.5em', style: { cursor: 'pointer' } }}>
                <FiMenu onClick={handleDrawerOpen} />
            </IconContext.Provider>
        </div>
    );
};

export default BeautifulDrawer;
