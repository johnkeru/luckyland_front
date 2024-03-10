import { Box, Card, CardMedia, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import useBookingSummary from '../../../hooks/useBookingSummary';
import { formatDateToMonth } from '../../../utility_functions/formatTime';

const ConfirmBooking = () => {
    const { selectedRoom, date, customer } = useBookingSummary();
    const bookingDetails = {
        firstName: customer?.firstName,
        lastName: customer?.lastName,
        email: customer?.email,
        phone: customer?.phone,
        address: customer?.address,
        room: selectedRoom,
        startDate: date?.checkIn,
        endDate: date?.checkOut,
        duration: date?.duration,
    };
    console.log(selectedRoom)
    return (
        <Box>
            <Typography variant="h5" pl={2} gutterBottom>
                Booking Summary
            </Typography>

            <Grid display='flex' justifyContent='space-between'>

                <Grid p={2} width='30%'>
                    <Typography variant='body1' fontSize='1.2rem'>
                        Selected Room:  <strong>{bookingDetails.room.name}</strong>
                    </Typography>
                    <Typography variant='body1' fontSize='1.2rem'>
                        First Name:  <strong>{bookingDetails.firstName}</strong>
                    </Typography>
                    <Typography variant='body1' fontSize='1.2rem'>
                        Last Name:  <strong>{bookingDetails.lastName}</strong>
                    </Typography>
                    <Typography variant='body1' fontSize='1.2rem'>
                        Email:  <strong>{bookingDetails.email}</strong>
                    </Typography>
                    <Typography variant='body1' fontSize='1.2rem'>
                        Phone:  <strong>{bookingDetails.phone}</strong>
                    </Typography>
                    <Typography variant='body1' fontSize='1.2rem'>
                        Address:  <strong>{bookingDetails.address}</strong>
                    </Typography>

                    <Typography variant='body1' fontSize='1.2rem'>
                        Start Date:  <strong>{formatDateToMonth(bookingDetails.startDate)}</strong>
                    </Typography>
                    <Typography variant='body1' fontSize='1.2rem'>
                        End Date:  <strong>{formatDateToMonth(bookingDetails.endDate)}</strong>
                    </Typography>
                    <Typography variant='body1' fontSize='1.2rem'>
                        Day/s:  <strong>{bookingDetails.duration}</strong>
                    </Typography>
                </Grid>


                {bookingDetails?.room && <Grid width='70%' display='flex' flexWrap='wrap' gap={1}>
                    <Card key={bookingDetails.room.name} sx={{ width: '100%' }}>
                        <CardMedia
                            width='100%'
                            component="img"
                            height="400"
                            image={bookingDetails.room?.images[0].url}
                            alt={bookingDetails.room?.name}
                        />
                    </Card>
                </Grid>}
            </Grid>

        </Box>
    );
};

export default ConfirmBooking;
