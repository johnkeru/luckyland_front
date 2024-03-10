import { IconButton } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { MdExpandLess, MdExpandMore, MdInventory } from "react-icons/md";


export default function NestedList({ handleNav, nav, subs, isActive }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNavClick = (navi) => {
        handleNav(navi.label, navi.path);
        open && handleClose();
    }

    return (
        <>
            <ListItemButton
                sx={{ backgroundColor: isActive ? 'rgba(250,250,250,.2)' : 'transparent', ":hover": { backgroundColor: 'rgba(250,250,250,.2)' } }}
                onClick={() => handleNavClick(nav)}
                onMouseEnter={handleOpen}
            >
                <ListItemIcon>
                    <MdInventory color='white' />
                </ListItemIcon>
                <ListItemText primary={nav.label} />
                {open ? <IconButton size='small'><MdExpandLess color='white' /></IconButton> :
                    <IconButton size='small'><MdExpandMore color='white' /></IconButton>}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit
                onMouseLeave={handleClose}
            >
                <List component="div" disablePadding >
                    {
                        subs.map(sub => (
                            <ListItemButton key={sub.path} sx={{ ml: 3, borderLeft: '2px solid rgba(250,250,250,.5)' }} onClick={() => handleNav(sub.label, sub.path)}>
                                <ListItemIcon>
                                    {sub.icon}
                                </ListItemIcon>
                                <ListItemText primary={sub.label} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Collapse>
        </>
    );
}
