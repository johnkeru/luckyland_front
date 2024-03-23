
import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { DateRange, } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { blue, grey } from '@mui/material/colors';
import Morethan30DaysModal from './modal/MoreThan30Days';
import useBookingSummaryReservation from '../../../hooks/useBookingSummaryReservation';
import BookingSummary from './BookingSummary';
import { simpleFormatMonth } from '../../../utility_functions/formatTime';

function BookingCalendar4({ handleNext }) {
    const { setSelectedDate, selectedDate, resetAll } = useBookingSummaryReservation();


    const [isMoreThan30Days, setIsMoreThan30Days] = useState(false);
    const handleCloseOpenChildModal = () => setIsMoreThan30Days(false);

    const [state, setState] = useState([
        {
            startDate: (selectedDate && selectedDate.checkIn) ? new Date(selectedDate.checkIn) : new Date(),
            endDate: (selectedDate && selectedDate.checkOut) ? new Date(selectedDate.checkOut) : new Date(),
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges) => {
        let duration = moment(ranges.selection.endDate).diff(moment(ranges.selection.startDate), 'days');
        setSelectedDate({
            checkIn: simpleFormatMonth(ranges.selection.startDate),
            checkOut: simpleFormatMonth(ranges.selection.endDate),
            duration,
        });
        setState([ranges.selection]);
    };

    const isButtonDisabled = () => {
        if (!state[0]) return true; // If no date range is selected
        return moment(state[0].endDate).diff(moment(state[0].startDate), 'days') === 0;
    };

    const disabledDates = [];


    const handleNextStep = () => {
        if (selectedDate.duration > 30) {
            setIsMoreThan30Days(true);
        } else {
            handleNext();
        }
    }

    return (
        <>
            {isMoreThan30Days ? <Morethan30DaysModal
                handleCloseOpenChildModal={handleCloseOpenChildModal}
                isMoreThan30Days={isMoreThan30Days} />
                : undefined}

            <Grid>
                <Box display='flex' gap={2}>
                    <DateRange
                        onChange={handleSelect}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                        minDate={new Date()}
                        disabledDates={disabledDates} // disable specific dates
                    />
                    <BookingSummary />
                </Box>


                <Box borderTop='1px solid #ddd' mb={2}>
                    <Typography variant="h6" color="textSecondary" gutterBottom>Legends: </Typography>
                    <Box display='flex' gap={5}>

                        <Box display='flex' gap={1} alignItems='center'>
                            <Box bgcolor={grey[300]} borderRadius={5} width='30px' height='30px' display='flex' justifyContent='center' alignItems='center'>
                                <Typography variant='body2' sx={{ fontSize: '12px', color: grey[500] }}>12</Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary">Unavailable</Typography>
                        </Box>
                        <Box display='flex' gap={1} alignItems='center'>
                            <Box border='1px solid #ddd' borderRadius={5} width='30px' height='30px' display='flex' justifyContent='center' alignItems='center'>
                                <Typography variant='body2' sx={{ fontSize: '12px', color: grey[500] }}>12</Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary">Vacants</Typography>
                        </Box>
                        <Box display='flex' gap={1} alignItems='center'>
                            <Box bgcolor={blue[500]} borderRadius={5} width='30px' height='30px' display='flex' justifyContent='center' alignItems='center'>
                                <Typography variant='body2' sx={{ fontSize: '12px', color: grey[200] }}>12</Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary">Selecting Dates </Typography>
                        </Box>
                    </Box>
                </Box>

                {state[0] && (
                    <Button
                        variant="contained"
                        disabled={isButtonDisabled()}
                        color='info'
                        size='large'
                        fullWidth
                        onClick={() => handleNextStep()}
                    >
                        Continue
                    </Button>
                )}
            </Grid>
        </>
    );
}

export default BookingCalendar4;
