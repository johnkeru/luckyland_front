import React, { useEffect, useState } from 'react'
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import { Box } from '@mui/material'
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
    )).flat() : [];

    return (
        <LandingPage
            content={content}
            children={
                <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            data.rooms.filter(room => room.active).map(room => <ReservationRoom key={room.id} room={room} />)
                    }
                </Box>
            }
        />
    )
}

export default RoomsPage