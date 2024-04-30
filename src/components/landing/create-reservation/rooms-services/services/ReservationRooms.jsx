import { Box, Button, Grid, Typography } from "@mui/material";


import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationRoom from "./ReservationRoom";
import ViewRoom from "./ViewRoom";


const ReservationRooms = ({ handleStep, defaultValue }) => {
    const [viewRoom, setViewRoom] = useState();
    const [roomsAndAddOns, setRoomsAndAddOns] = useState({ rooms: [], addOns: [] });
    const [loading, setLoading] = useState(true);

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`

    const getAvailableRooms = () => {
        basicGetCall({
            method: 'post',
            endpoint: 'api/reservations/available-rooms',
            body: {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
            },
            setDataDirectly: setRoomsAndAddOns,
            setLoading
        })
    }

    const setDefaultValue = (data) => {
        setRoomsAndAddOns(data.roomsAndAddOns);
        setLoading(data.loading);
    }

    useEffect(() => {
        !defaultValue ? getAvailableRooms() : setDefaultValue(defaultValue);
    }, [defaultValue]);

    return (
        <>
            {
                viewRoom ? <ViewRoom room={viewRoom} setViewRoom={setViewRoom} addOns={roomsAndAddOns.addOns} /> :
                    loading ? <RoomLoading tiles={5} /> :
                        roomsAndAddOns.rooms.length === 0 ?
                            <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2} my={1}>
                                <Typography>No rooms available on {displayDateSelected}. Try selecting another date.</Typography>
                                <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                            </Box>
                            :
                            <Grid container columnSpacing={2}>
                                {
                                    roomsAndAddOns.rooms.map(room => (
                                        <ReservationRoom room={room} key={room.id} setViewRoom={setViewRoom} />
                                    ))
                                }
                            </Grid>

            }
        </>
    );
};

export default ReservationRooms;

