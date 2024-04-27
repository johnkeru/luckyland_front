import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useCustomer from "../../../../../hooks/reservation/useCustomer";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationCottage from "./ReservationCottage";
import ReservationRoom from "./ReservationRoom";
import ViewCottage from "./ViewCottage";
import ViewRoom from "./ViewRoom";


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
                            true ? <RoomLoading /> :
                                data.rooms.length === 0 ?
                                    <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2} my={1}>
                                        <Typography>No rooms available on {displayDateSelected}. Try selecting another date.</Typography>
                                        <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                                    </Box>
                                    :
                                    <Grid container columnSpacing={2}>
                                        {data.rooms.map(room => (
                                            <ReservationRoom room={room} key={room.id} setViewRoom={setViewRoom} />
                                        ))}
                                    </Grid>


                    }

                    {
                        viewCottage ? <ViewCottage cottage={viewCottage} setViewCottage={setViewCottage} addOns={data.cottageAddOns} /> :
                            true ? <RoomLoading /> :
                                data.cottages.length === 0 ?
                                    <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2} my={1}>
                                        <Typography>No cottages available on {displayDateSelected}. Try selecting another date.</Typography>
                                        <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                                    </Box>
                                    :
                                    <Grid container columnSpacing={2}>
                                        {data.cottages.map(cottage => (
                                            <ReservationCottage key={cottage.id} cottage={cottage} setViewCottage={setViewCottage} />
                                        ))}
                                    </Grid>

                    }
                </>
                    :
                    accommodationType === 'rooms' ? <>
                        {
                            viewRoom ? <ViewRoom room={viewRoom} setViewRoom={setViewRoom} addOns={data.roomAddOns} /> :
                                true ? <RoomLoading /> :
                                    data.rooms.length === 0 ?
                                        <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2} my={1}>
                                            <Typography>No rooms available on {displayDateSelected}. Try selecting another date.</Typography>
                                            <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                                        </Box>
                                        :
                                        <Grid container columnSpacing={2}>
                                            {
                                                data.rooms.map(room => (
                                                    <ReservationRoom room={room} key={room.id} setViewRoom={setViewRoom} />
                                                ))
                                            }
                                        </Grid>
                        }
                    </> : <>
                        {
                            viewCottage ? <ViewCottage cottage={viewCottage} setViewCottage={setViewCottage} addOns={data.cottageAddOns} /> :
                                true ? <RoomLoading /> :
                                    data.cottages.length === 0 ?
                                        <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2} my={1}>
                                            <Typography>No cottages available on {displayDateSelected}. Try selecting another date.</Typography>
                                            <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                                        </Box>
                                        :
                                        <Grid container columnSpacing={2}>
                                            {
                                                data.cottages.map(cottage => (
                                                    <ReservationCottage key={cottage.id} cottage={cottage} setViewCottage={setViewCottage} />
                                                ))
                                            }
                                        </Grid>
                        }
                    </>
            }
        </>
    );
};

export default Suggestions;

