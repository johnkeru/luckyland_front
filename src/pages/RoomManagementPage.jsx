import { Box, Button, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Rooms from '../components/room-management/Rooms';
import AddRoom from '../components/room-management/modal/AddRoom';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';

const RoomManagementPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllRoomsAvailable = (loadingOnce) => {
        basicGetCall({
            endpoint: 'api/rooms',
            setDataDirectly: setRooms,
            setLoading: loadingOnce ? setLoading : undefined
        })
    }

    useEffect(() => {
        getAllRoomsAvailable(true);
    }, [])

    return (
        <Grid>
            <Box display='flex' justifyContent='end'>
                <AddRoom
                    onSuccess={getAllRoomsAvailable}
                    button={
                        <Button variant='contained' color='success' startIcon={<IoMdAdd />} >Add Room</Button>
                    }
                />
            </Box>
            <Box my={2} bgcolor='white' p={2} border='2px solid #ddd' color={grey[800]}>
                <Box display='flex' alignItems='center' gap={2} mb={2}>
                    <Typography variant='h5' fontWeight={600}>{rooms.filter(room => room.active).length} Available Rooms</Typography>
                    <Typography>(These rooms will be displayed in the reservations section.)</Typography>
                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    <Rooms onSuccess={getAllRoomsAvailable} rooms={rooms.filter(room => room.active)} loading={loading} />
                </Box>
            </Box>

            <Box my={2} bgcolor='white' p={2} border='2px solid #ddd' color={grey[800]}>
                <Box display='flex' alignItems='center' gap={2} mb={2}>
                    <Typography variant='h5' fontWeight={600}>{rooms.filter(room => !room.active).length} Unavailable Rooms</Typography>
                    <Typography>(These rooms will not be displayed in the reservations section as they are currently unavailable.)</Typography>

                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    <Rooms onSuccess={getAllRoomsAvailable} rooms={rooms.filter(room => !room.active)} loading={loading} />
                </Box>
            </Box>

        </Grid>
    )
}

export default RoomManagementPage