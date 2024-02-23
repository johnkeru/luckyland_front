import React from 'react';
import { Paper, Typography, Grid, Box, Card, CardMedia, CardContent } from '@mui/material';
import RoomImagesCarousel from './booking-services/RoomImagesCarousel';
import useBookingSummary from '../../../hooks/useBookingSummary';
import { formatDateToMonth } from '../../../utility_functions/formatTime';

const sampleBookedroom =
{
    name: 'Beachfront Bungalow',
    images: [
        'https://source.unsplash.com/random/500x300?beachfront-bungalow-1',
        'https://source.unsplash.com/random/500x300?beachfront-bungalow-2',
        'https://source.unsplash.com/random/500x300?beachfront-bungalow-3'
    ],
    description: 'Description of the Beachfront Bungalow.',
    price: 1200,
};

const ConfirmBooking = () => {
    const { total_charge, selectedRooms, date, customer } = useBookingSummary();
    const bookingDetails = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        rooms: selectedRooms,
        startDate: date.checkIn,
        endDate: date.checkOut,
        duration: date.duration,
        totalAmount: total_charge * date.duration // Total amount
    };

    return (
        <Paper variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Booking Summary
            </Typography>

            <Grid display='flex' justifyContent='space-between' boxShadow={2} p={4}>

                <Grid boxShadow={2} p={2} width='35%'>
                    <Typography >
                        <strong>First Name:</strong> {bookingDetails.firstName}
                    </Typography>
                    <Typography >
                        <strong>Last Name:</strong> {bookingDetails.lastName}
                    </Typography>
                    <Typography >
                        <strong>Email:</strong> {bookingDetails.email}
                    </Typography>
                    <Typography >
                        <strong>Phone:</strong> {bookingDetails.phone}
                    </Typography>
                    <Typography >
                        <strong>Address:</strong> {bookingDetails.address}
                    </Typography>

                    <Typography >
                        <strong>Start Date:</strong> {formatDateToMonth(bookingDetails.startDate)}
                    </Typography>
                    <Typography >
                        <strong>End Date:</strong> {formatDateToMonth(bookingDetails.endDate)}
                    </Typography>
                    <Typography >
                        <strong>Total Rooms:</strong> {bookingDetails.rooms.length}
                    </Typography>
                    <Typography >
                        <strong>Day/s:</strong> {bookingDetails.duration}
                    </Typography>
                    <Typography >
                        <strong>Total Amount:</strong> {bookingDetails.totalAmount}
                    </Typography>
                </Grid>


                <Grid width='63%' display='flex' flexWrap='wrap' gap={1} sx={bookingDetails.rooms.length > 2 ? { overflowY: 'scroll', height: '50vh' } : undefined}>
                    {
                        bookingDetails.rooms.map(room => (
                            <Card key={room.name} sx={{ width: bookingDetails.rooms.length > 1 ? '48%' : '100%' }}>
                                <CardMedia
                                    width='100%'
                                    component="img"
                                    height="240"
                                    image={room.images[0].url}
                                    alt={room.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {room.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {room.description}
                                    </Typography>
                                    <Typography variant="body2" mt={1}>
                                        Price: ${room.price} per night
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    }
                </Grid>
            </Grid>

        </Paper>
    );
};

export default ConfirmBooking;
