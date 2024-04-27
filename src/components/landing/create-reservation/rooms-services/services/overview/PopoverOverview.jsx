import { Badge, Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { IoCloseSharp } from "react-icons/io5";
import * as React from 'react';
import CottageRoomCardOverview from './CottageRoomCardOverview'; // Assuming the CottageRoomCard component file is in the same directory
import useServices from '../../../../../../hooks/reservation/useServices';
import './PopoverOverview.css'; // Import your CSS file

export default function PopoverOverview({ handleNext }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [prevBadgeNumber, setPrevBadgeNumber] = React.useState(0); // Track previous badge number
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? 'cottage-room-popover' : undefined;

    const { selectedRooms, selectedCottages } = useServices();

    const isDisable = selectedRooms.length === 0 && selectedCottages.length === 0;
    const badgeNumber = (selectedRooms.length ? selectedRooms.length : 0) + (selectedCottages.length ? selectedCottages.length : 0);

    // Add CSS class when badgeNumber increases
    React.useEffect(() => {
        if (badgeNumber > prevBadgeNumber) {
            const badgeElement = document.getElementById('badge');
            badgeElement.classList.add('badge-animation');
            setTimeout(() => {
                badgeElement.classList.remove('badge-animation');
            }, 1000); // Duration of the animation in milliseconds
        }
        setPrevBadgeNumber(badgeNumber);
    }, [badgeNumber, prevBadgeNumber]);

    return (
        <Box>
            <Button aria-describedby={id} sx={{ px: 1, fontWeight: 600, border: '1px solid orange', color: 'primary.main', bgcolor: 'primary.contrastText', ":hover": { color: 'primary.main', bgcolor: 'primary.contrastText' } }} size='small' onClick={handleClick}>
                <Badge color="error" badgeContent={badgeNumber} id="badge">
                    Your reservation
                </Badge>
            </Button>

            <Popover
                id={id}
                open={open}
                disableScrollLock
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ width: { xs: '320px', md: '400px' }, position: 'relative' }}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' py={1} px={2} color='primary.main' fontWeight={600} bgcolor='background.white' borderBottom='1px solid #ddd'>
                        <Typography variant="h6">
                            Summary
                        </Typography>
                        <IconButton size='small' color='error' onClick={handleClose}>
                            <IoCloseSharp />
                        </IconButton>
                    </Box>
                    <Box sx={{ overflowY: 'auto', height: '400px', bgcolor: 'background.paper', px: { xs: 1, sm: 2 } }}>
                        <CottageRoomCardOverview />
                    </Box>
                    <Button fullWidth variant='contained' size='large' sx={{ borderRadius: 0 }} disabled={isDisable} onClick={() => handleNext()}>
                        Proceed
                    </Button>
                </Box>
            </Popover>
        </Box>
    );
}
