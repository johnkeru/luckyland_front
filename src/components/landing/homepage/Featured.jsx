import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import RoomLoading from '../../room-management/RoomLoading';
import LandingCottage from './cottagesAndRooms/LandingCottage';
import LandingRoom from './cottagesAndRooms/LandingRoom';

const Featured = ({ pathname }) => {
    const filterTitle = pathname === '/rooms' ? 'Cottages' : pathname === '/cottages' ? 'Rooms' : 'Rooms & Cottages';
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
        <>
            <Box width='fit-content' mx='auto'>
                <Typography variant="h3" mt={3} pb={2} >Featured {filterTitle}</Typography>
                <Box sx={{ width: '100px', height: '5px', bgcolor: 'gray', mb: 7, }} />
            </Box>

            <Box display='flex' flexDirection='column' gap={4}>
                {
                    pathname === '/rooms' ?
                        <>
                            <Box>
                                <Typography variant="h4" pb={1}>Cottages</Typography>
                                <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                                    {
                                        loading ? <RoomLoading isRoomManagement /> :
                                            data.cottages.map(cottage => <LandingCottage key={cottage.id} cottage={cottage} cottageCounts={data.cottage_counts} />)
                                    }
                                </Box>
                            </Box>
                        </> :
                        pathname === '/cottages' ?
                            <>
                                <Box>
                                    <Typography variant="h4" pb={1}>Rooms</Typography>
                                    <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                                        {
                                            loading ? <RoomLoading isRoomManagement /> :
                                                data.rooms.map(room => <LandingRoom key={room.id} room={room} roomCounts={data.room_counts} />)
                                        }
                                    </Box>
                                </Box>
                            </> :
                            <>
                                <Box>
                                    <Typography variant="h4" pb={1}>Rooms</Typography>
                                    <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                                        {
                                            loading ? <RoomLoading isRoomManagement /> :
                                                data.rooms.map(room => <LandingRoom key={room.id} room={room} roomCounts={data.room_counts} />)
                                        }
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="h4" pb={1}>Cottages</Typography>
                                    <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                                        {
                                            loading ? <RoomLoading isRoomManagement /> :
                                                data.cottages.map(cottage => <LandingCottage key={cottage.id} cottage={cottage} cottageCounts={data.cottage_counts} />)
                                        }
                                    </Box>
                                </Box>
                            </>
                }
            </Box>
        </>
    );
}

export default Featured;

