import React, { useEffect, useState } from 'react'
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import { Box, Typography } from '@mui/material'
import RoomLoading from '../components/room-management/RoomLoading';
import ReservationRoom from '../components/landing/create-reservation/rooms-services/services/ReservationRoom';
import LandingPage from './LandingPage';

const RoomsPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAllRooms = (loadingOnce) => {
        basicGetCall({
            endpoint: 'api/landing/rooms',
            setDataDirectly: setData,
            setLoading: loadingOnce ? setLoading : undefined
        })
    }

    useEffect(() => {
        getAllRooms(true);
        window.scrollTo(0, 0);
    }, [])

    let rooms = [];
    loading ? [] : data.rooms.forEach(room => {
        if (!rooms.some(existingRoom => existingRoom.type === room.type)) {
            rooms.push(room);
        }
    });

    const content = rooms.length !== 0 ? rooms.map(room => (
        room.images.map(img => ({ name: room.type + ' Room', description: room.description, image: img.url }))
    )).flat() : null;

    return (
        <LandingPage
            loading={loading}
            content={content}
            children={
                <Box py={3}>
                    <Box width='fit-content' mx='auto' mb={5}>
                        <Typography
                            variant="h3"
                            color='primary'
                            sx={{
                                fontFamily: 'cursive',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                textAlign: 'center',
                                mb: 7 // Adding marginBottom to sx
                            }}
                        >
                            {loading ? 0 + ' Rooms' : data.rooms.length + ' Rooms'}
                        </Typography>
                    </Box>
                    <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                        {
                            loading ? <RoomLoading isRoomManagement /> :
                                data.rooms.filter(room => room.active).map(room => <ReservationRoom key={room.id} room={room} />)
                        }
                    </Box>
                </Box>
            }
        />
    )
}

export default RoomsPage