import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall'
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall'
import Morethan30DaysModal from '../create-reservation/modal/MoreThan30Days';
import Calendar from '../create-reservation/custom-calendar/CustomDateRangeCalendar';
import { Box, Typography, Grid, Button } from '@mui/material'
import { GrSchedulePlay } from 'react-icons/gr';
import { formalFormatDate } from '../../../utility_functions/formatTime';
import useDate from '../../../hooks/reservation/useDate'
import { grey } from '@mui/material/colors';
import useUser from '../../../hooks/useUser';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading'

const Reschedule = () => {
    const { token } = useParams();
    const location = useLocation();
    const nav = useNavigate();
    const { user } = useUser();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const id = searchParams.get('id'); // reservation hash not actually the id
    const accommodationType = searchParams.get('type');

    const [loadingDates, setLoadingDates] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const { setSelectedDate, selectedDate, disabledDates, setDisabledDates, resetDate } = useDate();

    useEffect(() => {
        if (accommodationType === 'both') {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-rooms-and-cottages',
                setDataDirectly: setDisabledDates,
                setLoading: setLoadingDates,
                body: { reservationHASH: id }
            });
        } else if (accommodationType === 'rooms') {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-rooms',
                setDataDirectly: setDisabledDates,
                setLoading: setLoadingDates,
                body: { reservationHASH: id }
            });
        } else {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-cottages',
                setDataDirectly: setDisabledDates,
                setLoading: setLoadingDates,
                body: { reservationHASH: id }
            });
        }
    }, []);

    const handleReschedule = () => {
        commonValidationCall({
            endpoint: 'api/reservations/reschedule',
            method: 'put',
            setLoading: setLoadingSubmit,
            hasToaster: true,
            body: {
                reservationHASH: id,
                checkIn: new Date(selectedDate.checkIn).toISOString().slice(0, 10),
                checkOut: new Date(selectedDate.checkOut).toISOString().slice(0, 10),
                days: selectedDate.duration,
                email,
                token,
                accommodationType,
            },
            onSuccess: () => {
                if (user) {
                    nav('/dashboard/reservation');
                } else {
                    nav('/');
                }
            }
        });
        resetDate();
    }

    return (
        <Box width='80%' m='auto'>
            {/* {isMoreThan30Days ? <Morethan30DaysModal
                handleCloseIsMoreThan30Days={handleCloseIsMoreThan30Days}
                isMoreThan30Days={isMoreThan30Days} />
                : undefined} */}

            <Box display='flex' alignItems='center' gap={2} my={2}>
                <img
                    width='65'
                    src='/logo/logo1.png'
                    alt="nature image"
                />
                <Typography variant='h4' color='GrayText'>Re-schedule</Typography>
            </Box>

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
                                        <Box bgcolor='#ff8c00' width='30px' height='30px' display='flex' justifyContent='center' alignItems='center'>
                                            <Typography variant='body2' sx={{ fontSize: '12px', color: 'white' }}>12</Typography>
                                        </Box>
                                        <Box bgcolor='#ffc477' width='25px' height='25px' display='flex' justifyContent='center' alignItems='center'>
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

                        <ButtonWithLoading
                            loading={loadingSubmit}
                            loadingText='Confirming...'
                            variant="contained"
                            color='info'
                            onClick={handleReschedule}
                            size='large'
                            fullWidth
                            disabled={selectedDate.duration < 1}
                            sx={{ mt: 2, mb: -1, backgroundColor: '#FFA000', '&:hover': { backgroundColor: '#FFCA28' } }}
                        >
                            Confirm
                        </ButtonWithLoading>
                    </Box>
                </Box>

            </Grid>
        </Box>
    );
}

export default Reschedule;
