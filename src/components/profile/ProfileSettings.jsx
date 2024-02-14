import { Grid } from '@mui/material';
import Menu from '@mui/material/Menu';
import * as React from 'react';

export default function ProfileSettings({ button, MenuItems, sx }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid sx={sx}>

            {React.cloneElement(button, { onClick: handleClick })}

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {MenuItems}
            </Menu>
        </Grid>
    );
}
