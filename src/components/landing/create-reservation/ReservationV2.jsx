import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useState } from 'react';
import FillGuestInfo from './FillGuestInfo';
import SelectDates from './SelectDates';
import { Button, Typography } from '@mui/material';
import SelectingRoom from './rooms-services/SelectingRoom';
import useBookingSummaryReservation, { reservationSteps } from '../../../hooks/useBookingSummaryReservation';
import ConfirmationReservation from './ConfirmationReservation';
import Modal from '../../../utility_components/modal/Modal';
import TermsAndPolicy from './modal/TermsAndPolicy'
import useUser from '../../../hooks/useUser';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import GCashPayment from './GCashPayment';

export default function ReservationV2() {
    const [policyPopUp, setPolicyPopUp] = useState(false);
    const { user } = useUser();
    const { activeStep, setActiveStep, completed, setCompleted, privacyPolicy, disabledDates, setDisabledDates, resetAll } = useBookingSummaryReservation();

    // React.useEffect(() => resetAll(), []);

    const handleNext = () => {
        const newCompleted = [...completed];
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        setActiveStep(activeStep + 1);
    };

    const handleStep = (step) => {
        setActiveStep(step);
    };

    useEffect(() => {
        let timer;
        if (!privacyPolicy?.isConfirmed && !user) {
            const delay = 1000;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                setPolicyPopUp(true);
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [privacyPolicy]);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/reservations/getUnavailableDatesByRooms',
            setDataDirectly: setDisabledDates
        })
    }, []);

    return (
        <>
            {policyPopUp ? <Modal
                button={<Button sx={{ display: 'none' }}>hidden</Button>}
                open={policyPopUp}
                title='Terms & Conditions'
                hasCloseIcon={false}
                children={
                    <TermsAndPolicy
                        setPolicyPopUp={setPolicyPopUp}
                    />
                }
            /> : undefined}


            <Box sx={{ width: '85%', height: '100%', m: 'auto', p: 5, pt: 2, bgcolor: 'white' }}>
                <Box display='flex' alignItems='center' gap={2} mb={2}>
                    <img
                        width='65'
                        src='/logo/logo1.png'
                        alt="nature image"
                    />
                    <Typography variant='h4' color='GrayText'>Reservation</Typography>
                </Box>

                <Box px={2}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {reservationSteps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" disabled={!completed[index]} onClick={() => handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <Box mt={3}>
                        <React.Fragment>

                            {
                                activeStep === 0 ?
                                    <FillGuestInfo handleNext={handleNext} /> :
                                    activeStep === 1 ?
                                        <SelectDates handleNext={handleNext} disabledDates={disabledDates} />
                                        :
                                        activeStep === 2 ?
                                            <SelectingRoom handleNext={handleNext} /> :
                                            activeStep === 3 ?
                                                <ConfirmationReservation handleStep={handleStep} handleNext={handleNext} /> :
                                                activeStep === 4 ?
                                                    <GCashPayment />
                                                    : undefined
                            }
                        </React.Fragment>
                    </Box>
                </Box>
            </Box>

        </>
    );
}
