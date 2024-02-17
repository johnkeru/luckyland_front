import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';

import { MdChevronLeft } from "react-icons/md";

import { mainListItems, secondaryListItems } from '../../pages/ListItems';
import { drawerWidth } from '../../pages/Dashboard';
import { Grid } from '@mui/material';


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

const DashboardDrawer = ({ toggleDrawer, open, setOpen }) => {
    return (
        <Drawer variant="permanent" open={open} >
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
                            color: 'orange'
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
            <List component="nav"
                onMouseEnter={() => setOpen(true)}
            // onMouseLeave={() => setOpen(false)}
            >
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
            </List>
        </Drawer>
    )
}

export default DashboardDrawer