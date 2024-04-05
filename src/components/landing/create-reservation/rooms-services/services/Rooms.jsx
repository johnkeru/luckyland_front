import { Box, Button, Typography } from "@mui/material";


import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import Room from "./Room";
import ViewRoom from "./ViewRoom";
import { grey } from "@mui/material/colors";


const Rooms = ({ handleStep }) => {
    const [viewRoom, setViewRoom] = useState();
    const [RoomsAndAddOns, setRoomsAndAddOns] = useState({ rooms: [], addOns: [] });
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

    useEffect(() => {
        getAvailableRooms();
    }, []);

    return (
        <>
            {
                viewRoom ? <ViewRoom room={viewRoom} setViewRoom={setViewRoom} addOns={RoomsAndAddOns.addOns} /> :
                    loading ? <RoomLoading /> :
                        RoomsAndAddOns.rooms.length === 0 ?
                            <Box display='flex' alignItems='center' gap={2} bgcolor={grey[200]} p={2} borderRadius={2} my={1}>
                                <Typography>No rooms available on {displayDateSelected}. Try selecting another date.</Typography>
                                <Button size="small" onClick={() => handleStep(1)}>re-select dates.</Button>
                            </Box>
                            :
                            RoomsAndAddOns.rooms.map(room => (
                                <Room room={room} key={room.id} setViewRoom={setViewRoom} />
                            ))
            }
        </>
    );
};

export default Rooms;

