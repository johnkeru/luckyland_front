import { Box, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { GrSchedulePlay } from 'react-icons/gr';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useRescheduleDate from '../../../hooks/reservation/useRescheduleDate';
import useUser from '../../../hooks/useUser';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import { formalFormatDate } from '../../../utility_functions/formatTime';
import Calendar from '../create-reservation/custom-calendar/CustomDateRangeCalendar';
import Morethan30DaysModal from '../create-reservation/modal/MoreThan30Days';
import { LOGO } from '../../../cloud/mainImages'
import { ALL, COTTAGES, ROOMS } from '../../../hooks/reservation/useCustomer';
import Cancelling_Modal from '../create-reservation/modal/Cancelling_Modal';

const Reschedule = () => {
    const { user } = useUser();

    const { token } = useParams();
    const location = useLocation();
    const nav = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const id = searchParams.get('id'); // reservation hash not actually the id
    const accommodationType = searchParams.get('type');

    const [loadingDates, setLoadingDates] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [buttonName, setButtonName] = useState('');
    const CANCEL = 'CANCEL';
    const RESCHED = 'RESCHED';

    const { setSelectedReschedDate, selectedReschedDate, disabledReschedDates, setDisabledReschedDates, resetReschedDate } = useRescheduleDate();

    const [isMoreThan30Days, setIsMoreThan30Days] = useState(false);
    const handleCloseIsMoreThan30Days = () => setIsMoreThan30Days(false);

    const isMoreThan30DaysFn = () => {
        console.log(selectedReschedDate)
        if (selectedReschedDate.duration > 30) {
            setIsMoreThan30Days(true);
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (accommodationType === ALL) {
            basicGetCall({
                method: 'post',
                hasToaster: true,
                endpoint: 'api/reservations/unavailable-dates-by-rooms-and-cottages',
                setDataDirectly: (data) => {
                    setSelectedReschedDate({ ...data.previousDates, checkIn: new Date(data.previousDates.checkIn), checkOut: new Date(data.previousDates.checkOut) });
                    setDisabledReschedDates(data.unavailableDates)
                },
                setLoading: setLoadingDates,
                body: { reservationHASH: id }
            });
        } else if (accommodationType === ROOMS) {
            basicGetCall({
                method: 'post',
                hasToaster: true,
                endpoint: 'api/reservations/unavailable-dates-by-rooms',
                setDataDirectly: (data) => {
                    setSelectedReschedDate({ ...data.previousDates, checkIn: new Date(data.previousDates.checkIn), checkOut: new Date(data.previousDates.checkOut) });
                    setDisabledReschedDates(data.unavailableDates)
                },
                setLoading: setLoadingDates,
                body: { reservationHASH: id }
            });
        } else if (accommodationType === COTTAGES) {
            basicGetCall({
                method: 'post',
                hasToaster: true,
                endpoint: 'api/reservations/unavailable-dates-by-cottages',
                setDataDirectly: (data) => {
                    setSelectedReschedDate({ ...data.previousDates, checkIn: new Date(data.previousDates.checkIn), checkOut: new Date(data.previousDates.checkOut) });
                    setDisabledReschedDates(data.unavailableDates)
                },
                setLoading: setLoadingDates,
                body: { reservationHASH: id }
            });
        } else {
            basicGetCall({
                method: 'post',
                hasToaster: true,
                endpoint: 'api/reservations/unavailable-dates-by-others',
                setDataDirectly: (data) => {
                    setSelectedReschedDate({ ...data.previousDates, checkIn: new Date(data.previousDates.checkIn), checkOut: new Date(data.previousDates.checkOut) });
                    setDisabledReschedDates(data.unavailableDates)
                },
                setLoading: setLoadingDates,
                body: { reservationHASH: id }
            });
        }
    }, []);

    const handleReschedule = () => {
        setButtonName(RESCHED);
        if (!isMoreThan30DaysFn()) {
            commonValidationCall({
                endpoint: 'api/reservations/reschedule',
                method: 'put',
                setLoading: setLoadingSubmit,
                hasToaster: true,
                body: {
                    reservationHASH: id,
                    checkIn: new Date(selectedReschedDate.checkIn).toISOString().slice(0, 10),
                    checkOut: new Date(selectedReschedDate.checkOut).toISOString().slice(0, 10),
                    days: selectedReschedDate.duration,
                    email,
                    token,
                    accommodationType,
                },
                onSuccess: () => {
                    resetReschedDate();
                    if (user) {
                        nav('/reservation');
                    } else {
                        nav('/');
                    }
                }
            });
        }
    }

    const [cancelling, setCancelling] = useState(false);
    const handleCancelling = () => setCancelling(true);
    const handleCancel = () => {
        setButtonName(CANCEL);
        commonValidationCall({
            endpoint: 'api/reservations/cancel-reservation/' + id,
            method: 'post',
            setLoading: setLoadingSubmit,
            hasToaster: true,
            onSuccess: () => {
                resetReschedDate();
                if (user) {
                    nav('/reservation');
                } else {
                    nav('/');
                }
                setCancelling(false);
            }
        });
    }

    return (
        <Box m='auto' pb={3}>

            {!user && isMoreThan30Days ? <Morethan30DaysModal
                handleCloseIsMoreThan30Days={handleCloseIsMoreThan30Days}
                isMoreThan30Days={isMoreThan30Days} />
                : undefined}


            {cancelling ? <Cancelling_Modal
                cancelling={cancelling}
                handleCancel={handleCancel}
                setCancelling={setCancelling}
                loading={loadingSubmit && buttonName === CANCEL}
                disabled={selectedReschedDate.duration < 1 || loadingSubmit}
            />
                : undefined}

            <Box
                display='flex'
                alignItems='center'
                justifyContent='center' // Added to center align content horizontally
                gap={{ xs: 2, md: 4 }} // Added gap between elements with different values for small and medium screens
                mb={1}
                bgcolor='primary.main'
                color='primary.contrastText'
                px={{ xs: 2, md: 20 }} // Adjusted padding for small and medium screens
                py={1}
            >
                <img
                    width='65'
                    src={LOGO}
                    style={{ borderRadius: '50%' }}
                    alt="Logo"
                />
                <Typography variant='h4' sx={{ fontFamily: { xs: 'inherit', md: 'cursive' }, }}>
                    LuckyLand Resort
                </Typography>
            </Box>

            <Grid width={{ xs: '96%', md: '80%' }} m='auto'>

                <Calendar
                    loading={loadingDates}
                    loadingText={`finding available dates for ${accommodationType === 'both' ? 'cottages & rooms' : accommodationType}...`}
                    disabledDates={disabledReschedDates}
                    defaultValue={selectedReschedDate}
                    setDefaultValue={setSelectedReschedDate}
                />

                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Typography color='GrayText' mb={1}>
                                Available dates for: <b>{accommodationType === ALL ? 'rooms, cottages and others' : accommodationType}</b>
                            </Typography>

                            <Box border='1px solid #ddd' p={{ xs: 1, sm: 2 }} pt={{ xs: .5, sm: 1 }}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>Legends: </Typography>
                                <Box display='flex' gap={1} justifyContent='space-between' flexWrap='wrap'>
                                    <Box display='flex' gap={1} alignItems='center'>
                                        <Box bgcolor={grey[300]} width='30px' height={{ xs: '25px', sm: '30px' }} display='flex' justifyContent='center' alignItems='center'>
                                            <Typography variant='body2' sx={{ fontSize: '12px', color: 'white' }}>12</Typography>
                                        </Box>
                                        <Typography variant="body2" color="textSecondary">Unavailable/Reserved</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} alignItems='center'>
                                        <Box border='1px solid #ddd' width='30px' height={{ xs: '25px', sm: '30px' }} display='flex' justifyContent='center' alignItems='center'>
                                            <Typography variant='body2' sx={{ fontSize: '12px', color: grey[500] }}>12</Typography>
                                        </Box>
                                        <Typography variant="body2" color="textSecondary">Vacants</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} alignItems='center'>
                                        <Box display='flex' gap={1} alignItems='center'>
                                            <Box border='1px solid #ddd' sx={{ background: 'linear-gradient(to top, rgba(255, 145, 0, 0.7), rgba(255, 145, 0, 0.5))' }} width='30px' height={{ xs: '25px', sm: '30px' }} display='flex' justifyContent='center' alignItems='center'>
                                                <Typography variant='body2' sx={{ fontSize: '12px', color: 'white' }}>12</Typography>
                                            </Box>
                                            <Typography variant="body2" color="textSecondary">Selecting Dates</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Box display='flex' alignItems='center' gap={1}>
                                <GrSchedulePlay color='gray' />
                                <Typography variant="h6" color="textSecondary" gutterBottom>Your schedule: </Typography>
                            </Box>
                            <Box display='flex' alignItems='center' gap={1} color='GrayText'>
                                {selectedReschedDate?.checkIn ? <Typography variant="body2">{formalFormatDate(selectedReschedDate.checkIn)}</Typography> : undefined}
                                -
                                {selectedReschedDate?.checkOut ? (
                                    <Typography variant="body2">
                                        {formalFormatDate(selectedReschedDate.checkOut)}
                                    </Typography>
                                ) : undefined}
                                /
                                {selectedReschedDate?.duration ? <Typography variant='body2'>
                                    {selectedReschedDate.duration || 1} {selectedReschedDate.duration > 1 ? 'days' : 'day'}
                                </Typography> : <Typography variant='body2'> 0 day</Typography>}
                            </Box>

                            <Box display='flex' gap={1}>
                                <ButtonWithLoading
                                    loadingText='Cancelling...'
                                    variant="contained"
                                    onClick={handleCancelling}
                                    color='error'
                                    size='large'
                                    fullWidth
                                    sx={{ mt: 2, }}
                                    disabled={selectedReschedDate.duration < 1 || loadingSubmit}
                                >
                                    Cancel
                                </ButtonWithLoading>
                                <ButtonWithLoading
                                    loading={loadingSubmit && buttonName === RESCHED}
                                    loadingText='Rescheduling...'
                                    variant="contained"
                                    onClick={handleReschedule}
                                    size='large'
                                    fullWidth
                                    disabled={selectedReschedDate.duration < 1 || loadingSubmit}
                                    sx={{ mt: 2, }}
                                >
                                    Confirm
                                </ButtonWithLoading>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>









            </Grid>
        </Box >
    );
}

export default Reschedule;
