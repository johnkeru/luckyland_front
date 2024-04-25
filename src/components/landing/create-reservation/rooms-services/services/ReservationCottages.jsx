import { Box, Button, Typography } from "@mui/material";


import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationCottage from "./ReservationCottage";
import ViewCottage from "./ViewCottage";


const ReservationCottages = ({ handleStep, endpoint = 'api/reservations/available-cottages', inLanding = false }) => {
    const [viewCottage, setViewCottage] = useState();
    const [cottagesAndAddOns, setCottagesAndAddOns] = useState({ addOns: [], cottages: [] });
    const [loading, setLoading] = useState(true);

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`

    const getAvailableCottages = () => {
        basicGetCall({
            method: inLanding ? 'get' : 'post',
            endpoint,
            body: inLanding ? null : {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
            },
            setDataDirectly: setCottagesAndAddOns,
            setLoading
        })
    }

    useEffect(() => {
        getAvailableCottages();
    }, []);

    return (
        <>
            {
                viewCottage ? <ViewCottage cottage={viewCottage} setViewCottage={setViewCottage} addOns={cottagesAndAddOns.addOns} /> :
                    loading ? <RoomLoading /> :
                        cottagesAndAddOns.cottages.length === 0 ?
                            <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2} my={1}>
                                <Typography>No cottages available on {displayDateSelected}. Try selecting another date.</Typography>
                                <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                            </Box>
                            :
                            <Box px={{ xs: 2, md: 0 }} display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={1}>
                                {
                                    cottagesAndAddOns.cottages.map(cottage => (
                                        <ReservationCottage key={cottage.id} cottage={cottage} setViewCottage={setViewCottage} />
                                    ))
                                }
                            </Box>

            }
        </>
    );
};

export default ReservationCottages;

