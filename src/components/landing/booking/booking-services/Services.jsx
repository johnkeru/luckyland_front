import { Box, Button, Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import BookingSummary from '../BookingSummary';
import RoomDetails from './RoomDetails';
import Rooms from './Rooms';
import useBookingSummary from '../../../../hooks/useBookingSummary';

const Services = ({ handleNext }) => {
    const { selectedRooms } = useBookingSummary();
    const [room, setRoom] = useState(null); // Room being viewed
    const scrollContainerRef = useRef(null);

    const scrollToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    };

    const handleRoomChange = (selectedRoom) => {
        setRoom(selectedRoom);
        scrollToTop(); // Scroll to the top when changing the room
    };

    return (
        <Grid display='flex' gap={2}>
            <Grid
                ref={scrollContainerRef}
                display='flex'
                pb={1}
                justifyContent='space-between'
                flexWrap='wrap'
                gap={1}
                width='75%'
                sx={{ overflowY: 'scroll', height: '65vh' }}
            >
                {room ? <RoomDetails room={room} setRoom={handleRoomChange} /> : <Rooms setRoom={handleRoomChange} />}
            </Grid>
            <Box width='25%' position='relative'>
                <BookingSummary
                    nextButton={
                        <Button
                            variant="contained"
                            disabled={selectedRooms.length === 0}
                            color='info'
                            fullWidth
                            onClick={() => handleNext()}
                        >
                            Continue
                        </Button>
                    }
                />
            </Box>
        </Grid>
    );
};

export default Services;
