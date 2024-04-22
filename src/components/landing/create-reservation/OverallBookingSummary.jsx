import { Box, Card, CardMedia, Divider, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import useAfterReservation from '../../../hooks/reservation/useAfterReservation';
import useCustomer from '../../../hooks/reservation/useCustomer';
import useDate from '../../../hooks/reservation/useDate';
import useServices from '../../../hooks/reservation/useServices';
import useStepper from '../../../hooks/reservation/useStepper';
import useUser from '../../../hooks/useUser';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import formatPrice from '../../../utility_functions/formatPrice';
import { formalFormatDate } from '../../../utility_functions/formatTime';
import ConflictBooking_Modal from './modal/ConflictBooking_Modal';

const OverallBookingSummary = ({ handleNext, handleStep }) => {
    const { user } = useUser();

    const { reservationId, setReservationId, conflictReservation, setConflictReservation, setTotalPayment } = useAfterReservation();
    const { privacyPolicy, setResetCompleted } = useStepper();
    const [loading, setLoading] = useState(false);

    const { customer, accommodationType } = useCustomer();
    const { selectedDate } = useDate();
    const { selectedRooms, selectedCottages } = useServices();

    const calculateTotalPayment = (duration, rooms, cottages) => {
        const roomTotal = calculateTotalRoomPayment(rooms, duration);
        const cottageTotal = calculateTotalCottagePayment(cottages, duration);
        return roomTotal + cottageTotal;
    };


    const calculateTotalRoomPayment = (rooms, duration) => {
        let totalPayment = 0;
        rooms.forEach(room => {
            let roomTotal = parseFloat(room.price) * duration; // Multiply the base price of the room by the duration
            if (room.addOns && room.addOns.length > 0) {
                room.addOns.forEach(addOn => {
                    roomTotal += addOn.quantity * parseFloat(addOn.price); // Add add-on prices without multiplying by duration
                });
            }
            totalPayment += roomTotal;
        });
        return totalPayment || 0;
    };

    const calculateTotalCottagePayment = (cottages, duration) => {
        let totalPayment = 0;
        cottages.forEach(cottage => {
            let cottageTotal = parseFloat(cottage.price) * duration; // Multiply the base price of the cottage by the duration
            if (cottage.addOns && cottage.addOns.length > 0) {
                cottage.addOns.forEach(addOn => {
                    cottageTotal += addOn.quantity * parseFloat(addOn.price); // Add add-on prices without multiplying by duration
                });
            }
            totalPayment += cottageTotal;
        });
        return totalPayment || 0;
    };

    const totalPayment = calculateTotalPayment(selectedDate.duration, selectedRooms, selectedCottages);
    const totalRoomsPrice = calculateTotalRoomPayment(selectedRooms, selectedDate.duration);
    const totalCottagesPrice = calculateTotalCottagePayment(selectedCottages, selectedDate.duration);

    const handleConfirmBooking = () => {
        setTotalPayment(totalPayment);
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
                    setResetCompleted();
                }
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
                                    <Box key={room.id} mb={.5} pb={.5} borderBottom='1px solid #ddd'>
                                        <Box display='flex' justifyContent='space-between' width='100%' >
                                            <Typography variant="body1"><strong>{room.name}:</strong></Typography>
                                            <Typography variant='body2' color='text.secondary'>₱{formatPrice(room.price)}</Typography>
                                        </Box>
                                        {(room.addOns && room.addOns.length !== 0) ?
                                            room.addOns.map(addOn => (
                                                <Box key={addOn.item_id} pl={2} display='flex' justifyContent='space-between' width='100%'>
                                                    <Typography variant="body2">{addOn.name}:</Typography>
                                                    <Typography variant='body2' color='text.secondary'>₱{formatPrice(addOn.price)}</Typography>
                                                </Box>
                                            )) :
                                            undefined
                                        }
                                    </Box>
                                ))
                            }

                            {
                                selectedCottages.map(cottage => (
                                    <Box key={cottage.id} mb={.5} pb={.5} borderBottom='1px solid #ddd'>
                                        <Box display='flex' justifyContent='space-between' width='100%' >
                                            <Typography variant="body1"><strong>{cottage.name}:</strong></Typography>
                                            <Typography variant='body2' color='text.secondary'>₱{formatPrice(cottage.price)}</Typography>
                                        </Box>
                                        {(cottage.addOns && cottage.addOns.length !== 0) ?
                                            cottage.addOns.map(addOn => (
                                                <Box key={addOn.item_id} pl={2} display='flex' justifyContent='space-between' width='100%'>
                                                    <Typography variant="body2">{addOn.name}:</Typography>
                                                    <Typography variant='body2' color='text.secondary'>₱{formatPrice(addOn.price)}</Typography>
                                                </Box>
                                            )) :
                                            undefined
                                        }
                                    </Box>
                                ))
                            }

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="body1"><strong>Day/s:</strong></Typography>
                                <Typography variant='body2' color='text.secondary'>{selectedDate.duration >= 1 ? selectedDate.duration + 'd' : 'Daytime'}</Typography>
                            </Box>

                            <Box display='flex' justifyContent='space-between' borderTop='2px solid #ddd' mt={1} pt={1}>
                                <Typography variant="body1"><strong>Total Payment:</strong></Typography>
                                <Typography variant='body1'>₱{formatPrice(totalPayment)}</Typography>
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






// only if add ons should also multiply by duration.
// const calculateTotalRoomPayment = (rooms, duration) => {
//         let totalPayment = 0;
//         rooms.forEach(room => {
//             let roomTotal = parseFloat(room.price); // Initialize with the base price of the room
//             // Add the prices of each add-on
//             if (room.addOns && room.addOns.length > 0) {
//                 room.addOns.forEach(addOn => {
//                     roomTotal += addOn.quantity * parseFloat(addOn.price);
//                 });
//             }
//             totalPayment += roomTotal;
//         });
//         return totalPayment;
//     };