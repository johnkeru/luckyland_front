import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useState } from 'react';
import useStepper from '../../../hooks/reservation/useStepper';
import { reservationSteps } from '../../../hooks/useBookingSummaryReservation';
import useUser from '../../../hooks/useUser';
import Modal from '../../../utility_components/modal/Modal';
import FillGuestInfo from './FillGuestInfo';
import GCashPayment from './GCashPayment';
import OverallBookingSummary from './OverallBookingSummary';
import SelectDates from './SelectDates';
import TermsAndPolicy from './modal/TermsAndPolicy';
import ServicesTab from './rooms-services/services/ServicesTab';

export default function ReservationV2() {
    const [policyPopUp, setPolicyPopUp] = useState(false);
    const { user } = useUser();

    const { activeStep, setActiveStep, completed, setCompleted, privacyPolicy } = useStepper();

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
        if (!privacyPolicy.isConfirmed && !user) {
            const delay = 1000;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                setPolicyPopUp(true);
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [privacyPolicy]);



    return (
        <>
            {policyPopUp ? <Modal
                button={<Button sx={{ display: 'none' }}>hidden</Button>}
                open={policyPopUp}
                title='Terms & Policy'
                hasCloseIcon={false}
                children={
                    <TermsAndPolicy
                        setPolicyPopUp={setPolicyPopUp}
                    />
                }
            /> : undefined}


            <Box
                sx={{
                    width: { sm: '100%', md: '95%', lg: '90%', xl: '85%' }, // Responsive width
                    height: '100%',
                    m: 'auto',
                    p: 5,
                    py: 2,
                    bgcolor: 'white'
                }}
            >
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
                                        <SelectDates handleNext={handleNext} />
                                        :
                                        activeStep === 2 ?
                                            <ServicesTab handleNext={handleNext} handleStep={handleStep} /> :
                                            activeStep === 3 ?
                                                <OverallBookingSummary handleStep={handleStep} handleNext={handleNext} /> :
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
