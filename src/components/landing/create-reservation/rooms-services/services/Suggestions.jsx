import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationRoom from "./ReservationRoom";
import ViewRoom from "./ViewRoom";
import useCustomer from "../../../../../hooks/reservation/useCustomer";
import ViewCottage from "./ViewCottage";
import ReservationCottage from "./ReservationCottage";
import { grey } from "@mui/material/colors";


const Suggestions = ({ handleStep }) => {
    const { accommodationType, customer } = useCustomer();
    const [viewRoom, setViewRoom] = useState();
    const [viewCottage, setViewCottage] = useState();
    const [data, setData] = useState({ rooms: [], roomAddOns: [], cottages: [], cottageAddOns: [], });
    const [loading, setLoading] = useState(true);

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`


    const getAvailableRooms = () => {
        basicGetCall({
            method: 'post',
            endpoint: 'api/reservations/available-suggestions',
            body: {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
                totalGuests: customer.guests,
            },
            setDataDirectly: setData,
            setLoading
        })
    }

    useEffect(() => {
        getAvailableRooms();
    }, []);

    return (
        <>
            {
                accommodationType === 'both' ? <>
                    {
                        viewRoom ? <ViewRoom room={viewRoom} setViewRoom={setViewRoom} addOns={data.roomAddOns} /> :
                            loading ? <RoomLoading /> :
                                data.rooms.length === 0 ?
                                    <Box display='flex' alignItems='center' gap={2} bgcolor={grey[200]} p={2} borderRadius={2} my={1}>
                                        <Typography>No rooms suggestions available on {displayDateSelected}. Try selecting another date.</Typography>
                                        <Button size="small" onClick={() => handleStep(1)}>re-select dates.</Button>
                                    </Box>
                                    :
                                    data.rooms.map(room => (
                                        <ReservationRoom room={room} key={room.id} setViewRoom={setViewRoom} />
                                    ))
                    }

                    {
                        viewCottage ? <ViewCottage cottage={viewCottage} setViewCottage={setViewCottage} addOns={data.cottageAddOns} /> :
                            loading ? <RoomLoading /> :
                                data.cottages.length === 0 ?
                                    <Box display='flex' alignItems='center' gap={2} bgcolor={grey[200]} p={2} borderRadius={2} my={1}>
                                        <Typography>No cottages suggestions available on {displayDateSelected}. Try selecting another date.</Typography>
                                        <Button size="small" onClick={() => handleStep(1)}>re-select dates.</Button>
                                    </Box>
                                    :
                                    data.cottages.map(cottage => (
                                        <ReservationCottage key={cottage.id} cottage={cottage} setViewCottage={setViewCottage} />
                                    ))
                    }
                </>
                    :
                    accommodationType === 'rooms' ? <>
                        {
                            viewRoom ? <ViewRoom room={viewRoom} setViewRoom={setViewRoom} addOns={data.roomAddOns} /> :
                                loading ? <RoomLoading /> :
                                    data.rooms.length === 0 ?
                                        <Box display='flex' alignItems='center' gap={2} bgcolor={grey[200]} p={2} borderRadius={2} my={1}>
                                            <Typography>No rooms suggestions available on {displayDateSelected}. Try selecting another date.</Typography>
                                            <Button size="small" onClick={() => handleStep(1)}>re-select dates.</Button>
                                        </Box>
                                        :
                                        data.rooms.map(room => (
                                            <ReservationRoom room={room} key={room.id} setViewRoom={setViewRoom} />
                                        ))
                        }
                    </> : <>
                        {
                            viewCottage ? <ViewCottage cottage={viewCottage} setViewCottage={setViewCottage} addOns={data.cottageAddOns} /> :
                                loading ? <RoomLoading /> :
                                    data.cottages.length === 0 ?
                                        <Box display='flex' alignItems='center' gap={2} bgcolor={grey[200]} p={2} borderRadius={2} my={1}>
                                            <Typography>No cottages suggestions available on {displayDateSelected}. Try selecting another date.</Typography>
                                            <Button size="small" onClick={() => handleStep(1)}>re-select dates.</Button>
                                        </Box>
                                        :
                                        data.cottages.map(cottage => (
                                            <ReservationCottage key={cottage.id} cottage={cottage} setViewCottage={setViewCottage} />
                                        ))
                        }
                    </>
            }
        </>
    );
};

export default Suggestions;

