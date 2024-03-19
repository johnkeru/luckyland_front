import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { MdChevronLeft } from "react-icons/md";

import { Box, Grid, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { drawerWidth } from '../../pages/Dashboard';

import { CgUnavailable } from "react-icons/cg";
import { GrDeliver } from "react-icons/gr";
import { MdDashboard, MdInventory, MdOutlineBedroomParent, MdOutlineInventory } from "react-icons/md";
import { RiReservedFill } from "react-icons/ri";
import { TbDatabaseSearch, TbMoneybag, TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utility_functions/roles';
import NestedList from './NestedList';
import { BsFillPeopleFill } from 'react-icons/bs';

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

const adminNavigations = [
    {
        label: 'Reservation Reports',
        icon: <TbReportAnalytics color='white' />,
        path: '/dashboard/reservation/reports',
    },
    {
        label: 'Inventory Reports',
        icon: <MdOutlineInventory color='white' />,
        path: '/dashboard/inventory/reports',
    },
    {
        label: 'Employee',
        icon: <BsFillPeopleFill color='white' />,
        path: '/dashboard/employee',
    },
]


const settingNavigation = [
    {
        label: 'Room Management',
        icon: <MdOutlineBedroomParent color='white' />,
        path: '/settings',
    },
    {
        label: 'Record Management',
        icon: <TbDatabaseSearch color='white' />,
        path: '/records',
    },
]

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            backgroundColor: "#09212E",
            color: 'white',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function isActive(path) {
    return window.location.pathname === path;
}

const DashboardDrawer = ({ toggleDrawer, open, setOpen, user, setCurrentPath }) => {
    const nav = useNavigate();
    const [hoverInventory, setHoverInventory] = useState(false);

    const handleNav = (label, path) => {
        setCurrentPath(label);
        nav(path);
    }

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1],
                    borderBottom: '1px solid black',
                    boxShadow: 1
                }}
            >

                <Grid display='flex' alignItems='center' width='100%' gap={1} >
                    <img
                        onClick={() => nav('/')}
                        width='55'
                        src='/logo/logo1.png'
                        alt="nature image"
                    />

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontWeight: 700,
                            color: 'lightblue'
                        }}
                        variant='body2'
                    >
                        LuckyLand Resort
                    </Typography>
                </Grid>

                <IconButton onClick={toggleDrawer}>
                    <MdChevronLeft color='white' />
                </IconButton>

            </Toolbar>

            <Divider />
            <List component="nav" sx={{ mt: 3 }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
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
                <Divider sx={{ my: 1, }} />
                {
                    isAdmin(user.roles) ? <>
                        {
                            adminNavigations.map(navigation => (
                                <Box key={navigation.path} onClick={() => handleNav(navigation.label, navigation.path)} sx={{ backgroundColor: isActive(navigation.path) ? 'rgba(250,250,250,.2)' : 'transparent' }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {navigation.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={navigation.label} />
                                    </ListItemButton>
                                </Box>
                            ))
                        }
                        <Divider sx={{ my: 1, }} />
                    </> : undefined
                }
                {
                    isAdmin(user.roles) ? <>
                        <Divider sx={{ my: 1, }} />
                        {
                            settingNavigation.map(navigation => (
                                <Box key={navigation.path} onClick={() => handleNav(navigation.label, navigation.path)} sx={{ backgroundColor: isActive(navigation.path) ? 'rgba(250,250,250,.2)' : 'transparent' }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {navigation.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={navigation.label} />
                                    </ListItemButton>
                                </Box>
                            ))
                        }
                    </> : undefined
                }
            </List>
        </Drawer>
    )
}

export default DashboardDrawer