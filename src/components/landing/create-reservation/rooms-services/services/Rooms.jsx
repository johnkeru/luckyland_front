import { Box, Button, Typography } from "@mui/material";


import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import Room from "./Room";
import ViewRoom from "./ViewRoom";


const Rooms = ({ handleStep }) => {
    const [viewRoom, setViewRoom] = useState();
    const [amenetiesAddOnsAndRooms, setAmenetiesAddOnsAndRooms] = useState({ amenities: [], rooms: [], addOns: [] });
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
            setDataDirectly: setAmenetiesAddOnsAndRooms,
            setLoading
        })
    }

    useEffect(() => {
        getAvailableRooms();
    }, []);

    return (
        <>
            {
                viewRoom ? <ViewRoom amenities={amenetiesAddOnsAndRooms.amenities} room={viewRoom} setViewRoom={setViewRoom} addOns={amenetiesAddOnsAndRooms.addOns} /> :
                    loading ? <RoomLoading /> :
                        amenetiesAddOnsAndRooms.rooms.length === 0 ?
                            <Box display='flex' alignItems='center' gap={2}>
                                <Typography>No rooms available on {displayDateSelected}. Try selecting another date.</Typography>
                                <Button size="small" onClick={() => handleStep(1)}>select dates.</Button>
                            </Box>
                            :
                            amenetiesAddOnsAndRooms.rooms.map(room => (
                                <Room room={room} key={room.id} setViewRoom={setViewRoom} />
                            ))
            }
        </>
    );
};

export default Rooms;

