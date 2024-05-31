import { Box, Button, Card, CardMedia, Divider, Grid, Paper, Typography } from '@mui/material';
import useSettingUpPayment from '../../../hooks/reservation/useSettingUpPayment';
import useCustomer, { COTTAGES } from '../../../hooks/reservation/useCustomer';
import useDate from '../../../hooks/reservation/useDate';
import useServices from '../../../hooks/reservation/useServices';
import formatPrice from '../../../utility_functions/formatPrice';
import { formalFormatDate } from '../../../utility_functions/formatTime';

const OverallBookingSummary = ({ handleNext }) => {
    const { setTotalRoomsPrice, setTotalCottagesPrice, setTotalOthersPrice } = useSettingUpPayment();

    const { customer, accommodationType } = useCustomer();
    const { selectedDate } = useDate();
    const { selectedRooms, selectedCottages, selectedOthers } = useServices();

    const calculateTotalPayment = (duration, rooms, cottages, others) => {
        const roomTotal = calculateTotalAccommodationPayment(rooms);
        const cottageTotal = calculateTotalAccommodationPayment(cottages);
        const othersTotal = calculateTotalAccommodationPayment(others);
        return (roomTotal + cottageTotal + othersTotal) * (duration || 1);
    };

    const calculateTotalAccommodationPayment = (rooms) => {
        let totalPayment = 0;
        rooms.forEach(room => {
            let roomTotal = parseFloat(room.price); // Multiply the base price of the room by th
            if (room.addOns && room.addOns.length > 0) {
                room.addOns.forEach(addOn => {
                    roomTotal += addOn.quantity * parseFloat(addOn.price); // Add add-on prices without multiplying b
                });
            }
            totalPayment += roomTotal;
        });
        return totalPayment || 0;
    };

    const totalPayment = calculateTotalPayment(selectedDate.duration, selectedRooms, selectedCottages, selectedOthers);

    const handleConfirmBooking = () => {
        const roomsTotal = calculateTotalAccommodationPayment(selectedRooms);
        const cottagesTotal = calculateTotalAccommodationPayment(selectedCottages);
        const othersTotal = calculateTotalAccommodationPayment(selectedOthers);
        setTotalRoomsPrice(roomsTotal);
        setTotalCottagesPrice(cottagesTotal);
        setTotalOthersPrice(othersTotal);
        handleNext();
    };

    return (
        <Box bgcolor="#f9f9f9" pt={2}>
            <Typography variant="h5" align="center" color="#333" fontWeight={600}>
                <Divider >
                    Overall Booking Summary
                </Divider>
            </Typography>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3, backgroundColor: '#fff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h6" gutterBottom color="#333">
                                Customer Information
                            </Typography>
                            <Box sx={{ mb: 1 }}>
                                <Box display='flex' justifyContent='space-between' width='100%' >
                                    <Typography><strong>Customer Name:</strong></Typography>
                                    <Typography color='text.secondary'>{customer.firstName} {customer.lastName}</Typography>
                                </Box>
                                <Box display='flex' justifyContent='space-between' width='100%' >
                                    <Typography><strong>Total Guests:</strong></Typography>
                                    <Typography color='text.secondary'>{customer.guests}</Typography>
                                </Box>
                                <Box display='flex' justifyContent='space-between' width='100%' >
                                    <Typography><strong>Email: </strong></Typography>
                                    <Typography color='text.secondary'>{customer.email}</Typography>
                                </Box>
                                <Box display='flex' justifyContent='space-between' width='100%' >
                                    <Typography><strong>Phone Number: </strong></Typography>
                                    <Typography color='text.secondary'>{customer.phoneNumber || 'None'}</Typography>
                                </Box>
                                <Box display='flex' justifyContent='space-between' width='100%' >
                                    <Typography><strong>Check In: </strong></Typography>
                                    <Typography color='text.secondary'>{formalFormatDate(selectedDate.checkIn)} {accommodationType === COTTAGES ? '/ Anytime' : '2:00pm'}</Typography>
                                </Box>
                                <Box display='flex' justifyContent='space-between' width='100%' >
                                    <Typography><strong>Check Out: </strong></Typography>
                                    <Typography color='text.secondary'>{formalFormatDate(selectedDate.checkOut)} {accommodationType === COTTAGES ? '/ Anytime' : '12:00pm'}</Typography>
                                </Box>
                                <Box display='flex' justifyContent='space-between' width='100%' >
                                    <Typography><strong>Day/s: </strong></Typography>
                                    <Typography color='text.secondary'>{selectedDate.duration >= 1 ? ` ${selectedDate.duration}` : ' Daytime'}</Typography>
                                </Box>
                                <Typography variant='body1'>
                                    <strong></strong>
                                </Typography>
                            </Box>

                            <Typography variant="h6" color="#333">
                                Payment
                            </Typography>

                            {
                                selectedRooms.map(room => (
                                    <Box key={room.id} mb={.5} pb={.5} borderBottom='1px solid #ddd'>
                                        <Box display='flex' justifyContent='space-between' width='100%' >
                                            <Typography><strong>{room.name}:</strong></Typography>
                                            <Typography color='text.secondary'>₱{formatPrice(room.price)}</Typography>
                                        </Box>
                                        {(room.addOns && room.addOns.length !== 0) ?
                                            room.addOns.map(addOn => (
                                                <Box key={addOn.item_id} pl={2} display='flex' justifyContent='space-between' width='100%'>
                                                    <Typography variant="body2">{addOn.name}:</Typography>
                                                    <Typography color='text.secondary'>₱{formatPrice(addOn.price)}</Typography>
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
                                            <Typography><strong>{cottage.name}:</strong></Typography>
                                            <Typography color='text.secondary'>₱{formatPrice(cottage.price)}</Typography>
                                        </Box>
                                        {(cottage.addOns && cottage.addOns.length !== 0) ?
                                            cottage.addOns.map(addOn => (
                                                <Box key={addOn.item_id} pl={2} display='flex' justifyContent='space-between' width='100%'>
                                                    <Typography variant="body2">{addOn.name}:</Typography>
                                                    <Typography color='text.secondary'>₱{formatPrice(addOn.price)}</Typography>
                                                </Box>
                                            )) :
                                            undefined
                                        }
                                    </Box>
                                ))
                            }

                            {
                                selectedOthers.map(other => (
                                    <Box key={other.id} mb={.5} pb={.5} borderBottom='1px solid #ddd'>
                                        <Box display='flex' justifyContent='space-between' width='100%' >
                                            <Typography><strong>{other.name}:</strong></Typography>
                                            <Typography color='text.secondary'>₱{formatPrice(other.price)}</Typography>
                                        </Box>
                                        {(other.addOns && other.addOns.length !== 0) ?
                                            other.addOns.map(addOn => (
                                                <Box key={addOn.item_id} pl={2} display='flex' justifyContent='space-between' width='100%'>
                                                    <Typography variant="body2">{addOn.name}:</Typography>
                                                    <Typography color='text.secondary'>₱{formatPrice(addOn.price)}</Typography>
                                                </Box>
                                            )) :
                                            undefined
                                        }
                                    </Box>
                                ))
                            }

                            <Box display='flex' justifyContent='space-between'>
                                <Typography><strong>Day/s:</strong></Typography>
                                <Typography color='text.secondary'>{selectedDate.duration >= 1 ? selectedDate.duration + 'd' : 'Daytime'}</Typography>
                            </Box>

                            <Box display='flex' justifyContent='space-between' borderTop='2px solid #ddd' mt={1} pt={1}>
                                <Typography><strong>Total Payment:</strong></Typography>
                                <Typography variant='body1'>₱{formatPrice(totalPayment)}</Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleConfirmBooking}
                            sx={{ mt: 3, }}
                            size='large'
                        >
                            Confirm Reservation
                        </Button>

                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} mx={{ xs: 1, md: 0 }}>
                    {selectedRooms.length !== 0 && (
                        <Box borderBottom='1px solid #ddd' pb={1}>
                            <Typography variant="h6" fontWeight={600} gutterBottom color='#333'>
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
                        <Box borderBottom='1px solid #ddd' pb={1}>
                            <Typography variant="h6" fontWeight={600} gutterBottom color='#333'>
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


                    {selectedOthers.length !== 0 && (
                        <Box borderBottom='1px solid #ddd' pb={1}>
                            <Typography variant="h6" fontWeight={600} gutterBottom color='#333'>
                                Others Selected
                            </Typography>
                            <Grid container spacing={2}>
                                {selectedOthers.map((other) => (
                                    <Grid key={other.id} item xs={12} sm={6} md={4}>
                                        {other.name}
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                image={other.images[0].url}
                                                alt={other.name}
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