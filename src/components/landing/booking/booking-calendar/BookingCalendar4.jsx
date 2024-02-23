import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useBookingSummary from '../../../../hooks/useBookingSummary';

function BookingCalendar4({ handleNext }) {
    const { setDate, date } = useBookingSummary();

    const [state, setState] = useState([
        {
            startDate: (date && date.checkIn) ? new Date(date.checkIn) : new Date(),
            endDate: (date && date.checkOut) ? new Date(date.checkOut) : new Date(),
            key: 'selection'
        }
    ]);

    let duration = moment(state[0].endDate).diff(moment(state[0].startDate), 'days') + 1;

    const [checkDates, setCheckDates] = useState({ checkIn: (date && date.checkIn) ? date.checkIn : undefined, checkOut: (date && date.checkIn) ? date.checkOut : undefined });

    const handleSelect = (ranges) => {
        setCheckDates({
            checkIn: formatDate(ranges.selection.startDate),
            checkOut: formatDate(ranges.selection.endDate),
        })
        setState([ranges.selection]);
    };

    const isButtonDisabled = () => {
        if (!state[0]) return true; // If no date range is selected
        return moment(state[0].endDate).diff(moment(state[0].startDate), 'days') === 0;
    };
    // Define the dates you want to disable
    const disabledDates = [
        new Date(2024, 1, 25), // February 25, 2024
        new Date(2024, 1, 28)  // February 28, 2024
    ];

    const handleContinue = () => {
        setDate(Object.assign(checkDates, { duration }));
        handleNext();
    }

    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    };


    return (
        <Grid display='flex' gap={2}>
            <Grid >
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
            </Grid>
            {state[0] && (
                <Grid width='100%' display='flex' justifyContent='space-between' flexDirection='column'>
                    <Box>
                        <Typography variant="subtitle1">
                            Selected Dates: {moment(state[0].startDate).format('MMMM Do, YYYY')} to {moment(state[0].endDate).format('MMMM Do, YYYY')}
                        </Typography>
                        <Typography variant="subtitle1">
                            Duration: {duration} {duration > 1 ? 'days' : 'day'}
                        </Typography>
                    </Box>
                    <Button disabled={isButtonDisabled()} variant="contained" color="success" onClick={handleContinue}>
                        Continue
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}

export default BookingCalendar4;
