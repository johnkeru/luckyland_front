import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';
import FillGuestInfo from '../components/landing/create-reservation/FillGuestInfo';
import SelectDates from '../components/landing/create-reservation/SelectDates';
import { Typography } from '@mui/material';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function ReservationNew() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Array(steps.length).fill(false));

    const handleNext = () => {
        const newCompleted = [...completed];
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Array(steps.length).fill(false));
    };

    return (
        <Box sx={{ width: '80%', m: 'auto', py: 2 }}>
            <Box display='flex' alignItems='center' gap={2} mb={2}>
                <img
                    width='65'
                    src='/logo/logo1.png'
                    alt="nature image"
                />
                <Typography variant='h3' color='GrayText'>Reservation</Typography>
            </Box>

            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" disabled={!completed[index]} onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <Box mt={5}>
                <React.Fragment>

                    {
                        activeStep === 0 ?
                            <FillGuestInfo handleNext={handleNext} /> :
                            activeStep === 1 ?
                                <SelectDates handleNext={handleNext} />

                                : undefined
                    }
                </React.Fragment>
            </Box>
        </Box >
    );
}
