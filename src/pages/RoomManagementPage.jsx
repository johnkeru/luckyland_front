import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Room from '../components/room-management/Room';
import RoomLoading from '../components/room-management/RoomLoading';
import AddRoom from '../components/room-management/modal/AddRoom';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import RoomTypeTable from '../components/room-management/RoomTypeTable';
import AddRoomType from '../components/room-management/modal/AddRoomType';

const RoomManagementPage = () => {
    // data has {rooms, amenities}
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAllRooms = (loadingOnce) => {
        basicGetCall({
            endpoint: 'api/rooms',
            setDataDirectly: setData,
            setLoading: loadingOnce ? setLoading : undefined
        })
    }

    useEffect(() => {
        getAllRooms(true);
    }, []);

    const uniqueRoomTypes = new Set();
    const uniqueRooms = [];

    if (!loading) {
        data.rooms.forEach(room => {
            if (!uniqueRoomTypes.has(room.type)) {
                uniqueRoomTypes.add(room.type);
                uniqueRooms.push(room);
            }
        });
    }

    return (
        <Grid>
            <Box bgcolor='background.paper' p={2} mb={1.5} border='2px solid #ddd' display='flex' flexDirection='column' alignItems='start' gap={2}>
                <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>Room Variants</Typography>
                        <Typography>(Edit rooms at once by type or create new one)</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap={2}>
                        <AddRoomType
                            onSuccess={getAllRooms}
                            button={
                                <Button variant='contained' startIcon={<IoMdAdd />} >Create new type of room</Button>
                            }
                        />
                        <AddRoom
                            onSuccess={getAllRooms}
                            button={
                                <Button variant='contained' color='success' startIcon={<IoMdAdd />} >Add Room</Button>
                            }
                        />
                    </Box>
                </Box>
                {loading ? (
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={100} />
                ) : (
                    <RoomTypeTable onSuccess={getAllRooms} rooms={uniqueRooms} />
                )}
            </Box>

            <Box bgcolor='background.paper' p={2} mb={1.5} border='2px solid #ddd'>
                <Box display='flex' alignItems='center' justifyContent='space-between' mb={1.5}>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>{loading ? 0 : data.rooms.filter(room => room.active).length} Available Rooms</Typography>
                        <Typography>(These rooms will be displayed in the reservations section.)</Typography>
                    </Box>
                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            data.rooms.filter(room => room.active).map(room => <Room key={room.id} onSuccess={getAllRooms} room={room} />)
                    }
                </Box>
            </Box>

            <Box mb={1.5} bgcolor='background.paper' p={2} border='2px solid #ddd'>
                <Box display='flex' alignItems='center' gap={2} mb={1.5}>
                    <Typography variant='h5' fontWeight={600}>{loading ? 0 : data.rooms.filter(room => !room.active).length} Unavailable Rooms</Typography>
                    <Typography>(These rooms will not be displayed in the reservations section as they are currently unavailable.)</Typography>

                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            data.rooms.filter(room => !room.active).map(room => <Room key={room.id} onSuccess={getAllRooms} room={room} />)
                    }
                </Box>
            </Box>

        </Grid>
    )
}

export default RoomManagementPage