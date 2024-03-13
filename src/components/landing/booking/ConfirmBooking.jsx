import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import useBookingSummary from '../../../hooks/useBookingSummary';
import { formatDateToMonth } from '../../../utility_functions/formatTime';
import RoomImagesCarousel from './booking-services/RoomImagesCarousel';

const ConfirmBooking = () => {
    const { selectedRoom, date, customer } = useBookingSummary();
    const bookingDetails = {
        firstName: customer?.firstName,
        lastName: customer?.lastName,
        email: customer?.email,
        phoneNumber: customer?.phoneNumber,
        address: `${customer?.street}, ${customer?.state}, ${customer?.city}`,
        room: selectedRoom,
        startDate: date?.checkIn,
        endDate: date?.checkOut,
        duration: date?.duration,
    };


    return (
        <Box>
            <Typography variant="h5" pl={2} gutterBottom>
                Booking Summary
            </Typography>

            <Grid display='flex' justifyContent='space-between'>

                <Grid p={2} width='fit-content'>
                    <Typography variant='h6' gutterBottom>
                        Selected Room:  <strong>{bookingDetails?.room?.name}</strong>
                    </Typography>
                    <Typography variant='h6' >
                        First Name:  <strong>{bookingDetails?.firstName}</strong>
                    </Typography>
                    <Typography variant='h6' >
                        Last Name:  <strong>{bookingDetails?.lastName}</strong>
                    </Typography>
                    <Typography variant='h6' >
                        Email:  <strong>{bookingDetails?.email}</strong>
                    </Typography>
                    <Typography variant='h6' >
                        Phone Number:  <strong>{bookingDetails?.phoneNumber}</strong>
                    </Typography>
                    <Typography variant='h6' gutterBottom>
                        Address:  <strong>{bookingDetails?.address}</strong>
                    </Typography>

                    <Typography variant='h6' >
                        Day/s:  <strong>{bookingDetails?.duration}</strong>
                    </Typography>
                    <Typography variant='h6' >
                        From:  <strong>{formatDateToMonth(bookingDetails?.startDate)}</strong>
                    </Typography>
                    <Typography variant='h6' >
                        To:  <strong>{formatDateToMonth(bookingDetails?.endDate)}</strong>
                    </Typography>
                </Grid>


                {bookingDetails?.room && <Grid width='75%' display='flex' flexWrap='wrap' gap={1}>
                    <Card key={bookingDetails?.room.name} sx={{ width: '100%' }}>
                        <RoomImagesCarousel images={bookingDetails?.room.images} />

                    </Card>
                </Grid>}
            </Grid>

        </Box>
    );
};

export default ConfirmBooking;
