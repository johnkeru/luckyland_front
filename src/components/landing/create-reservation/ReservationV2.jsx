import { Button, StepLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
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
import { useNavigate } from 'react-router'

import { FaUserAlt } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdBedroomParent } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import GCashIcon from '../../../utility_components/icons/GCashIcon';


import { styled } from '@mui/material/styles';

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        background:
            // 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            theme.palette.primary.dark,
        border: '1px solid #fff',
        // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        background:
            theme.palette.primary.main,
        border: '1px solid #fff',
        // 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <FaUserAlt />,
        2: <BsFillCalendarDateFill />,
        3: <MdBedroomParent />,
        4: <GiConfirmed />,
        5: <GCashIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} sx={{ fontWeight: 600, fontSize: 16, color: active ? 'white' : completed ? 'white' : 'gray' }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}


export default function ReservationV2() {
    const nav = useNavigate();

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
                    height: '100%',
                    m: 'auto',
                }}
            >

                <Box position='fixed' top={0} left={0} width='100%' zIndex={10}>
                    <Box width='100%' m='auto' bgcolor='primary.main' pt={1} pb={3}>
                        <Box display='flex' alignItems='center' gap={2} width='fit-content' m='auto' onClick={() => nav('/')}>
                            <img
                                width='70'
                                src='/logo/logo1.png'
                                alt="nature image"
                            />
                            <Typography variant='h4' fontWeight={700} color='white'>LuckyLand Resort</Typography>
                        </Box>
                    </Box>

                    <Box position='relative'>
                        <Stepper alternativeLabel activeStep={activeStep} connector={null} sx={{ position: 'absolute', width: { xs: '100%', lg: '80%' }, left: 0, right: 0, mx: 'auto', top: -25 }}>
                            {reservationSteps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepLabel
                                        onClick={!completed[index] ? undefined : () => handleStep(index)}
                                        StepIconComponent={ColorlibStepIcon}
                                        sx={{
                                            cursor: !completed[index] ? 'default' : 'pointer',
                                        }}
                                    >
                                        <Typography display={{ xs: 'none', lg: 'block' }}>{label}</Typography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Box bgcolor='white' width='100%' height={{ xs: '40px', lg: '75px' }} borderBottom='1px solid #c0c0c0' />
                    </Box>
                </Box>


                <Box px={2} width={{ xs: '100%', lg: '80%' }} m='auto' mt={16}>
                    <Box pt={{ xs: 3, md: 6 }} pb={2}>
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
