import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControlLabel, Grid, Radio, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPhoneAlt, FaRegAddressBook, FaRegUserCircle } from "react-icons/fa";
import { IoIosPeople, IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { MdOutlineEmail } from 'react-icons/md';
import * as yup from 'yup';
import useCustomer from '../../../hooks/reservation/useCustomer';
import useDate from '../../../hooks/reservation/useDate';
import useServices from '../../../hooks/reservation/useServices';
import InputIcon from '../../../utility_components/InputIcon';
import RadioGroupHelper from '../../../utility_components/RadioGroupHelper';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import phoneInputRegex from '../../../utility_functions/phoneInputRegex';


const FillGuestInfo = ({ handleNext }) => {
    const { setCustomer, customer, setAccommodationType, accommodationType } = useCustomer();
    const { setDisabledDates, setResetSelectedDate, setSelectedDate } = useDate();
    const { setTab } = useServices();

    const schema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        phoneNumber: yup.string()
            .nullable()
            .test('is-valid-phone', 'Phone number is not valid', function (value) {
                // If value is null or empty, return true
                if (!value) return true;
                // Otherwise, check if it matches the phone number regex
                return phoneInputRegex.test(value);
            }),
        province: yup.string().required('Province is required').min(2, 'At least 2 characters'),
        city: yup.string().required('City/Municipality is required').min(2, 'At least 2 characters'),
        barangay: yup.string().required('Barangay is required').min(2, 'At least 2 characters'),
        guests: yup.number().typeError('Number of guests is required').min(1, 'At least 1 guests is required'),
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setCustomer(data);
        handleNext();
    };

    const isReadyToProceed = customer ? true : isValid;

    useEffect(() => {
        if (accommodationType === 'both') {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-rooms-and-cottages',
                setDataDirectly: setDisabledDates
            });
            setResetSelectedDate();
        } else if (accommodationType === 'rooms') {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-rooms',
                setDataDirectly: setDisabledDates
            });
            setResetSelectedDate();
        } else {
            basicGetCall({
                endpoint: 'api/reservations/unavailable-dates-by-cottages',
                setDataDirectly: setDisabledDates
            });
            setSelectedDate({ checkIn: new Date(), checkOut: new Date() });
        }
        setTab(0);
    }, [accommodationType]);

    return (
        <Box display='flex' gap={3}>

            <Box width='80%' >
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Typography variant="h5" mb={4} >
                        Guest Information
                    </Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between'>
                            <RadioGroupHelper
                                label='Accommodation Type'
                                defaultValue={accommodationType || 'both'}
                                setValue={setAccommodationType}
                            >
                                <FormControlLabel value="both" control={<Radio
                                    disableRipple
                                    color="default"
                                    checkedIcon={<IoMdRadioButtonOn />}
                                    icon={<IoMdRadioButtonOff />}
                                />} label="Both" />
                                <FormControlLabel value="rooms" control={<Radio
                                    disableRipple
                                    color="default"
                                    checkedIcon={<IoMdRadioButtonOn />}
                                    icon={<IoMdRadioButtonOff />}
                                />} label="Rooms" />
                                <FormControlLabel value="cottages" control={<Radio
                                    disableRipple
                                    color="default"
                                    checkedIcon={<IoMdRadioButtonOn />}
                                    icon={<IoMdRadioButtonOff />}
                                />} label="Cottages" />
                            </RadioGroupHelper>
                            <InputIcon
                                type='number'
                                size='small'
                                fullWidth={false}
                                defaultValue={customer?.guests}
                                Icon={IoIosPeople}
                                label='Guests'
                                name='guests'
                                register={register}
                                errors={errors}
                                placeholder='Enter number of guests'
                            />
                        </Grid>
                        <Grid item xs={12} gap={2} display='flex' alignItems='center' justifyContent='space-between'>
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
                        <Grid item xs={12} display='flex' gap={2}>
                            <InputIcon defaultValue={customer?.province} Icon={FaRegAddressBook} label='Province' name='province' register={register} errors={errors} placeholder='Enter province' />
                            <InputIcon defaultValue={customer?.barangay} label='Barangay' name='barangay' register={register} errors={errors} placeholder='Enter barangay' />
                            <InputIcon defaultValue={customer?.city} label='City' name='city' register={register} errors={errors} placeholder='Enter barangay' />
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color='primary'
                        type='submit'
                        size='large'
                        fullWidth
                        sx={{ mt: 5 }}
                        disabled={!isReadyToProceed}
                    >
                        Continue
                    </Button>
                </form>
            </Box>

            <Box sx={{ position: 'relative', width: '40%', height: 'auto', overflow: 'hidden' }}>
                <img src="resort/bg.jpg" alt="" width='100%' height='100%' />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(255, 120, 84, 0.9), rgba(253, 200, 48, 0.9), rgba(76, 161, 175, 0.9))',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        color: 'white',
                        justifyContent: 'center',
                        textAlign: 'center',
                        px: 2
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        Make Your Reservation Today!
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FillGuestInfo;
