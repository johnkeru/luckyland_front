import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const isLast = activeStep === steps.length - 1;
    const handleNext = () => setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleStep = (step) => () => setActiveStep(step);
    const handleLast = () => setActiveStep(steps.length - 1);

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} >
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                <React.Fragment>

                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                        Step {activeStep + 1} fc
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {!isLast && <Button onClick={handleLast}>Last</Button>}
                        <Button onClick={handleNext} sx={{ mr: 1 }} type={isLast ? 'submit' : 'button'}>
                            {isLast ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            </div>
        </Box>
    );
}
