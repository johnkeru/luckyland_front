import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useState } from 'react';

import { DialogContent, Grid, StepLabel } from '@mui/material';
import { FaBed, FaCalendarAlt, FaCheckCircle, FaUser } from 'react-icons/fa';
import Services from './booking-services/Services';

import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import ConfirmBooking from './ConfirmBooking';
import GuestInformationForm from './GuestInformationForm';
import BookingCalendar4 from './booking-calendar/BookingCalendar4';
import useBookingSummary from '../../../hooks/useBookingSummary';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall'
import TermsAndPolicy from './TermsAndPolicy';
import useUser from '../../../hooks/useUser';
import Close_Modal from './Close_Modal';
import ConflictBooking_Modal from './ConflictBooking_Modal';

const steps = [
    {
        label: 'Rooms & Services',
        icon: <FaBed className="h-full w-full" />
    },
    {
        label: 'Select Dates',
        icon: <FaCalendarAlt className="h-full w-full" />
    },
    {
        label: 'Guest Information',
        icon: <FaUser className="h-full w-full" />
    },
    {
        label: 'Confirm Booking',
        icon: <FaCheckCircle className="h-full w-full" />
    }
];

export default function Booking({ button, onSuccessBooking }) {
    const { user } = useUser();
    const { selectedRoom, customer, guestInfo, privacyPolicy, date, price, setConflictMessage, conflictMessage, resetAll } = useBookingSummary();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleParentClosing = (title) => {
        if (!selectedRoom) {
            handleClose();
        } else {
            setCloseModalOpen(true);
            setCloseModalText(title);
        }
    }

    const [policyPopUp, setPolicyPopUp] = useState(false);
    const handleClosePolicyPopUp = () => setPolicyPopUp(false);
    const hiddenButton = <Button sx={{ display: 'none' }}>policy</Button>

    const [closeModalOpen, setCloseModalOpen] = useState(false);
    const [closeModalText, setCloseModalText] = useState('');

    const handleSureClose = () => {
        onSuccessBooking && onSuccessBooking();
        setOpen(false);
        resetAll();
        setActiveStep(0);
        setCloseModalOpen(false);

    }

    const [activeStep, setActiveStep] = useState(0);
    const handleNext = (step) => {
        if (step === 0) {
            setActiveStep(step);
            return;
        }
        if (step && step > 0) {
            setActiveStep(step);
            return;
        }
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleBookNow = () => {
        commonValidationCall({
            endpoint: 'api/createReservation',
            method: 'post',
            body: {
                room_id: selectedRoom.id,
                checkIn: date.checkIn,
                checkOut: date.checkOut,
                price: parseInt(price),
                customer_id: customer.customer_id,
                amountPaid: customer?.amountPaid || 0,
                ...guestInfo,
                ...privacyPolicy,
            },
            setLoading,
            setErrorState: setConflictMessage,
            hasToaster: true,
            toasterDelay: onSuccessBooking ? 8000 : 10000,
            handleClose: () => {
                setConflictMessage && setConflictMessage('');
                onSuccessBooking && onSuccessBooking();
                setOpen(false);
                resetAll();
                setActiveStep(0);
            }
        })
    }

    useEffect(() => {
        let timer;
        if (open && !privacyPolicy?.isConfirmed && !user) {
            const delay = 1000;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                setPolicyPopUp(true);
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [open, privacyPolicy]);

    const sampleButton = <Button>
        Reservation
    </Button>

    return (
        <>

            {closeModalOpen ? <Close_Modal
                setCloseModalOpen={setCloseModalOpen}
                handleSureClose={handleSureClose}
                closeModalText={closeModalText}
                closeModalOpen={closeModalOpen}
            /> : undefined}

            {policyPopUp ? <Modal
                button={hiddenButton}
                open={policyPopUp}
                title='Terms & Policy'
                hasCloseIcon={false}
                children={
                    <TermsAndPolicy handleClosePolicyPopUp={handleClosePolicyPopUp} handleClose={() => {
                        setPolicyPopUp(false); // close policy pop up
                        handleClose(); // close main
                    }} />
                }
            /> : undefined}

            {
                conflictMessage ? <ConflictBooking_Modal
                    conflictMessage={conflictMessage}
                    setConflictMessage={setConflictMessage}
                    handleNext={handleNext}
                /> : undefined}

            <Modal
                button={button || sampleButton}
                handleClose={() => handleParentClosing('close')}
                handleOpen={handleOpen}
                open={open}
                maxWidth="xl"
                title={
                    <Grid width='93%'>
                        Reservation
                        <Stepper nonLinear activeStep={activeStep} sx={{ width: '100%' }}>
                            {steps.map((step) => (
                                <Step key={step.label}>
                                    <StepLabel color="inherit">
                                        {step.label}
                                    </StepLabel>
                                    {/* <StepIcon icon={<FaCircleCheck color='green' />} /> */}
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                }
                loading={loading}
                children={
                    <>


                        {/* ALL CONTENTS ARE HERE! */}
                        <DialogContent dividers sx={{ width: '1200px', display: 'flex' }}>
                            <Box sx={{ width: '100%' }}>
                                <Box >
                                    {
                                        activeStep === 0 ? <Services handleNext={handleNext} /> :
                                            activeStep === 1 ? <BookingCalendar4 handleNext={handleNext} /> :
                                                activeStep === 2 ? <GuestInformationForm handleNext={handleNext} /> :
                                                    activeStep === 3 ? <ConfirmBooking /> : undefined
                                    }
                                </Box>
                            </Box>
                        </DialogContent>
                        {/* END ALL CONTENTS ARE HERE! */}



                        <CommonFooter sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained" size='medium'
                                color="error"
                                onClick={() => handleParentClosing('cancel')}
                                disabled={loading}
                            >
                                Cancel
                            </Button>

                            <Box sx={{ display: 'flex' }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {/* {activeStep === 3 ? <Button variant='contained' color='success' size='large'> Confirm Booking</Button> : <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Continue
                            </Button>} */}
                                {activeStep === 3 &&
                                    <ButtonWithLoading
                                        color='success'
                                        disabled={loading}
                                        onClick={handleBookNow}
                                        loading={loading}
                                        loadingText='Booking...'
                                    >
                                        Confirm Booking
                                    </ButtonWithLoading>
                                }
                            </Box>
                        </CommonFooter>
                    </>
                }
            />
        </>
    );
}
