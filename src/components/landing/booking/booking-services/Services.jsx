import { Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import RoomDetails from './RoomDetails';
import Rooms from './Rooms';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall'

const Services = ({ handleNext }) => {
    const [room, setRoom] = useState(null); // Room being viewed
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

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


    useEffect(() => {
        basicGetCall({
            endpoint: 'api/getRoomsWithUnavailableDates',
            setDataDirectly: setRooms,
            setLoading
        });
    }, []);

    return (
        <Grid
            ref={scrollContainerRef}
            display='flex'
            pb={1}
            justifyContent='space-between'
            flexWrap='wrap'
            gap={1}
            width='100%'
        >
            {
                loading ? <Grid sx={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body1">Loading...</Typography>
                </Grid> :
                    room ?
                        <RoomDetails handleNext={handleNext} room={room} setRoom={handleRoomChange} /> :
                        <Rooms rooms={rooms} setRoom={handleRoomChange} />
            }
        </Grid>
    );
};

export default Services;
