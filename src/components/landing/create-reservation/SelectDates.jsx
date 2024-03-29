
import { Box, Button, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { GrSchedulePlay } from "react-icons/gr";
import useBookingSummaryReservation from '../../../hooks/useBookingSummaryReservation';
import { formalFormatDate, simpleFormatMonth } from '../../../utility_functions/formatTime';
import Morethan30DaysModal from './modal/MoreThan30Days';
import Calendar from './booking-calendar/custom-calendar/CustomDateRangeCalendar';

function SelectDates({ handleNext, disabledDates }) {
    const { setSelectedDate, selectedDate } = useBookingSummaryReservation();

    const [isMoreThan30Days, setIsMoreThan30Days] = useState(false);
    const handleCloseIsMoreThan30Days = () => setIsMoreThan30Days(false);

    const handleNextStep = () => {
        if (selectedDate.duration > 30) {
            setIsMoreThan30Days(true);
        } else {
            handleNext();
        }
    }

    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    const [selectedRange, setSelectedRange] = useState({ start: today, end: today });

    useEffect(() => {
        // Calculate duration in days
        const durationInDays = Math.floor((selectedRange.end - selectedRange.start) / (1000 * 60 * 60 * 24));

        setSelectedDate({
            checkIn: simpleFormatMonth(selectedRange.start),
            checkOut: simpleFormatMonth(selectedRange.end),
            duration: durationInDays,
        });
    }, [selectedRange]);

    const isButtonDisabled = () => {
        // Calculate duration in days
        const durationInDays = Math.floor((selectedRange.end - selectedRange.start) / (1000 * 60 * 60 * 24));

        // Return true if duration is less than or equal to 0
        return durationInDays <= 0;
    };


    const [defaultValue, setDefaultValue] = useState(() => null);
    console.log(defaultValue)


    return (
        <>
            {isMoreThan30Days ? <Morethan30DaysModal
                handleCloseIsMoreThan30Days={handleCloseIsMoreThan30Days}
                isMoreThan30Days={isMoreThan30Days} />
                : undefined}

            <Grid>

                <Calendar
                    disabledDates={disabledDates}
                    defaultValue={defaultValue}
                    setDefaultValue={setDefaultValue}
                />

                <Box pt={2} mb={2} display='flex' justifyContent='space-between' alignItems='center'>
                    <Box>
                        <Typography variant="h6" color="textSecondary" gutterBottom>Legends: </Typography>
                        <Box display='flex' gap={5}>
                            <Box display='flex' gap={1} alignItems='center'>
                                <Box bgcolor={grey[300]} width='30px' height='30px' display='flex' justifyContent='center' alignItems='center'>
                                    <Typography variant='body2' sx={{ fontSize: '12px', color: 'white' }}>12</Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">Unavailable</Typography>
                            </Box>
                            <Box display='flex' gap={1} alignItems='center'>
                                <Box border='1px solid #ddd' width='30px' height='30px' display='flex' justifyContent='center' alignItems='center'>
                                    <Typography variant='body2' sx={{ fontSize: '12px', color: grey[500] }}>12</Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">Vacants</Typography>
                            </Box>
                            <Box display='flex' gap={1} alignItems='center'>
                                <Box bgcolor='lightblue' width='30px' height='30px' display='flex' justifyContent='center' alignItems='center'>
                                    <Typography variant='body2' sx={{ fontSize: '12px', color: 'white' }}>12</Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">Selecting Dates </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" color="textSecondary" gutterBottom>Your schedule: </Typography>
                        <Box display='flex' alignItems='center' gap={1}>
                            <GrSchedulePlay color='gray' />
                            <Typography variant="body2" color="textSecondary">{formalFormatDate(selectedRange.start)}</Typography>
                            -
                            {selectedRange.end > new Date() && (
                                <Typography variant="body2" color="textSecondary">
                                    {formalFormatDate(selectedRange.end)}
                                </Typography>
                            )}

                        </Box>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    disabled={isButtonDisabled()}
                    color='info'
                    size='large'
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleNextStep()}
                >
                    Continue
                </Button>

            </Grid>
        </>
    );
}

export default SelectDates;
