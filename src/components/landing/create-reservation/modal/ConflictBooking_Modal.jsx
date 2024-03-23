import { Button, DialogContent, Typography } from '@mui/material';
import React from 'react';
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineBedroomChild } from 'react-icons/md';
import SimpleButtonWTextIcon from '../../../../utility_components/SimpleButtonWTextIcon';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from '../../../../utility_components/modal/Modal';

const ConflictBooking_Modal = ({ handleNext, conflictMessage, setConflictMessage, isReschedule }) => {
    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>

    const handleBackToRoom = () => {
        handleNext(0); // 0 means index 0 (room step)
        setConflictMessage('');
    }

    const handleBackToCalendar = () => {
        handleNext(isReschedule ? 0 : 1); // 1 means index 1 (calendar step) but if isReschedule then 0 is calendar
        setConflictMessage('');
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
                        {!isReschedule ? <SimpleButtonWTextIcon onClick={handleBackToRoom} color='info' text='Change Room' Icon={<MdOutlineBedroomChild />} /> : undefined}
                        <SimpleButtonWTextIcon onClick={handleBackToCalendar} color='secondary' text='Change Dates' Icon={<BsCalendar2Date />} />
                    </CommonFooter>

                </>
            }
        />
    )
}

export default ConflictBooking_Modal
