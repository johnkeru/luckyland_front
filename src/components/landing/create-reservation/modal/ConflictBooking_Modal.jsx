import { Button, DialogContent, Typography } from '@mui/material';
import React from 'react';
import { MdOutlineBedroomChild, MdOutlineCottage } from 'react-icons/md';
import useCustomer from '../../../../hooks/reservation/useCustomer';
import useServices from '../../../../hooks/reservation/useServices';
import SimpleButtonWTextIcon from '../../../../utility_components/SimpleButtonWTextIcon';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from '../../../../utility_components/modal/Modal';

const ConflictBooking_Modal = ({ handleStep, conflictReservation, setConflictReservation }) => {
    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>

    const { removeRoom, setTab, removeCottage } = useServices();
    const { accommodationType } = useCustomer();

    const conflictRooms = conflictReservation.data.reservedRoomIds;
    const conflictCottages = conflictReservation.data.reservedCottageIds;

    const handleBackToSelectRooms = () => {
        conflictRooms.forEach(conflictRoomId => removeRoom({ id: conflictRoomId }));
        handleStep(2);
        setTab(accommodationType === 'both' ? 1 : accommodationType === 'rooms' ? 1 : 0);
        setConflictReservation(null)
    }

    const handleBackToSelectCottages = () => {
        conflictCottages.forEach(conflictCottageId => removeCottage({ id: conflictCottageId }));
        handleStep(2);
        setTab(accommodationType === 'both' ? 2 : accommodationType === 'cottages' ? 1 : 0);
        setConflictReservation(null)
    }

    return (
        <Modal
            hasCloseIcon={false}
            button={hiddenButton}
            open={!!conflictReservation.message}
            maxWidth="sm"
            title={conflictRooms && conflictRooms.length !== 0 ? 'Room Just Booked' : 'Cottage Just Booked'}
            children={
                <>
                    <DialogContent dividers sx={{ width: '400px' }}>
                        <Typography variant="body1">
                            {conflictReservation.message}
                        </Typography>
                    </DialogContent>

                    <CommonFooter>
                        {
                            (conflictRooms && conflictRooms.length !== 0) ?
                                <SimpleButtonWTextIcon onClick={handleBackToSelectRooms} color='info' text='Re-select Rooms' Icon={<MdOutlineBedroomChild />} /> :
                                undefined
                        }
                        {
                            (conflictCottages && conflictCottages.length !== 0) ?
                                <SimpleButtonWTextIcon onClick={handleBackToSelectCottages} color='info' text='Re-select Cottages' Icon={<MdOutlineCottage />} /> :
                                undefined
                        }
                    </CommonFooter>

                </>
            }
        />
    )
}

export default ConflictBooking_Modal
