import { Box, Grid, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import RoomLoading from '../../room-management/RoomLoading';
import LandingCottages from './cottagesAndRooms/LandingCottages';
import LandingRoom from './cottagesAndRooms/LandingRoom';

const FeaturedCottagesAndRooms = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/active-rooms',
            setDataDirectly: setData,
            setLoading
        })
    }, []);

    return (
        <Box width='80%' m='auto'>
            <Typography variant="h4" pb={1}>Featured Cottages and Rooms</Typography>
            <Box sx={{ width: '100px', height: '5px', bgcolor: 'gray', mb: 2 }} />

            <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                {
                    loading ? <RoomLoading isRoomManagement /> :
                        data.rooms.map(room => <LandingRoom room={room} />)
                }
            </Box>
            {/* <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%'>
                {
                    loading ? <RoomLoading isRoomManagement /> :
                        <LandingCottages cottages={data.cottages} />
                }
            </Box> */}
        </Box>
    );
}

export default FeaturedCottagesAndRooms;

