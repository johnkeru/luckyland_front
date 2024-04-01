import { Box, Button, Typography } from "@mui/material";


import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import Cottage from "./Cottage";
import ViewCottage from "./ViewCottage";


const Cottages = ({ handleStep }) => {
    const [viewCottage, setViewCottage] = useState();
    const [addOnsAndCottages, setAddOnsAndCottages] = useState({ amenities: [], cottages: [] });
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
            setDataDirectly: setAddOnsAndCottages,
            setLoading
        })
    }

    useEffect(() => {
        getAvailableRooms();
    }, []);

    return (
        <>
            {
                viewCottage ? <ViewCottage cottage={viewCottage} setViewCottage={setViewCottage} addOns={addOnsAndCottages.addOns} /> :
                    loading ? <RoomLoading /> :
                        addOnsAndCottages.cottages.length === 0 ?
                            <Box display='flex' alignItems='center' gap={2}>
                                <Typography>No cottages available on {displayDateSelected}. Try selecting another date.</Typography>
                                <Button size="small" onClick={() => handleStep(1)}>select dates.</Button>
                            </Box>
                            :
                            addOnsAndCottages.cottages.map(cottage => (
                                <Cottage key={cottage.id} cottage={cottage} setViewCottage={setViewCottage} />
                            ))
            }
        </>
    );
};

export default Cottages;

