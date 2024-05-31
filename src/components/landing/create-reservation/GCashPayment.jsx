import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbCurrencyPeso } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import useAfterReservation from '../../../hooks/reservation/useAfterReservation';
import useCustomer from '../../../hooks/reservation/useCustomer';
import useDate from '../../../hooks/reservation/useDate';
import useServices from '../../../hooks/reservation/useServices';
import useStepper from '../../../hooks/reservation/useStepper';
import useUser from '../../../hooks/useUser';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../utility_components/InputIcon';
import GCashIcon from '../../../utility_components/icons/GCashIcon';
import formatPrice from '../../../utility_functions/formatPrice';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import ConflictBooking_Modal from './modal/ConflictBooking_Modal';
import useSettingUpPayment from '../../../hooks/reservation/useSettingUpPayment';

const GCashPayment = ({ handleStep }) => {
    const { user } = useUser();
    const validationSchema = yup.object().shape({
        gCashRefNumber: user ? yup.string() : yup.string()
            .required('GCash Reference Number is required')
            .matches(/^[a-zA-Z0-9]{12}$/, 'Invalid GCash Reference Number'),
        payment: yup.string()
    });

    const { conflictReservation, setConflictReservation, } = useAfterReservation();
    const { totalRoomsPrice, totalCottagesPrice, totalOthersPrice } = useSettingUpPayment();

    const { resetDate } = useDate();
    const { resetStepper } = useStepper();
    const { resetCustomer } = useCustomer();
    const { resetServices } = useServices();

    const resetAll = () => {
        resetDate();
        resetStepper();
        resetCustomer();
        resetServices();
    }

    const { register, handleSubmit, watch, formState: { errors, isValid, } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const invalidIfNoInput = !watch('gCashRefNumber') && !watch('payment');

    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const { privacyPolicy } = useStepper();

    const { customer, accommodationType } = useCustomer();
    const { selectedDate } = useDate();
    const { selectedRooms, selectedCottages, selectedOthers } = useServices();

    const onSubmit = (data) => {
        const parsePayment = watch('payment') ? parseInt(watch('payment')) : null;
        const parseGcashRef = watch('gCashRefNumber') || null;
        delete data.payment;

        const reservationData = {
            rooms: selectedRooms,
            cottages: selectedCottages,
            others: selectedOthers,
            total: (totalRoomsPrice + totalCottagesPrice + totalOthersPrice) * (selectedDate.duration || 1),
            checkIn: new Date(selectedDate.checkIn).toISOString().slice(0, 10),
            checkOut: new Date(selectedDate.checkOut).toISOString().slice(0, 10),
            guests: customer.guests,
            totalRoomsPrice,
            totalCottagesPrice,
            totalOthersPrice,
            days: selectedDate.duration,
            customer,
            isWalkIn: user ? true : false,
            accommodationType,
            ...privacyPolicy
        };

        const preparedData = Object.assign(reservationData, { gCashRefNumber: parseGcashRef }, { paid: parsePayment });

        // checkIn: new Date(selectedDate.checkIn),
        //     checkOut: new Date(selectedDate.checkOut),

        commonValidationCall({
            endpoint: 'api/reservations/create-reservation',
            method: 'post',
            body: preparedData,
            setLoading,
            hasToaster: true,
            setConflict: setConflictReservation,
            handleClose: () => {
                resetAll();
                nav('/reservation');
            }
        });

    };


    return (
        <>
            {/* {conflictReservation ? <ConflictBooking_Modal
                handleStep={handleStep}
            /> : undefined} */}

            <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 1, sm: 2, md: 4 }} pt={2} px={{ xs: 2, lg: 0 }}>
                <Box width={{ xs: '100%', md: '30%' }} display='flex' flexDirection='column' alignItems='center'>
                    <Typography variant='h6' fontWeight={600} gutterBottom>Resort's GCash: XXXXXXXXXX</Typography>
                    <Box height={{ xs: '100%', sm: 450, md: '100%', }}>
                        <img src="https://res.cloudinary.com/kerutman/image/upload/v1714311640/mamgcash2_xxwc8m.webp" alt="Gcash" style={{ width: '100%', height: '100%', borderRadius: '8px', marginBottom: '8px' }} />
                    </Box>
                </Box>

                <Box width={{ xs: '100%', md: '70%' }} bgcolor={grey[50]} border={`2px solid ${grey[200]}`} borderRadius={3} p={2}>
                    <Typography variant='h6' fontWeight={600} gutterBottom>{!user ? 'GCash Reference Code (Initial 500 pesos only)' : 'Choose the payment.'}</Typography>


                    <Typography variant='h6' gutterBottom mb={2}>
                        Total payment: ₱<b>{formatPrice(((totalRoomsPrice + totalCottagesPrice + totalOthersPrice) * selectedDate.duration) || 0)}</b>
                    </Typography>

                    <Typography variant='body1' gutterBottom mb={2}>
                        Enter the GCash reference code provided for payment.
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box display='grid'>
                            <InputIcon
                                name='gCashRefNumber'
                                label='GCash Reference Number'
                                fullWidth
                                Icon={GCashIcon}
                                errors={errors}
                                placeholder='Enter your GCash Reference Number here'
                                register={register}

                            />

                            {
                                !user ? undefined :
                                    <>
                                        <Typography variant='body1' gutterBottom my={2}>
                                            On hand payment
                                        </Typography>
                                        <InputIcon
                                            type='number'
                                            label='Payment'
                                            name='payment'
                                            register={register}
                                            errors={errors}
                                            placeholder='Enter Payment'
                                            sx={{ mb: 1.5, }}
                                            Icon={TbCurrencyPeso}
                                        />
                                    </>
                            }

                            <ButtonWithLoading
                                type="submit"
                                loading={loading}
                                loadingText='Confirming...'
                                variant="contained"
                                sx={{ mt: 2, px: 4, width: 'fit-content' }}
                                disabled={invalidIfNoInput || !isValid}
                            >
                                Confirm
                            </ButtonWithLoading>
                        </Box>
                    </form>
                    <Typography variant='body1' mt={2}>
                        Thank you for choosing our resort for your reservation!
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default GCashPayment;
