import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationCottage from "./ReservationCottage";

const ReservationCottages = ({ handleStep, defaultValue, inLandingPage, isOther }) => {
    const [cottagesAndAddOns, setCottagesAndAddOns] = useState({ addOns: [], cottages: [] });
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('');

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`

    const getAvailableCottages = () => {
        basicGetCall({
            method: 'post',
            endpoint: `api/reservations/available-${isOther ? 'others' : 'cottages'}`,
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

    const cottageTypes = [...new Set(loading ? [] : cottagesAndAddOns.cottages.map(cottage => cottage.type))];

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    const filteredCottages = selectedType ? cottagesAndAddOns.cottages.filter(cottage => cottage.type === selectedType) : cottagesAndAddOns.cottages;

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
                {loading ? `Searching ${isOther ? 'others' : 'cottages'} available...` : `${filteredCottages.length} ${isOther ? 'Others' : 'Cottages'} Available`}
            </Typography>
            {
                loading ? <RoomLoading tiles={5} /> :
                    cottagesAndAddOns.cottages.length === 0 ?
                        <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} p={2} borderRadius={2} my={1}>
                            <Typography>No {isOther ? 'others' : 'cottages'} available on {displayDateSelected}. Try selecting another date.</Typography>
                            <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                        </Box>
                        :
                        <Grid width={'100%'}>
                            <Box display='flex' justifyContent='center' gap={1} alignItems='center' flexWrap='wrap' my={2} >
                                <Button
                                    variant={selectedType === '' ? 'contained' : 'outlined'}
                                    onClick={() => handleTypeChange('')}
                                >
                                    All
                                </Button>
                                {cottageTypes.map((type) => (
                                    <Button
                                        key={type}
                                        variant={selectedType === type ? 'contained' : 'outlined'}
                                        onClick={() => handleTypeChange(type)}
                                    >
                                        {type}
                                    </Button>
                                ))}
                            </Box>
                            {
                                filteredCottages.map(cottage => (
                                    <ReservationCottage
                                        isOther={isOther}
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
