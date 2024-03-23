import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegAddressBook } from 'react-icons/fa';
import * as yup from 'yup';
import useBookingSummaryReservation from '../../../hooks/useBookingSummaryReservation';
import InputIcon from '../../../utility_components/InputIcon';

const FillGuestInfo = ({ handleNext }) => {

    const { setCustomer, customer } = useBookingSummaryReservation();

    const phoneRegExp = /^(\+?63|0)9\d{9}$/;

    const schema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        phoneNumber: yup.string()
            .required('Phone number is required')
            .matches(phoneRegExp, 'Phone number is not valid'),
        province: yup.string().required('Province is required').min(2, 'At least 2 characters'),
        city: yup.string().required('City/Municipality is required').min(2, 'At least 2 characters'),
        barangay: yup.string().required('Barangay is required').min(2, 'At least 2 characters'),
    });

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setCustomer(data);
        handleNext();
    };

    const isReadyToProceed = customer ? true : watch('province') && watch('barangay') && watch('city') && watch('email') && watch('firstName') && watch('lastName') && watch('phoneNumber');

    return (
        <Box sx={{ width: '94%', m: 'auto' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" mb={5} >
                    Guest Information
                </Typography>
                <Grid container spacing={5}>
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
                            label="Phone number"
                            name="phoneNumber"
                            defaultValue={customer?.phoneNumber}
                            {...register('phoneNumber')}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                        />
                    </Grid>
                    <Grid item xs={12} display='flex' gap={2}>
                        <InputIcon defaultValue={customer?.province} Icon={FaRegAddressBook} label='Province' name='province' register={register} errors={errors} placeholder='Enter province' />
                        <InputIcon defaultValue={customer?.barangay} label='Barangay' name='barangay' register={register} errors={errors} placeholder='Enter barangay' />
                        <InputIcon defaultValue={customer?.city} label='City' name='city' register={register} errors={errors} placeholder='Enter city' />
                    </Grid>
                </Grid>


                <Button
                    variant="contained"
                    color='info'
                    type='submit'
                    size='large'
                    fullWidth
                    sx={{ mt: 10 }}
                    disabled={!isReadyToProceed}
                >
                    Continue
                </Button>
            </form>
        </Box>
    );
};

export default FillGuestInfo;
