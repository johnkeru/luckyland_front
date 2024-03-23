import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useState } from 'react';

import { DialogContent, Grid, StepLabel } from '@mui/material';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

import ButtonWithLoading from '../../utility_components/ButtonWithLoading';
import CommonFooter from '../../utility_components/modal/CommonFooter';
import Modal from '../../utility_components/modal/Modal';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';

import { useLocation, useParams } from 'react-router';
import useBookingSummaryReservation from '../../hooks/useBookingSummaryReservation';
import Close_Modal from '../landing/booking/Close_Modal';
import ConfirmBooking from '../landing/booking/ConfirmBooking';
import ConflictBooking_Modal from '../landing/booking/ConflictBooking_Modal';
import BookingCalendar from './BookingCalendar';

const steps = [
    {
        label: 'Select Dates',
        icon: <FaCalendarAlt className="h-full w-full" />
    },
    {
        label: 'Confirm Booking',
        icon: <FaCheckCircle className="h-full w-full" />
    }
];

export default function RescheduleBooking() {
    const { customer, setCustomer, date, price, setSelectedRoom, setConflictMessage, conflictMessage, resetAll } = useBookingSummaryReservation();

    const { token } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const room_id = searchParams.get('room_id');
    const reservation = searchParams.get('reservation');
    const email = searchParams.get('email');

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleParentClosing = (title) => {
        setCloseModalOpen(true);
        setCloseModalText(title);
    }

    const [closeModalOpen, setCloseModalOpen] = useState(false);
    const [closeModalText, setCloseModalText] = useState('');

    const handleSureClose = () => {
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
                checkIn: date.checkIn,
                checkOut: date.checkOut,
                price: parseInt(price),
                customer_id: customer.customer_id,
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

    const sampleButton = <Button sx={{ display: 'none' }}>
        Reservation
    </Button>


    useEffect(() => {
        basicGetCall({
            endpoint: 'api/getRoomWithUnavailableDates/' + room_id,
            setDataDirectly: e => {
                setSelectedRoom(e);
            },
            setLoading
        });

        basicGetCall({
            endpoint: 'api/getCustomer?email=' + email,
            setDataDirectly: e => {
                setCustomer(e);
            },
            setLoading
        });
    }, []);

    return (
        <>

            {closeModalOpen ? <Close_Modal
                setCloseModalOpen={setCloseModalOpen}
                handleSureClose={handleSureClose}
                closeModalText={closeModalText}
                closeModalOpen={closeModalOpen}
            /> : undefined}

            {
                conflictMessage ? <ConflictBooking_Modal
                    conflictMessage={conflictMessage}
                    setConflictMessage={setConflictMessage}
                    handleNext={handleNext}
                /> : undefined}

            <Modal
                button={sampleButton}
                handleClose={() => handleParentClosing('close')}
                open={true}
                maxWidth="xl"
                title={
                    <Grid width='93%'>
                        Reschedule
                        <Stepper nonLinear activeStep={activeStep} sx={{ width: '100%' }}>
                            {steps.map((step) => (
                                <Step key={step.label}>
                                    <StepLabel color="inherit">
                                        {step.label}
                                    </StepLabel>
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
                                        activeStep === 0 ? <BookingCalendar handleNext={handleNext} /> :
                                            activeStep === 1 ? <ConfirmBooking /> : undefined
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

                                {activeStep === 1 &&
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
