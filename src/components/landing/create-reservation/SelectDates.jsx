
import { Box, Button, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { GrSchedulePlay } from "react-icons/gr";
import useDate from '../../../hooks/reservation/useDate';
import { formalFormatDate } from '../../../utility_functions/formatTime';
import Calendar from './custom-calendar/CustomDateRangeCalendar';
import Morethan30DaysModal from './modal/MoreThan30Days';
import useCustomer from '../../../hooks/reservation/useCustomer';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import useServices from '../../../hooks/reservation/useServices';

function SelectDates({ handleNext }) {
    const { setSelectedDate, selectedDate, disabledDates, setDisabledDates, setResetSelectedDate } = useDate();
    const [loadingDates, setLoadingDates] = useState(true);
    const { accommodationType } = useCustomer();
    const { setTab } = useServices();

    const [isMoreThan30Days, setIsMoreThan30Days] = useState(false);
    const handleCloseIsMoreThan30Days = () => setIsMoreThan30Days(false);

    const handleNextStep = () => {
        if (selectedDate.duration > 30)
            setIsMoreThan30Days(true);
        else handleNext();

    }
    const isButtonDisabled = () => loadingDates || false;

    useEffect(() => {
        if (accommodationType === 'both') {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-rooms-and-cottages',
                setDataDirectly: setDisabledDates,
                setLoading: setLoadingDates
            });
            // setResetSelectedDate();
        } else if (accommodationType === 'rooms') {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-rooms',
                setDataDirectly: setDisabledDates,
                setLoading: setLoadingDates
            });
            // setResetSelectedDate();
        } else {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-cottages',
                setDataDirectly: setDisabledDates,
                setLoading: setLoadingDates
            });
            // setSelectedDate({ checkIn: new Date(), checkOut: new Date() });
        }
        setTab(0);
    }, [accommodationType]);

    return (
        <>
            {isMoreThan30Days ? <Morethan30DaysModal
                handleCloseIsMoreThan30Days={handleCloseIsMoreThan30Days}
                isMoreThan30Days={isMoreThan30Days} />
                : undefined}

            <Grid>

                <Calendar
                    loading={loadingDates}
                    loadingText={`finding available dates for ${accommodationType === 'both' ? 'cottages & rooms' : accommodationType}...`}
                    disabledDates={disabledDates}
                    defaultValue={selectedDate}
                    setDefaultValue={setSelectedDate}
                />

                <Box pt={2} display='flex' justifyContent='space-between' alignItems='center'>
                    <Box >
                        <Typography color='GrayText' mb={1}>
                            Available dates for: <b>{accommodationType === 'both' ? 'cottages & rooms' : accommodationType}</b>
                        </Typography>

                        <Box border='1px solid #ddd' p={2} pt={1}>
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
                                    <Box display='flex' gap={.3} alignItems='center'>
                                        <Box bgcolor='primary.main' width='30px' height='30px' display='flex' justifyContent='center' alignItems='center'>
                                            <Typography variant='body2' sx={{ fontSize: '12px', color: 'white' }}>12</Typography>
                                        </Box>
                                        <Box bgcolor='primary.light' width='25px' height='25px' display='flex' justifyContent='center' alignItems='center'>
                                            <Typography variant='body2' sx={{ fontSize: '12px', color: 'white' }}>13</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">Selecting Dates </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box width='30%'>
                        <Box display='flex' alignItems='center' gap={1}>
                            <GrSchedulePlay color='gray' />
                            <Typography variant="h6" color="textSecondary" gutterBottom>Your schedule: </Typography>
                        </Box>
                        <Box display='flex' alignItems='center' gap={1} color='GrayText'>
                            {selectedDate?.checkIn ? <Typography variant="body2">{formalFormatDate(selectedDate.checkIn)}</Typography> : undefined}
                            -
                            {selectedDate?.checkOut ? (
                                <Typography variant="body2">
                                    {formalFormatDate(selectedDate.checkOut)}
                                </Typography>
                            ) : undefined}
                            /
                            {selectedDate?.duration ? <Typography variant='body2'>
                                {selectedDate.duration || 1} {selectedDate.duration > 1 ? 'days' : 'day'}
                            </Typography> : <Typography variant='body2'> 0 day</Typography>}
                        </Box>

                        <Button
                            variant="contained"
                            disabled={isButtonDisabled()}
                            size='large'
                            fullWidth
                            sx={{ mt: 2, mb: -1 }}
                            onClick={() => handleNextStep()}
                        >
                            Continue
                        </Button>
                    </Box>
                </Box>

            </Grid>
        </>
    );
}

export default SelectDates;
