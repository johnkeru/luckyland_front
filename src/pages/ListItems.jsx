import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

import { BsFillPeopleFill } from "react-icons/bs";
import { MdDashboard, MdInventory, MdOutlineInventory } from "react-icons/md";
import { RiReservedFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";


export const mainListItems = (
    <React.Fragment>
        <ListItemButton sx={{ mt: 3 }}>
            <ListItemIcon>
                <MdDashboard color='white' />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <RiReservedFill color='white' />
            </ListItemIcon>
            <ListItemText primary="Reservation" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <MdInventory color='white' />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <TbReportAnalytics color='white' />
            </ListItemIcon>
            <ListItemText primary="Reservation Reports" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <MdOutlineInventory color='white' />
            </ListItemIcon>
            <ListItemText primary="Inventory Reports" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <BsFillPeopleFill color='white' />
            </ListItemIcon>
            <ListItemText primary="Employee" />
        </ListItemButton>
    </React.Fragment>
);