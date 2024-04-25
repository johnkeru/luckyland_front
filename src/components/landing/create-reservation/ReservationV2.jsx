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
import CopyRight from '../../../utility_components/CopyRight';

import { styled } from '@mui/material/styles';
import { isFrontDesk } from '../../../utility_functions/roles';

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50, // Default width
    height: 50, // Default height
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        background: theme.palette.primary.dark,
        border: '1px solid #fff',
    }),
    ...(ownerState.completed && {
        background: theme.palette.primary.main,
        border: '1px solid #fff',
    }),
    [theme.breakpoints.down('sm')]: {
        // Adjust width and height for mobile view using theme.breakpoints
        width: 35,
        height: 35,
    },
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

    useEffect(() => {
        if (user) {
            if (!isFrontDesk(user.roles)) {
                window.history.back()
            }
        }
    }, [user])


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
                    <Box width='100%' m='auto' bgcolor='primary.main' pt={{ xs: 0, sm: 1 }} pb={{ xs: 2, sm: 3 }}>
                        <Box display='flex' alignItems='center' gap={2} width='fit-content' m='auto' onClick={() => nav('/')}>
                            <Box width={{ xs: 55, sm: 70 }}>
                                <img
                                    width='100%'
                                    src='/logo/logo1.png'
                                    alt="nature image"
                                />
                            </Box>
                            <Typography sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} fontWeight={700} color='white'>LuckyLand Resort</Typography>
                        </Box>
                    </Box>

                    <Box position='relative'>
                        <Stepper alternativeLabel activeStep={activeStep} connector={null} sx={{ position: 'absolute', width: { xs: '100%', lg: '80%' }, left: 0, right: 0, mx: 'auto', top: { xs: -20, sm: -25 } }}>
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
                        <Box bgcolor='white' width='100%' height={{ xs: '25px', sm: '40px', lg: '75px' }} borderBottom='1px solid #c0c0c0' />
                    </Box>
                </Box>


                <Box width={{ xs: '100%', lg: '80%' }} m='auto' mt={16}>
                    <Box pt={{ xs: 3, md: 6 }} pb={5}>
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
                                                <OverallBookingSummary handleNext={handleNext} /> :
                                                activeStep === 4 ?
                                                    <GCashPayment handleStep={handleStep} />
                                                    : undefined
                            }
                        </React.Fragment>
                    </Box>
                    <CopyRight mb={2} />
                </Box>


            </Box>

        </>
    );
}
