import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useBookingSummary from '../../../../hooks/useBookingSummary';
import BookingSummary from '../BookingSummary';
import { blue, grey } from '@mui/material/colors';

function BookingCalendar4({ handleNext }) {
    const { setDate, date, selectedRoom } = useBookingSummary();
    const [state, setState] = useState([
        {
            startDate: (date && date.checkIn) ? new Date(date.checkIn) : new Date(),
            endDate: (date && date.checkOut) ? new Date(date.checkOut) : new Date(),
            key: 'selection'
        }
    ]);


    const handleSelect = (ranges) => {
        let duration = moment(ranges.selection.endDate).diff(moment(ranges.selection.startDate), 'days');
        setDate({
            checkIn: formatDate(ranges.selection.startDate),
            checkOut: formatDate(ranges.selection.endDate),
            duration,
        })
        setState([ranges.selection]);
    };

    const isButtonDisabled = () => {
        if (!state[0]) return true; // If no date range is selected
        return moment(state[0].endDate).diff(moment(state[0].startDate), 'days') === 0;
    };
    // Define the dates you want to disable
    const disabledDates = (selectedRoom && selectedRoom.unavailable_dates.length > 0)
        ? selectedRoom.unavailable_dates.map(dateString => {
            const [year, month, day] = dateString.split('-').map(Number);
            return new Date(year, month - 1, day);
        })
        : [];


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
                <Box borderTop='1px solid #ddd'>
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
            </Grid>
            {state[0] && (
                <Grid width='100%' display='flex' justifyContent='space-between' flexDirection='column'>
                    <BookingSummary
                        handleNext={handleNext}
                        nextButton={
                            <Button
                                variant="contained"
                                disabled={isButtonDisabled()}
                                color='info'
                                fullWidth
                                onClick={() => handleNext()}
                            >
                                Continue
                            </Button>
                        }
                    />
                </Grid>
            )}
        </Grid>
    );
}

export default BookingCalendar4;
