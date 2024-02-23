import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useBookingSummary from '../../../hooks/useBookingSummary';
import BookingSummary from './BookingSummary';

const GuestInformationForm = ({ handleNext }) => {

    const { setCustomer, customer, selectedRooms } = useBookingSummary();

    const schema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        phone: yup.string().required('Phone number is required'),
        address: yup.string().required('Address is required'),
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        // Handle form submission here, e.g., send data to backend
        setCustomer(data);
        handleNext();
    };

    const isReadyToProceed = customer ? true : watch('address') && watch('email') && watch('firstName') && watch('lastName') && watch('phone');

    useEffect(() => {
        if (selectedRooms && selectedRooms.length === 0) {
            handleNext(1);
        }
    }, [selectedRooms])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid display='flex' gap={2} >
                <Paper variant="outlined" sx={{ padding: 2, width: '75%' }}>
                    <Typography variant="h5" gutterBottom>
                        Guest Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                defaultValue={customer?.firstName}
                                label="First Name"
                                name="firstName"
                                {...register('firstName')}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                defaultValue={customer?.lastName}
                                name="lastName"
                                {...register('lastName')}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                defaultValue={customer?.email}
                                name="email"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                defaultValue={customer?.phone}
                                {...register('phone')}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                defaultValue={customer?.address}
                                label="Address"
                                name="address"
                                {...register('address')}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Box width='25%' position='relative'>
                    <BookingSummary
                        nextButton={
                            <Button type='submit' disabled={!isReadyToProceed} variant="contained" color='info' fullWidth>
                                Proceed to booking
                            </Button>
                        }
                    />
                </Box>
            </Grid>
        </form>
    );
};

export default GuestInformationForm;
