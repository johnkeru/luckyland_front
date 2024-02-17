import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router';

import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { MdNotifications, MdOutlineMenu } from "react-icons/md";
import { drawerWidth } from '../../pages/Dashboard';
import axiosCall from '../../utility_functions/axiosCall';
import useUser from '../../hooks/useUser';


const settings = [
    {
        label: 'Profile',
        fn: (nav) => nav('/dashboard/profile')
    },
    {
        label: 'Account'
    },
    {
        label: 'Dashboard'
    },
    {
        label: 'Logout',
        fn: (nav) => {
            axiosCall({ endpoint: '/logout', method: 'post', handleClose: () => nav('/login') });
            useUser.getState().setUser(null);
        }
    }];

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DashboardNavbar = ({ open, toggleDrawer, user }) => {


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const nav = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar

            >

                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MdOutlineMenu />
                </IconButton>

                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                >
                    Dashboard
                </Typography>
                <IconButton color="inherit" >
                    <Badge badgeContent={4} color="secondary">
                        <MdNotifications />
                    </Badge>
                </IconButton>


                <Box ml={'auto'}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user.firstName} src={user?.image || "/static/images/avatar/2.jpg"} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting.label} onClick={() => { setting.fn(nav); handleCloseUserMenu(); }}>
                                <Typography textAlign="center">{setting.label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default DashboardNavbar


