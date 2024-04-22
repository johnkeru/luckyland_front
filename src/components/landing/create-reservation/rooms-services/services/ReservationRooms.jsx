import { Box, Button, Typography } from "@mui/material";


import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationRoom from "./ReservationRoom";
import ViewRoom from "./ViewRoom";
import { grey } from "@mui/material/colors";


const ReservationRooms = ({ handleStep, endpoint = 'api/reservations/available-rooms', inLanding = false }) => {
    const [viewRoom, setViewRoom] = useState();
    const [RoomsAndAddOns, setRoomsAndAddOns] = useState({ rooms: [], addOns: [] });
    const [loading, setLoading] = useState(true);

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`

    const getAvailableRooms = () => {
        basicGetCall({
            method: inLanding ? 'get' : 'post',
            endpoint,
            body: inLanding ? null : {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
            },
            setDataDirectly: setRoomsAndAddOns,
            setLoading
        })
    }

    useEffect(() => {
        getAvailableRooms();
    }, []);

    return (
        <>
            {
                viewRoom ? <ViewRoom room={viewRoom} setViewRoom={setViewRoom} addOns={RoomsAndAddOns.addOns} /> :
                    loading ? <RoomLoading /> :
                        RoomsAndAddOns.rooms.length === 0 ?
                            <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2} my={1}>
                                <Typography>No rooms available on {displayDateSelected}. Try selecting another date.</Typography>
                                <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                            </Box>
                            :
                            <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={1}>
                                {
                                    RoomsAndAddOns.rooms.map(room => (
                                        <ReservationRoom room={room} key={room.id} setViewRoom={setViewRoom} />
                                    ))
                                }
                            </Box>

            }
        </>
    );
};

export default ReservationRooms;

