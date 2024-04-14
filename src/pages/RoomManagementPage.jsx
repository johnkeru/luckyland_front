import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Room from '../components/room-management/Room';
import RoomLoading from '../components/room-management/RoomLoading';
import AddRoom from '../components/room-management/modal/AddRoom';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import RoomTypeTable from '../components/room-management/RoomTypeTable';
import AddAndEditRoomType from '../components/room-management/modal/AddAndEditRoomType';
import useTypes from '../hooks/rooms/useTypes';

const RoomManagementPage = () => {
    const [rooms, setRooms] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setTypes } = useTypes();

    const getAllRooms = (loadingOnce) => {
        basicGetCall({
            endpoint: 'api/rooms',
            setDataDirectly: setRooms,
            setLoading: loadingOnce ? setLoading : undefined
        });
    }
    useEffect(() => {
        getAllRooms(true);
        getTypes();
    }, []);

    const getTypes = (loadingOnce) => {
        basicGetCall({
            endpoint: 'api/rooms/types',
            setDataDirectly: (data) => {
                setTypes(data.map(typ => ({ type: typ.type, id: typ.id })))
                setRoomTypes(data);
            },
            setLoading: loadingOnce ? setLoading : undefined
        });
    }

    const onSuccess = () => {
        getAllRooms();
        getTypes();
    }

    return (
        <Grid>

            <Box bgcolor='background.white' borderRadius={2} p={2} mb={1.5} display='flex' ml='auto' gap={2} alignItems='center' justifyContent='end'>
                <Typography variant='h5' fontWeight={700}>
                    Room Module
                </Typography>
                <Box display='flex' ml='auto' gap={2} justifyContent='end'>
                    <AddAndEditRoomType
                        onSuccess={onSuccess}
                        button={
                            <Button variant='contained' startIcon={<IoMdAdd />} >Create new type of room</Button>
                        }
                    />
                    <AddRoom
                        onSuccess={onSuccess}
                        button={
                            <Button variant='contained' color='success' startIcon={<IoMdAdd />} >Add Room</Button>
                        }
                    />
                </Box>
            </Box>

            <Box bgcolor='background.white' borderRadius={2} p={2} mb={1.5} display='flex' flexDirection='column' alignItems='start' gap={2}>
                <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>Room Variants</Typography>
                        <Typography>(Edit rooms at once by type)</Typography>
                    </Box>
                </Box>

                {
                    loading ?
                        <Skeleton animation="wave" variant="rectangular" width="100%" height={100} /> :
                        <RoomTypeTable onSuccess={onSuccess} roomTypes={roomTypes} />
                }

            </Box>

            <Box bgcolor='background.white' borderRadius={2} p={2} mb={1.5}>
                <Box display='flex' alignItems='center' justifyContent='space-between' mb={1.5}>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>{loading ? 0 : rooms.filter(room => room.active).length} Available Rooms</Typography>
                        <Typography>(These rooms will be displayed in the reservations section.)</Typography>
                    </Box>
                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            rooms.filter(room => room.active).map(room => <Room key={room.id} onSuccess={onSuccess} room={room} />)
                    }
                </Box>
            </Box>

            <Box mb={1.5} bgcolor='background.white' borderRadius={2} p={2}>
                <Box display='flex' alignItems='center' gap={2} mb={1.5}>
                    <Typography variant='h5' fontWeight={600}>{loading ? 0 : rooms.filter(room => !room.active).length} Unavailable Rooms</Typography>
                    <Typography>(These rooms will not be displayed in the reservations section as they are currently unavailable.)</Typography>

                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            rooms.filter(room => !room.active).map(room => <Room key={room.id} onSuccess={onSuccess} room={room} />)
                    }
                </Box>
            </Box>

        </Grid>
    )
}

export default RoomManagementPage