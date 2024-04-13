import React from 'react'
import { CgUnavailable } from 'react-icons/cg';
import { GrDeliver } from 'react-icons/gr';
import { MdDashboard, MdInventory } from 'react-icons/md';
import { RiReservedFill } from 'react-icons/ri';
import { TbMoneybag } from 'react-icons/tb';
import NestedList from './NestedList';
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


const navigations = [
    {
        label: 'Dashboard',
        icon: <MdDashboard color='white' />,
        path: '/dashboard',
    },
    {
        label: 'Reservation',
        icon: <RiReservedFill color='white' />,
        path: '/dashboard/reservation',
    },
    {
        label: 'Inventory',
        icon: <MdInventory color='white' />,
        path: '/dashboard/inventory',
        subs: [
            {
                label: 'Delivery',
                icon: <GrDeliver color='white' />,
                path: 'inventory/delivery',
            },
            {
                label: 'Waste',
                icon: <TbMoneybag color='white' />,
                path: 'inventory/waste',
            },
            {
                label: 'Unavailable',
                icon: <CgUnavailable color='white' />,
                path: 'inventory/unavailable',
            }
        ]
    },
];

const BasicNavigations = ({ isActive, handleNav }) => {
    return (
        <>
            {
                navigations.map(navigation => (
                    navigation.subs ?
                        <NestedList isActive={isActive(navigation.path)} handleNav={handleNav} key={navigation.label} nav={navigation} subs={navigation.subs} /> :
                        <Box
                            key={navigation.path}
                            onClick={() => {
                                setHoverInventory(!hoverInventory);
                                handleNav(navigation.label, navigation.path);
                            }}
                            sx={{ backgroundColor: isActive(navigation.path) ? 'rgba(250,250,250,.2)' : 'transparent' }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {navigation.icon}
                                </ListItemIcon>
                                <ListItemText primary={navigation.label} />
                            </ListItemButton>
                            {
                                (navigation?.subs && hoverInventory) ? navigation.subs.map(navSub => (
                                    <Box key={navSub.label} pl={2} sx={{ backgroundColor: '#09212E', }}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {navSub.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={navSub.label} />
                                        </ListItemButton>
                                    </Box>
                                )) : undefined
                            }
                        </Box>
                ))
            }
        </>
    )
}

export default BasicNavigations