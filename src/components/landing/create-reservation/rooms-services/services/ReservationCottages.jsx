import { Box, Button, Typography } from "@mui/material";


import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationCottage from "./ReservationCottage";
import ViewCottage from "./ViewCottage";
import { grey } from "@mui/material/colors";


const ReservationCottages = ({ handleStep }) => {
    const [viewCottage, setViewCottage] = useState();
    const [cottagesAndAddOns, setCottagesAndAddOns] = useState({ addOns: [], cottages: [] });
    const [loading, setLoading] = useState(true);

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`


    const getAvailableRooms = () => {
        basicGetCall({
            method: 'post',
            endpoint: 'api/reservations/available-cottages',
            body: {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
            },
            setDataDirectly: setCottagesAndAddOns,
            setLoading
        })
    }

    useEffect(() => {
        getAvailableRooms();
    }, []);

    return (
        <>
            {
                viewCottage ? <ViewCottage cottage={viewCottage} setViewCottage={setViewCottage} addOns={cottagesAndAddOns.addOns} /> :
                    loading ? <RoomLoading /> :
                        cottagesAndAddOns.cottages.length === 0 ?
                            <Box display='flex' alignItems='center' gap={2} bgcolor={grey[200]} p={2} borderRadius={2} my={1}>
                                <Typography>No cottages available on {displayDateSelected}. Try selecting another date.</Typography>
                                <Button size="small" onClick={() => handleStep(1)}>re-select dates.</Button>
                            </Box>
                            :
                            cottagesAndAddOns.cottages.map(cottage => (
                                <ReservationCottage key={cottage.id} cottage={cottage} setViewCottage={setViewCottage} />
                            ))
            }
        </>
    );
};

export default ReservationCottages;
