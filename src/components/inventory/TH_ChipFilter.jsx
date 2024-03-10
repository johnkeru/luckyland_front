import { Box, Chip, IconButton, TableCell } from '@mui/material';
import Popover from '@mui/material/Popover';
import { grey } from '@mui/material/colors';
import * as React from 'react';
import { PiFunnelFill } from 'react-icons/pi';

export default function TH_ChipFilter({ options, label, query, handleToggle }) {
    const [clickedLabel, setClickedLabel] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => !event ? setAnchorEl(null) : setAnchorEl(event.currentTarget);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleChipClicked = (labelParam) => {
        if (labelParam === clickedLabel) {
            setClickedLabel('');
            handleToggle(`${query}=&`);
        } else {
            setClickedLabel(labelParam);
            handleToggle(`${query}=${labelParam}&`);
        }
        handleClick();
    }

    return (
        <>
            <TableCell
                sx={{
                    cursor: 'pointer',
                    bgcolor: clickedLabel ? grey[100] : undefined,
                    ":hover": {
                        bgcolor: grey[50]
                    }
                }}
                onClick={handleClick}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {label}
                    <IconButton size='small' sx={{ color: !clickedLabel ? grey[400] : undefined }}>
                        <PiFunnelFill />
                    </IconButton>
                </Box>
            </TableCell>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => handleClick()}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    width: '250px',
                    gap: 1,
                    p: 1,
                }}>
                    {options.length !== 0 ?
                        options.map(option => (
                            <Chip
                                onClick={() => handleChipClicked(option.name)}
                                clickable
                                key={option.id}
                                label={option.name}
                                variant={clickedLabel === option.name ? 'filled' : 'outlined'} />
                        ))
                        :
                        'Loading...'}
                </Box>
            </Popover>
        </>
    );
}



