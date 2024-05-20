import { Box, Button, Grid, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { GrSchedulePlay } from "react-icons/gr";
import useCustomer from '../../../hooks/reservation/useCustomer';
import useDate from '../../../hooks/reservation/useDate';
import useServices from '../../../hooks/reservation/useServices';
import useUser from '../../../hooks/useUser';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import { formalFormatDate } from '../../../utility_functions/formatTime';
import Calendar from './custom-calendar/CustomDateRangeCalendar';
import Morethan30DaysModal from './modal/MoreThan30Days';

const InfoTypography = styled(Typography)({
    backgroundColor: '#e3f2fd', // Light blue background color
    padding: '10px', // Padding for content spacing
    borderRadius: '4px', // Rounded corners
    borderLeft: '6px solid #2196f3', // Left border color (blue)
    marginBottom: '10px', // Spacing at the bottom
});

function SelectDates({ handleNext }) {
    const { user } = useUser(); // if user then allowed to book more than 30 days

    const { setSelectedDate, selectedDate, disabledDates, setDisabledDates, } = useDate();
    const [loadingDates, setLoadingDates] = useState(true);
    const { accommodationType } = useCustomer();
    const { setTab } = useServices();

    const [isMoreThan30Days, setIsMoreThan30Days] = useState(false);
    const handleCloseIsMoreThan30Days = () => setIsMoreThan30Days(false);

    const handleNextStep = () => {
        if (selectedDate.duration > 30 && !user)
            setIsMoreThan30Days(true);
        else handleNext();
    }

    const isButtonDisabled = () => {
        if (loadingDates && accommodationType === 'cottages') {
            return selectedDate.duration <= 0;
        } else if (selectedDate.duration < 1 && (accommodationType === 'rooms' || accommodationType === 'both')) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (accommodationType === 'both') {
            basicGetCall({
                method: 'post',
                endpoint: 'api/reservations/unavailable-dates-by-rooms-and-cottages',
                setDataDirectly: (data) => {
                    setDisabledDates(data.unavailableDates)
                },
                setLoading: setLoadingDates
            });
            // setResetSelectedDate();
        } else if (accommodationType === 'rooms') {
            basicGetCall({
                method: 'post',
                endpoint: 'api/reservations/unavailable-dates-by-rooms',
                setDataDirectly: (data) => {
                    setDisabledDates(data.unavailableDates)
                },
                setLoading: setLoadingDates
            });
            // setResetSelectedDate();
        } else {
            basicGetCall({
                method: 'post',
                endpoint: 'api/reservations/unavailable-dates-by-cottages',
                setDataDirectly: (data) => {
                    setDisabledDates(data.unavailableDates)
                },
                setLoading: setLoadingDates
            });
            // setSelectedDate({ checkIn: new Date(), checkOut: new Date() });
        }
        setTab(0);
    }, [accommodationType]);

    // console.log(selectedDate)

    return (
        <>
            {(!user && isMoreThan30Days) ? <Morethan30DaysModal
                handleCloseIsMoreThan30Days={handleCloseIsMoreThan30Days}
                isMoreThan30Days={isMoreThan30Days} />
                : undefined}

            <Grid px={1}>
                <InfoTypography variant="body1" mt={1}>
                    To select your reservation dates, simply click on the starting date in the calendar and then select the end date.
                </InfoTypography>

                <Calendar
                    loading={loadingDates}
                    loadingText={`finding available dates for ${accommodationType === 'both' ? 'cottages & rooms' : accommodationType}...`}
                    disabledDates={disabledDates}
                    defaultValue={selectedDate}
                    setDefaultValue={setSelectedDate}
                />

                <Box mt={2} display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 1, sm: 2 }}>
                    <Box width='100%'>
                        <Typography color='GrayText' mb={1}>
                            Available dates for: <b>{accommodationType === 'both' ? 'cottages & rooms' : accommodationType}</b>
                        </Typography>

                        <Box border='1px solid #ddd' p={{ xs: 1, sm: 2 }} pt={{ xs: .5, sm: 1 }}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>Legends: </Typography>
                            <Box display='flex' gap={1} justifyContent='space-between' flexWrap='wrap'>
                                <Box display='flex' gap={1} alignItems='center'>
                                    <Box bgcolor={grey[300]} width='30px' height={{ xs: '25px', sm: '30px' }} display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant='body2' sx={{ fontSize: '12px', color: 'white' }}>12</Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">Unavailable</Typography>
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

                    <Box width='100%'>
                        <Box display='flex' alignItems='center' gap={1} px={{ xs: 1, sm: 0 }}>
                            <GrSchedulePlay color='gray' />
                            <Typography variant="h6" color="textSecondary" gutterBottom>Your schedule: </Typography>
                        </Box>
                        <Box display='flex' alignItems='center' gap={1} color='GrayText' px={{ xs: 1, sm: 0 }}>
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
                            </Typography> : <Typography variant='body2'> Daytime</Typography>}
                        </Box>

                        <Button
                            variant="contained"
                            disabled={isButtonDisabled()}
                            size='large'
                            fullWidth
                            sx={{ mt: 2.5, }}
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
