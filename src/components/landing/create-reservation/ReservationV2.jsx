import { Button, StepConnector, StepLabel, Typography, stepConnectorClasses, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
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

import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import CopyRight from '../../../utility_components/CopyRight';
import GCashIcon from '../../../utility_components/icons/GCashIcon';

import { useTheme } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { LOGO } from '../../../cloud/mainImages';
import { isFrontDesk } from '../../../utility_functions/roles';
import scrollTop from '../../../utility_functions/scrollTop';

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
    [theme.breakpoints.down('md')]: {
        // Adjust width and height for mobile view using theme.breakpoints
        width: 40,
        height: 40,
    },
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.palette.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
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

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.down('md'));

    const [policyPopUp, setPolicyPopUp] = useState(false);
    const { user } = useUser();
    const { activeStep, setActiveStep, completed, setCompleted, privacyPolicy } = useStepper();

    const handleNext = () => {
        const newCompleted = [...completed];
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        setActiveStep(activeStep + 1);
        scrollTop();
    };

    const handleStep = (step) => {
        setActiveStep(step);
        scrollTop();
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

                <Box top={0} left={0} width='100%' zIndex={10}>
                    <Box width='100%' m='auto' bgcolor='primary.main' pt={{ xs: 0, md: 1 }} pb={{ xs: 0, md: 3 }}>
                        <Box display='flex' alignItems='center' py={1} gap={{ xs: 1, md: 2 }} width='fit-content' m='auto' onClick={() => nav('/')}>
                            <Box width={{ xs: 53, sm: 60, md: 70 }} mb={-.5} >
                                <img
                                    width='100%'
                                    src={LOGO}
                                    style={{ borderRadius: '50%' }}
                                    alt="nature image"
                                />
                            </Box>
                            <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, fontFamily: 'cursive' }} fontWeight={700} color='white'>LuckyLand Resort</Typography>
                        </Box>
                    </Box>

                    <Box mt={{ xs: isDesktop ? 0 : -2.5, md: -3.5 }} borderBottom='1px solid #c0c0c0'>
                        <Stepper
                            alternativeLabel
                            connector={isDesktop ? <ColorlibConnector /> : null}
                            activeStep={activeStep}
                            sx={{
                                width: { xs: '96%', lg: '70%' },
                                left: 0,
                                right: 0,
                                mx: 'auto',
                            }}>
                            {reservationSteps.map((label, index) => (
                                <Step key={label} completed={completed[index]} >
                                    <StepLabel
                                        onClick={!completed[index] ? undefined : () => handleStep(index)}
                                        StepIconComponent={ColorlibStepIcon}
                                        sx={{
                                            cursor: !completed[index] ? 'default' : 'pointer',
                                            py: .5,
                                        }}
                                    >
                                        {!isDesktop ? label : undefined}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Box>


                <Box width={{ xs: '100%', md: '90%', lg: '80%' }} mx='auto' >
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
                    <CopyRight my={2} />
                </Box>


            </Box >

        </>
    );
}
