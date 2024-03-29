import { Box, Button, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Rooms from '../components/room-management/Rooms';
import AddRoom from '../components/room-management/modal/AddRoom';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import RoomLoading from '../components/room-management/RoomLoading';

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
    }, [])

    return (
        <Grid>
            <Box bgcolor='white' p={2} border='2px solid #ddd' color={grey[800]}>
                <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>{loading ? 0 : data.rooms.filter(room => room.active).length} Available Rooms</Typography>
                        <Typography>(These rooms will be displayed in the reservations section.)</Typography>
                    </Box>
                    <AddRoom
                        onSuccess={getAllRooms}
                        button={
                            <Button variant='contained' color='success' startIcon={<IoMdAdd />} >Add Room</Button>
                        }
                    />
                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            <Rooms onSuccess={getAllRooms} rooms={data.rooms.filter(room => room.active)} />
                    }
                </Box>
            </Box>

            <Box my={2} bgcolor='white' p={2} border='2px solid #ddd' color={grey[800]}>
                <Box display='flex' alignItems='center' gap={2} mb={2}>
                    <Typography variant='h5' fontWeight={600}>{loading ? 0 : data.rooms.filter(room => !room.active).length} Unavailable Rooms</Typography>
                    <Typography>(These rooms will not be displayed in the reservations section as they are currently unavailable.)</Typography>

                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            <Rooms onSuccess={getAllRooms} rooms={data.rooms.filter(room => !room.active)} />
                    }
                </Box>
            </Box>

        </Grid>
    )
}

export default RoomManagementPage