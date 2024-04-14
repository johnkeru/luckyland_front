import { IconButton, Tooltip, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoMdArrowUp, IoMdReturnLeft } from 'react-icons/io';
import Borrow_Item_Modal from '../modal/Borrow_Item_Modal';
import View_Returned_Items_Modal from '../modal/View_Returned_Items_Modal';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function BorrowMenu({ data, configMethods }) {
    const [openBorrowModal, setOpenBorrowModal] = useState(false);
    const handleOpenBorrowModal = () => setOpenBorrowModal(true);

    const [openReturnedModal, setOpenReturnedModal] = useState(false);
    const handleOpenReturnedModal = () => setOpenReturnedModal(true);

    const handleCloseAll = () => {
        setOpenBorrowModal(false);
        setOpenReturnedModal(false);
        handleClose();
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip title='borrow & returned'>
                <IconButton
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    onClick={handleClick}
                >

                    <HiDotsHorizontal />
                </IconButton>
            </Tooltip>

            {openBorrowModal ? <Borrow_Item_Modal
                data={data}
                handleCloseAll={handleCloseAll}
                onClick={configMethods.borrow}
                openBorrowModal={openBorrowModal}
            /> : undefined}

            {openReturnedModal ? <View_Returned_Items_Modal
                data={data}
                handleCloseAll={handleCloseAll}
                openReturnedModal={openReturnedModal}
            /> : undefined}

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleOpenBorrowModal} disableRipple >
                    <IoMdArrowUp />
                    <Typography ml={1}>Borrows</Typography>
                </MenuItem>
                <MenuItem onClick={handleOpenReturnedModal} disableRipple>
                    <IoMdReturnLeft />
                    <Typography ml={1}>Returned Items</Typography>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
