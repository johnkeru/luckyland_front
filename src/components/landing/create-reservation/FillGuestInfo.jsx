import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, Select, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPhoneAlt, FaRegAddressBook, FaRegUserCircle } from "react-icons/fa";
import { IoIosPeople, IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { MdOutlineEmail } from 'react-icons/md';
import * as yup from 'yup';
import useAfterReservation from '../../../hooks/reservation/useAfterReservation';
import useCustomer from '../../../hooks/reservation/useCustomer';
import useDate from '../../../hooks/reservation/useDate';
import useServices from '../../../hooks/reservation/useServices';
import useStepper from '../../../hooks/reservation/useStepper';
import useUser from '../../../hooks/useUser';
import InputIcon from '../../../utility_components/InputIcon';
import phoneInputRegex from '../../../utility_functions/phoneInputRegex';

const FillGuestInfo = ({ handleNext }) => {
    const { user } = useUser();

    const { setCustomer, customer, setAccommodationType, accommodationType } = useCustomer();
    const { resetDate } = useDate();
    const { resetServices } = useServices();
    const { resetAfterReservation } = useAfterReservation();
    const { resetSteps } = useStepper();

    const handleSetAccommodationType = (event) => {
        // must reset!
        resetDate();
        resetServices();
        resetAfterReservation();
        resetSteps();
        setAccommodationType(event.target.value);
    }

    const nameRegex = /^[A-Za-z\s]+$/;

    const schema = yup.object().shape({
        firstName: yup.string()
            .required('First name is required')
            .min(2, 'First name must be at least 2 characters long')
            .matches(nameRegex, 'First name must not contain numbers or special characters'),
        lastName: yup.string()
            .required('Last name is required')
            .min(2, 'Last name must be at least 2 characters long')
            .matches(nameRegex, 'Last name must not contain numbers or special characters'),
        email: yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phoneNumber: yup.string()
            .nullable()
            .test('is-valid-phone', 'Phone number is not valid', function (value) {
                // If value is null or empty, return true
                if (!value) return true;
                // Otherwise, check if it matches the phone number regex
                return phoneInputRegex.test(value);
            }),
        province: yup.string()
            .required('Province is required')
            .min(2, 'Province must be at least 2 characters long'),
        city: yup.string()
            .required('City/Municipality is required')
            .min(2, 'City/Municipality must be at least 2 characters long'),
        barangay: yup.string()
            .required('Barangay is required')
            .min(2, 'Barangay must be at least 2 characters long'),
        guests: yup.number()
            .typeError('Number of guests is required')
            .min(1, 'At least 1 guest is required'),
    });

    const { register, handleSubmit, formState: { errors, } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setCustomer(data);
        handleNext();
    };

    // const isReadyToProceed = customer ? true : isValid;


    return (
        <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={3} px={{ xs: 2, lg: 0 }}>
            <Box width={{ xs: '100%', md: '80%' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4" mb={{ xs: 1.5, sm: 3 }} mt={2} sx={{ color: '#004d40' }}>
                        Guest Information
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 4 }}>
                        <Grid item xs={12} display='flex' gap={2} alignItems='center' justifyContent='space-between'>
                            <FormControl sx={{ width: '50%' }}>
                                <InputLabel id="accommodation-type-label">Accommodation Type</InputLabel>
                                <Select
                                    size='small'
                                    labelId="accommodation-type-label"
                                    value={accommodationType || 'all'}
                                    onChange={handleSetAccommodationType}
                                    label="Accommodation Type"
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="rooms">Rooms</MenuItem>
                                    <MenuItem value="cottages">Cottages</MenuItem>
                                    <MenuItem value="others">Others (Events)</MenuItem>
                                </Select>
                            </FormControl>
                            <InputIcon
                                sx={{ width: '50%' }}
                                type='number'
                                size='small'
                                defaultValue={customer?.guests}
                                Icon={IoIosPeople}
                                label='Guests'
                                name='guests'
                                register={register}
                                errors={errors}
                                placeholder='Enter number of guests'
                            />
                        </Grid>
                        <Grid item xs={12} gap={2} display={{ xs: 'grid', md: 'flex' }} flexDirection={{ xs: 'column', md: 'row' }} >
                            <InputIcon
                                fullWidth
                                defaultValue={customer?.firstName}
                                Icon={FaRegUserCircle}
                                label="First Name"
                                name="firstName"
                                register={register}
                                errors={errors}
                                placeholder='Enter First Name'
                            />
                            <InputIcon
                                fullWidth
                                defaultValue={customer?.lastName}
                                label="Last Name"
                                name="lastName"
                                register={register}
                                errors={errors}
                                placeholder='Enter Last Name'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputIcon
                                fullWidth
                                defaultValue={customer?.email}
                                Icon={MdOutlineEmail}
                                type="email"
                                label="Email"
                                name="email"
                                register={register}
                                errors={errors}
                                placeholder='Enter Email'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputIcon
                                fullWidth
                                defaultValue={customer?.phoneNumber}
                                Icon={FaPhoneAlt}
                                label="Phone Number (Optional)"
                                name="phoneNumber"
                                register={register}
                                errors={errors}
                                placeholder='Enter Phone Number'
                            />
                        </Grid>
                        <Grid item xs={12} display={{ xs: 'grid', md: 'flex' }} gap={2}>
                            <InputIcon defaultValue={customer?.province} Icon={FaRegAddressBook} label='Province' name='province' register={register} errors={errors} placeholder='Enter province' />
                            <InputIcon defaultValue={customer?.barangay} label='Barangay' name='barangay' register={register} errors={errors} placeholder='Enter barangay' />
                            <InputIcon defaultValue={customer?.city} label='City' name='city' register={register} errors={errors} placeholder='Enter city' />
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color='primary'
                        type='submit'
                        size='large'
                        fullWidth
                        sx={{ mt: 4, }}
                    // disabled={!isReadyToProceed}
                    >
                        Continue
                    </Button>
                </form>
            </Box>

            <Box sx={{ position: 'relative', width: '40%', height: 'auto', display: { xs: 'none', md: 'block' }, overflow: 'hidden' }}>
                <img src="./images/kokak.jpg"
                    alt="Resort Background"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
        </Box>
    );
};

export default FillGuestInfo;
