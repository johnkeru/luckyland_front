import { Box, IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { BsFillInfoCircleFill } from "react-icons/bs";

export default function ViewInfo({ content = 'Put your info content here!' }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton
                size='small'
                color='info'
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <BsFillInfoCircleFill />
            </IconButton>

            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Box p={.5}>
                    {content}
                </Box>
            </Popover>
        </div>
    );
}
