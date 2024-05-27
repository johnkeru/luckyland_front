import { Box, Button, Grid, Typography } from "@mui/material";


import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationCottage from "./ReservationCottage";

const ReservationCottages = ({ handleStep, defaultValue, inLandingPage }) => {
    const [cottagesAndAddOns, setCottagesAndAddOns] = useState({ addOns: [], cottages: [] });
    const [loading, setLoading] = useState(true);

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`

    const getAvailableCottages = () => {
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

    const setDefaultValue = (data) => {
        setCottagesAndAddOns(data.cottagesAndAddOns);
        setLoading(data.loading);
    }

    useEffect(() => {
        !defaultValue ? getAvailableCottages() : setDefaultValue(defaultValue);
    }, [defaultValue]);

    return (
        <>
            <Typography
                variant={'h4'}
                color={'#333'}
                py={2}
                px={{ xs: 2, sm: 0 }}
                sx={{
                    width: '100%',
                    color: 'primary.main',
                    textAlign: 'center', // Center-align the text
                    fontWeight: 'bold', // Make the text bold
                    fontFamily: 'Georgia, serif', // Choose a luxurious serif font
                    textTransform: 'uppercase', // Uppercase text
                    letterSpacing: '2px', // Spacing between letters
                    fontSize: '2.5rem', // Increase font size for a luxurious feel
                    lineHeight: '1.2', // Adjust line height for readability
                    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)', // Add subtle text shadow
                }}
            >
                {loading ? 'Searching cottages available...' : `${cottagesAndAddOns.cottages.length} Cottages Available`}
            </Typography>
            {
                loading ? <RoomLoading tiles={5} /> :
                    cottagesAndAddOns.cottages.length === 0 ?
                        <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} p={2} borderRadius={2} my={1}>
                            <Typography>No cottages available on {displayDateSelected}. Try selecting another date.</Typography>
                            <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                        </Box>
                        :
                        <Grid width={'100%'}>
                            {
                                cottagesAndAddOns.cottages.map(cottage => (
                                    <ReservationCottage
                                        inLandingPage={inLandingPage}
                                        key={cottage.id}
                                        cottage={cottage}
                                        addOns={cottagesAndAddOns.addOns}
                                    />
                                ))
                            }
                        </Grid>

            }
        </>
    );
};

export default ReservationCottages;

