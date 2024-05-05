import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControlLabel, Grid, Radio, Typography } from '@mui/material';
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
import RadioGroupHelper from '../../../utility_components/RadioGroupHelper';
import phoneInputRegex from '../../../utility_functions/phoneInputRegex';

const FillGuestInfo = ({ handleNext }) => {
    const { user } = useUser();

    const { setCustomer, customer, setAccommodationType, accommodationType } = useCustomer();
    const { resetDate } = useDate();
    const { resetServices } = useServices();
    const { resetAfterReservation } = useAfterReservation();
    const { resetSteps } = useStepper();

    const handleSetAccommodationType = (value) => {
        // must reset!
        resetDate();
        resetServices();
        resetAfterReservation();
        resetSteps();
        setAccommodationType(value);
    }

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
        guests: yup.number().typeError('Number of guests is required').min(1, 'At least 1 guest is required'),
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
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
                        <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between'>
                            <RadioGroupHelper
                                label='Accommodation Type'
                                defaultValue={accommodationType || 'both'}
                                setValue={handleSetAccommodationType}
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
                                defaultValue={customer?.guests}
                                size='small'
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
                <img src="https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg"
                    alt="Resort Background"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
        </Box>
    );
};

export default FillGuestInfo;
