import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import RoomLoading from '../components/room-management/RoomLoading';
import ReservationCottage from '../components/landing/create-reservation/rooms-services/services/ReservationCottage';
import LandingPage from './LandingPage';

const CottagesPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAllCottages = (loadingOnce) => {
        basicGetCall({
            endpoint: 'api/landing/cottages',
            setDataDirectly: setData,
            setLoading: loadingOnce ? setLoading : undefined
        })
    }

    useEffect(() => {
        getAllCottages(true);
        window.scrollTo(0, 0);
    }, []);

    let cottages = [];
    loading ? [] : data.cottages.forEach(room => {
        if (!cottages.some(existingRoom => existingRoom.type === room.type)) {
            cottages.push(room);
        }
    });

    const content = cottages.length !== 0 ? cottages.map(cottage => (
        cottage.images.map(img => ({ name: cottage.type, description: cottage.description, image: img.url }))
    )).flat() : [];


    return (
        <LandingPage
            content={content}
            children={<Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                {
                    loading ? <RoomLoading isRoomManagement /> :
                        data.cottages.filter(room => room.active).map(cottage => <ReservationCottage key={cottage.id} cottage={cottage} />)
                }
            </Box>}
        />
    )
}

export default CottagesPage