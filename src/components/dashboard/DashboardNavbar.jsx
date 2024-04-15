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
import { grey } from '@mui/material/colors';
import { MdNotifications } from "react-icons/md";
import useUser from '../../hooks/useUser';
import { drawerWidth } from '../../pages/Dashboard';
import { NO_USER_IMAGE } from '../../utility_functions/cloudinaryUrl';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';

const settings = [
    {
        label: 'Profile',
        fn: (nav) => nav('/profile')
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
            commonValidationCall({ endpoint: '/logout', method: 'post', handleClose: () => nav('/') });
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

    const pathname = window.location.pathname;
    const locationParts = pathname.split('/');
    const currentPath = locationParts[locationParts.length - 1].toUpperCase();


    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const nav = useNavigate();

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <AppBar position="absolute" open={open} sx={{ backgroundColor: '#154d6a' }}>
            <Toolbar>

                {/* <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MdOutlineMenu />
                </IconButton> */}

                {!open ? <Box
                    // sx={{ display: { xs: 'none', md: 'flex' }, ml: -2, mr: '36px', }}
                    sx={{ ml: -2, mr: '36px' }}
                >
                    <img
                        onClick={() => nav('/')}
                        width='55'
                        src='/logo/logo1.png'
                        alt="nature image"
                    />
                </Box> : undefined}

                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                >
                    {currentPath}
                </Typography>
                <IconButton color="inherit" >
                    <Badge badgeContent={4} color="secondary">
                        <MdNotifications />
                    </Badge>
                </IconButton>


                <Box ml={'auto'}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: .2, bgcolor: 'white', ":hover": { bgcolor: grey['200'] } }}>
                            <Avatar alt={user.firstName} src={user?.image || NO_USER_IMAGE} />
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


