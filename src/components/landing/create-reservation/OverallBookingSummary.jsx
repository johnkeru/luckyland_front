import { Box, Card, CardMedia, Divider, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import useAfterReservation from '../../../hooks/reservation/useAfterReservation';
import useCustomer from '../../../hooks/reservation/useCustomer';
import useDate from '../../../hooks/reservation/useDate';
import useServices from '../../../hooks/reservation/useServices';
import useStepper from '../../../hooks/reservation/useStepper';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import formatPrice from '../../../utility_functions/formatPrice';
import { formalFormatDate } from '../../../utility_functions/formatTime';
import ConflictBooking_Modal from './modal/ConflictBooking_Modal';
import useUser from '../../../hooks/useUser';

const OverallBookingSummary = ({ handleNext, handleStep }) => {
    const { user } = useUser();

    const { reservationId, setReservationId, conflictReservation, setConflictReservation } = useAfterReservation();
    const { privacyPolicy } = useStepper();
    const [loading, setLoading] = useState(false);

    const { customer, accommodationType } = useCustomer();
    const { selectedDate } = useDate();
    const { selectedRooms, selectedCottages } = useServices();

    const calculateTotalPayment = (selectedDate, rooms, cottages) => {
        const duration = selectedDate.duration;
        const roomTotal = rooms.length > 0 ? rooms.reduce((acc, room) => acc + parseFloat(room.price), 0) : 0;
        const cottageTotal = cottages.length > 0 ? cottages.reduce((acc, cottage) => acc + parseFloat(cottage.price), 0) : 0;
        return (roomTotal + cottageTotal) * duration;
    };

    const calculateTotalRoomPayment = (rooms) => {
        const roomTotal = rooms.length > 0 ? rooms.reduce((acc, room) => acc + parseFloat(room.price), 0) : 0;
        return roomTotal;
    };

    const calculateTotalCottagePayment = (cottages) => {
        const cottageTotal = cottages.length > 0 ? cottages.reduce((acc, cottage) => acc + parseFloat(cottage.price), 0) : 0;
        return cottageTotal;
    };

    const totalPayment = calculateTotalPayment(selectedDate, selectedRooms, selectedCottages);
    const totalRoomsPrice = calculateTotalRoomPayment(selectedRooms);
    const totalCottagesPrice = calculateTotalCottagePayment(selectedCottages);

    console.log(selectedRooms)

    const handleConfirmBooking = () => {
        if (!reservationId) {
            const preparedData = {
                rooms: selectedRooms,
                cottages: selectedCottages,
                total: totalPayment,
                checkIn: new Date(selectedDate.checkIn).toISOString().slice(0, 10),
                checkOut: new Date(selectedDate.checkOut).toISOString().slice(0, 10),
                guests: customer.guests,
                totalRoomsPrice,
                totalCottagesPrice,
                days: selectedDate.duration,
                customer,
                isWalkIn: user ? true : false,
                accommodationType,
                ...privacyPolicy
            };
            commonValidationCall({
                endpoint: 'api/reservations/create-reservation',
                method: 'post',
                body: preparedData,
                setLoading,
                setConflict: setConflictReservation,
                setDataDirectly: setReservationId,
                handleClose: () => {
                    handleNext();
                },
            });
        } else {
            handleNext();
        }
    };

    return (
        <Box bgcolor="#f9f9f9" p={2}>
            {
                conflictReservation ? <ConflictBooking_Modal
                    conflictReservation={conflictReservation}
                    setConflictReservation={setConflictReservation}
                    handleStep={handleStep}
                /> : undefined}

            <Typography variant="h5" gutterBottom align="center" color="#333">
                Overall Booking Summary
            </Typography>
            <Divider />

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h6" gutterBottom color="#333">
                                Customer Information
                            </Typography>
                            <Box sx={{ mb: 1 }}>
                                <Typography variant="body1">
                                    <strong>Customer Name:</strong> {customer.firstName} {customer.lastName}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Total Guests: </strong> {customer.guest}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Email: </strong> {customer.email}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Phone Number: </strong> {customer.phoneNumber || 'None'}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Check In: </strong> {formalFormatDate(selectedDate.checkIn)}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Check Out: </strong> {formalFormatDate(selectedDate.checkOut)}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Day/s: </strong> {selectedDate.duration}
                                </Typography>
                            </Box>

                            <Typography variant="h6" color="#333">
                                Payment
                            </Typography>

                            {
                                selectedRooms.map(room => (
                                    <Box key={room.id} display='flex' justifyContent='space-between'>
                                        <Typography variant="body1"><strong>{room.name}:</strong></Typography>
                                        <Typography variant='body2' color='text.secondary'>₱{formatPrice(room.price)}</Typography>
                                    </Box>
                                ))
                            }

                            {
                                selectedCottages.map(cottage => (
                                    <Box key={cottage.id} display='flex' justifyContent='space-between'>
                                        <Typography variant="body1"><strong>{cottage.name}:</strong></Typography>
                                        <Typography variant='body2' color='text.secondary'>₱{formatPrice(cottage.price)}</Typography>
                                    </Box>
                                ))
                            }

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="body1"><strong>Day/s:</strong></Typography>
                                <Typography variant='body2' color='text.secondary'>{selectedDate.duration}d</Typography>
                            </Box>

                            <Box display='flex' justifyContent='space-between' borderTop='1px solid #ddd' mt={1} pt={1}>
                                <Typography variant="body1"><strong>Total Payment:</strong></Typography>
                                <Typography variant='body2' color='text.secondary'>₱{formatPrice(totalPayment)}</Typography>
                            </Box>
                        </Box>
                        <ButtonWithLoading
                            variant="contained"
                            color="success"
                            onClick={handleConfirmBooking}
                            sx={{ mt: 3, }}
                            size='large'
                            loading={loading}
                            loadingText='Confirming Reservation...'
                        >
                            Confirm Reservation
                        </ButtonWithLoading>

                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} sx={{ overflowY: 'auto', height: '65vh' }}>
                    {selectedRooms.length !== 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom color="#333">
                                Rooms Selected
                            </Typography>
                            <Grid container spacing={2}>
                                {selectedRooms.map((room) => (
                                    <Grid key={room.id} item xs={12} sm={6} md={4}>
                                        {room.name}
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                image={room.images[0].url}
                                                alt={room.name}
                                                sx={{ height: 150 }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                    {selectedCottages.length !== 0 && (
                        <Box mt={1}>
                            <Typography variant="h6" gutterBottom color="#333">
                                Cottages Selected
                            </Typography>
                            <Grid container spacing={2}>
                                {selectedCottages.map((cottage) => (
                                    <Grid key={cottage.id} item xs={12} sm={6} md={4}>
                                        {cottage.name}
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                image={cottage.images[0].url}
                                                alt={cottage.name}
                                                sx={{ height: 150 }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box >
    );
};

export default OverallBookingSummary;
