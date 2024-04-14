import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { MdChevronLeft } from "react-icons/md";

import { Grid } from '@mui/material';
import { drawerWidth } from '../../pages/Dashboard';

import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utility_functions/roles';
import AdminNavigataions from './drawer-navigations/AdminNavigataions';
import BasicNavigations from './drawer-navigations/BasicNavigations';



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


const DashboardDrawer = ({ toggleDrawer, open, setOpen, user, }) => {

    const nav = useNavigate();
    const [subOpen, setSubOpen] = useState({ label: '' });

    return (
        <Drawer variant="permanent" open={open}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
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
                <Grid display='flex' alignItems='center' width='100%' gap={1} onClick={() => nav('/')} >
                    <img
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

            <List component="nav" sx={{ mt: 3 }}>

                <BasicNavigations setSubOpen={setSubOpen} subOpen={subOpen} />

                <Divider sx={{ my: 2, color: 'white', bgcolor: 'rgba(250,250,250,.3)' }} />
                {
                    isAdmin(user.roles) ? <AdminNavigataions setSubOpen={setSubOpen} subOpen={subOpen} /> : undefined
                }
            </List>
        </Drawer>
    )
}

export default DashboardDrawer