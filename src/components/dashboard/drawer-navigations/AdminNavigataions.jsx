import React from 'react';
import { MdOutlineCottage } from "react-icons/md";

import { Box, Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { BsFillPeopleFill } from 'react-icons/bs';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdOutlineBedroomParent } from "react-icons/md";
import { RiBuilding4Fill } from "react-icons/ri";
import { TbDatabaseSearch } from 'react-icons/tb';
import NestedList from './NestedList';

const adminNavigations = [
    {
        label: 'Employee',
        icon: <BsFillPeopleFill color='white' />,
        path: '/dashboard/employee',
    },
    {
        label: 'Facilities',
        icon: <RiBuilding4Fill color='white' />,
        subs: [
            {
                label: 'Room Management',
                icon: <MdOutlineBedroomParent color='white' />,
                path: 'facilities/room-management',
            },
            {
                label: 'Cottage Management',
                icon: <MdOutlineCottage color='white' />,
                path: 'facilities/cottage-management',
            },
        ]
    },
    {
        label: 'Record Management',
        icon: <TbDatabaseSearch color='white' />,
        path: '/dashboard/record-management',
    },
    {
        label: 'Backup & Restore',
        icon: <LuArchiveRestore color='white' />,
        path: '/dashboard/backup-restore',
    },
]

const AdminNavigataions = ({ handleNav, isActive }) => {
    return (
        <>
            {
                adminNavigations.map(navigation => (
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
            <Divider sx={{ my: 1, }} />
        </>
    )
}

export default AdminNavigataions