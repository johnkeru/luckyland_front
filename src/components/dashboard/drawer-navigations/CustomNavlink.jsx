import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const CustomNavLink = ({ to, icon, label, subs, subOpen, setSubOpen }) => {

    return (
        <>
            {
                to ? <NavLink to={to} style={{ color: 'inherit', textDecoration: 'none' }} onClick={() => setSubOpen({ label: subOpen.label === label ? '' : label })}>
                    {({ isActive }) => (
                        <ListItemButton sx={{ bgcolor: isActive ? 'rgba(250,250,250,.3)' : 'inherit', ":hover": { bgcolor: isActive ? 'rgba(250,250,250,.3)' : 'inherit' } }}>
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={label} />

                            {
                                subs ?
                                    subOpen.label === label ? <IconButton size='small'><MdExpandLess color='white' /></IconButton> :
                                        <IconButton size='small'><MdExpandMore color='white' /></IconButton>
                                    : undefined
                            }
                        </ListItemButton>
                    )}
                </NavLink>
                    :
                    <ListItemButton sx={{ cursor: 'default', bgcolor: 'inherit', ":hover": { bgcolor: 'inherit' } }} onClick={() => setSubOpen({ label: subOpen.label === label ? '' : label })}>
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={label} />

                        {
                            subs ?
                                subOpen.label === label ? <IconButton size='small'><MdExpandLess color='white' /></IconButton> :
                                    <IconButton size='small'><MdExpandMore color='white' /></IconButton>
                                : undefined
                        }
                    </ListItemButton>
            }

            {subs ? <Collapse in={subOpen.label === label} timeout="auto" unmountOnExit sx={{ mb: 2 }}>
                {
                    subs.map(sub => (
                        <NavLink key={sub.label} to={sub.path} end style={{ color: 'inherit', textDecoration: 'none' }}>
                            {({ isActive }) => (
                                <ListItemButton sx={{
                                    bgcolor: isActive ? 'rgba(250,250,250,.3)' : 'inherit',
                                    ":hover": { bgcolor: isActive ? 'rgba(250,250,250,.3)' : 'inherit' },
                                    ml: 3,
                                    borderLeft: '2px solid rgba(250,250,250,.5)'
                                }}>
                                    <ListItemIcon sx={{ color: isActive ? 'white' : 'inherit' }}>
                                        {sub.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={sub.label} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    ))
                }
            </Collapse> : undefined}
        </>
    );
};

export default CustomNavLink;
