import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReservationRooms from '../components/landing/create-reservation/rooms-services/services/ReservationRooms';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import LandingPage from './LandingPage';

function getUniqueRoomsByType(data) {
    const roomTypesMap = new Map();
    const uniqueRooms = [];
    data.rooms.forEach(room => {
        if (!roomTypesMap.has(room.type)) {
            roomTypesMap.set(room.type, room);
        }
    });
    roomTypesMap.forEach(room => {
        uniqueRooms.push(room);
    });
    return uniqueRooms;
}

function getHeroData(roomTypesData) {
    let heroData = [];
    roomTypesData.map(roomType => (
        roomType.images.map(image => {
            heroData.push({
                name: roomType.type + ' Rooms',
                description: roomType.description,
                image: image.url
            });
        })
    ));

    return heroData;
}

const RoomsPage = () => {
    const [roomsAndAddOns, setRoomsAndAddOns] = useState({ rooms: [], addOns: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/rooms',
            setDataDirectly: setRoomsAndAddOns,
            setLoading,
        });
    }, []);

    const heroDataParam = getUniqueRoomsByType(roomsAndAddOns || []);
    const heroDataContent = getHeroData(heroDataParam) || [];
    return (
        <Box>
            <LandingPage isOtherPage content={heroDataContent} loading={loading} children={
                <Box display="flex" flexDirection="column" mx="auto" py={5} width={{ xs: '100%', md: '85%', lg: '80%' }}>
                    <Typography
                        variant="h2"
                        color='primary'
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 7 // Adding marginBottom to sx
                        }}
                    >
                        LuckyLand Resort's Rooms
                    </Typography>
                    <ReservationRooms defaultValue={{ roomsAndAddOns, loading }} />
                </Box>
            } />
        </Box>
    )
}

export default RoomsPage