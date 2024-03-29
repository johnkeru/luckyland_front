import { Button, DialogContent, Typography } from '@mui/material';
import React from 'react';
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineBedroomChild } from 'react-icons/md';
import SimpleButtonWTextIcon from '../../../../utility_components/SimpleButtonWTextIcon';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from '../../../../utility_components/modal/Modal';
import useBookingSummaryReservation from '../../../../hooks/useBookingSummaryReservation';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';

const ConflictBooking_Modal = ({ handleStep, conflictMessage, setConflictMessage }) => {
    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>

    const { setBackToSelectDate, setDisabledDates } = useBookingSummaryReservation();

    const handleBackToSelectRoom = () => {
        handleStep(2);
        setBackToSelectDate(true);
        setConflictMessage('');
    }

    const handleBackToSelectDate = () => {
        basicGetCall({
            endpoint: 'api/reservations/getUnavailableDates',
            setDataDirectly: setDisabledDates,
            onSuccess: () => {
                handleStep(1);
                setBackToSelectDate();
                setConflictMessage('');
            }
        })
    }

    return (
        <Modal
            hasCloseIcon={false}
            button={hiddenButton}
            open={!!conflictMessage}
            maxWidth="sm"
            title='Room Just Booked'
            children={
                <>
                    <DialogContent dividers sx={{ width: '400px' }}>
                        <Typography variant="body1">
                            {conflictMessage}
                        </Typography>
                    </DialogContent>

                    <CommonFooter sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <SimpleButtonWTextIcon onClick={handleBackToSelectDate} color='secondary' text='Change Dates' Icon={<BsCalendar2Date />} />
                        <SimpleButtonWTextIcon onClick={handleBackToSelectRoom} color='info' text='Change Room' Icon={<MdOutlineBedroomChild />} />
                    </CommonFooter>

                </>
            }
        />
    )
}

export default ConflictBooking_Modal
