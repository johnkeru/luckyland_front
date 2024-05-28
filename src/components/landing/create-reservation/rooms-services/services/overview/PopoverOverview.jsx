import { Badge, Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import useServices from '../../../../../../hooks/reservation/useServices';
import CottageRoomCardOverview from './CottageRoomCardOverview'; // Assuming the CottageRoomCard component file is in the same directory
import './PopoverOverview.css'; // Import your CSS file
import ReactDOM from 'react-dom';

export default function PopoverOverview({ handleNext, button }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [prevBadgeNumber, setPrevBadgeNumber] = React.useState(0); // Track previous badge number
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? 'cottage-room-popover' : undefined;

    const { selectedRooms, selectedCottages, selectedOthers } = useServices();

    const isDisable = selectedRooms.length === 0 && selectedCottages.length === 0 && selectedOthers.length === 0;
    const badgeNumber = (selectedRooms.length ? selectedRooms.length : 0) + (selectedCottages.length ? selectedCottages.length : 0) + (selectedOthers.length ? selectedOthers.length : 0);

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

    let buttonDisplay = button || <Button
        startIcon={<FaCartShopping />}
        sx={{
            px: 2,
            py: 1,
            fontWeight: 600,
            background: 'linear-gradient(45deg, #FF8E53, #FFA726)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            '&:hover': {
                background: 'linear-gradient(45deg, #FFA726, #FF8E53)', // Swap colors on hover
            },
        }}
        size='small'
    >
        Your Reservation
    </Button>

    return (
        ReactDOM.createPortal(
            <Box>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: { xs: '20px', sm: '30px' }, // Adjust as needed for vertical positioning
                        right: { xs: '20px', sm: '30px' }, // Adjust as needed for horizontal positioning
                        zIndex: 1000, // Ensures button stays on top of other content
                    }}
                >
                    <Badge color="error" badgeContent={badgeNumber} id="badge">
                        {React.cloneElement(buttonDisplay, { onClick: handleClick })}
                    </Badge>
                </Box>

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
                    <Box
                        sx={{
                            width: { xs: '320px', md: '400px' },
                            position: 'relative',
                        }}
                    >
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            py={1}
                            px={2}
                            color='primary.main'
                            fontWeight={600}
                            bgcolor='background.white'
                            borderBottom='1px solid #ddd'
                        >
                            <Typography variant="h6">
                                Summary
                            </Typography>
                            <IconButton size='small' color='error' onClick={handleClose}>
                                <IoCloseSharp />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                overflowY: 'auto',
                                height: '400px',
                                bgcolor: 'background.paper',
                                px: { xs: 1, sm: 2 },
                            }}
                        >
                            <CottageRoomCardOverview />
                        </Box>
                        <Button
                            fullWidth
                            variant='contained'
                            size='large'
                            sx={{ borderRadius: 0, mt: 2, }} // Add margin top for spacing
                            disabled={isDisable}
                            onClick={handleNext}
                        >
                            Proceed
                        </Button>
                    </Box>
                </Popover>
            </Box>,
            document.getElementById('portal-reservation-overview'))
    );
}
