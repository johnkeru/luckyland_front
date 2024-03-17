import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegAddressBook } from 'react-icons/fa';
import * as yup from 'yup';
import useBookingSummary from '../../../hooks/useBookingSummary';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../utility_components/InputIcon';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import BookingSummary from './BookingSummary';
import useUser from '../../../hooks/useUser';
import { FaPesoSign } from "react-icons/fa6";

const GuestInformationForm = ({ handleNext }) => {

    const { setCustomer, customer } = useBookingSummary();
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    const schema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        phoneNumber: yup.string().required('Phone number is required'),
        street: yup.string().required('Street is required').min(2, 'At least 2 characters'),
        state: yup.string().required('State is required').min(2, 'At least 2 characters'),
        city: yup.string().required('City is required').min(2, 'At least 2 characters'),
        amountPaid: user ? yup.number().required().min(1, "Please enter an amount.") : yup.number(),
    });

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        commonValidationCall({
            endpoint: 'api/reservation/create-customer',
            method: 'post',
            body: data,
            setError,
            setLoading,
            setResponse: e => {
                setCustomer(Object.assign(data, { customer_id: e.customer_id }));
                handleNext();
            }
        });
    };

    const isReadyToProceed = customer ? true : watch('street') && watch('state') && watch('city') && watch('email') && watch('firstName') && watch('lastName') && watch('phoneNumber');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid display='flex' gap={2} >
                <Paper variant="outlined" sx={{ padding: 2, width: '70%', pb: 5 }}>
                    <Typography variant="h5" gutterBottom>
                        Guest Information
                    </Typography>
                    <Grid container spacing={3}>
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
                            <InputIcon defaultValue={customer?.street} Icon={FaRegAddressBook} label='Street' name='street' register={register} errors={errors} placeholder='Enter street' />
                            <InputIcon defaultValue={customer?.state} label='State' name='state' register={register} errors={errors} placeholder='Enter state' />
                            <InputIcon defaultValue={customer?.city} label='City' name='city' register={register} errors={errors} placeholder='Enter city' />
                        </Grid>
                        {user ? <Grid item xs={12} sm={12}>
                            <InputIcon
                                defaultValue={customer?.amountPaid || 0}
                                Icon={FaPesoSign}
                                label='Payment'
                                name='amountPaid'
                                register={register}
                                type='number'
                                errors={errors}
                                placeholder='Enter payment'
                            />
                        </Grid> : undefined}
                    </Grid>
                </Paper>

                <Box width='30%' position='relative'>
                    <BookingSummary
                        handleNext={handleNext}
                        nextButton={
                            <ButtonWithLoading
                                color='info'
                                type='submit'
                                fullWidth
                                disabled={loading || !isReadyToProceed}
                                loading={loading}
                                loadingText='Proceeding...'
                            >
                                Proceed to booking
                            </ButtonWithLoading>
                        }
                    />
                </Box>
            </Grid>
        </form>
    );
};

export default GuestInformationForm;
