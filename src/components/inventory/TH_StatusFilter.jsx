import { GoDotFill } from 'react-icons/go';
import { Box, IconButton, TableCell, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { PiFunnelFill } from "react-icons/pi";
import { statusColor } from '../../utility_functions/statusColor';

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

export default function TH_StatusFilter({ label, handleToggle, options, query = 'status' }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const [selected, setSelected] = useState('');

    const handleOptionClick = (labelParam) => {
        if (labelParam === selected) {
            setSelected('');
            handleToggle(`${query}=&`);
        } else {
            setSelected(labelParam);
            handleToggle(`${query}=${labelParam}&`);
        }
        handleClose();
    };

    return (
        <>
            <TableCell
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
                sx={{
                    cursor: 'pointer',
                    bgcolor: selected ? grey[100] : undefined,
                    ":hover": {
                        bgcolor: grey[50]
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {label}
                    <IconButton size='small' sx={{ color: !selected ? grey[400] : statusColor(selected) }}>
                        <PiFunnelFill />
                    </IconButton>
                </Box>
            </TableCell>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    options.map(option =>
                        <MenuItem
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            sx={{
                                bgcolor: (selected && selected === option) ? grey['300'] : undefined, '&:hover': {
                                    backgroundColor: grey['200'],
                                }
                            }}
                        >
                            <Typography
                                color={statusColor(option)}
                                sx={{ fontSize: '20px', mr: 1, display: 'flex' }}
                            >
                                <GoDotFill />
                            </Typography>
                            {option}
                        </MenuItem>
                    )
                }
            </StyledMenu>
        </>
    );
}
