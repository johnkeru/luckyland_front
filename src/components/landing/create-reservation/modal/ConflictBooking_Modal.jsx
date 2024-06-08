import { Button, DialogContent, Typography } from '@mui/material';
import React from 'react';
import { MdOutlineBedroomChild, MdOutlineCottage } from 'react-icons/md';
import useCustomer from '../../../../hooks/reservation/useCustomer';
import useServices from '../../../../hooks/reservation/useServices';
import SimpleButtonWTextIcon from '../../../../utility_components/SimpleButtonWTextIcon';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from '../../../../utility_components/modal/Modal';
import useAfterReservation from '../../../../hooks/reservation/useAfterReservation';
import { IoArrowUndo } from "react-icons/io5";
import useSettingUpPayment from '../../../../hooks/reservation/useSettingUpPayment';
import { notifySuccess } from '../../../../utility_functions/toaster';

const ConflictBooking_Modal = ({ handleStep, resetAll }) => {

    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>

    const { setTotalRoomsPrice, totalRoomsPrice, totalCottagesPrice, setTotalCottagesPrice } = useSettingUpPayment();
    const { removeRoom, setTab, removeCottage, setRoomAddOns, setCottageAddOns } = useServices();
    const { conflictReservation, setConflictReservation, } = useAfterReservation();

    const { accommodationType } = useCustomer();

    const conflictAddOn = conflictReservation.data?.reservedAddOnId; // object.
    const conflictRooms = conflictReservation.data?.reservedRoomIds;
    const conflictCottages = conflictReservation.data?.reservedCottageIds;

    const handleBackToSelectRooms = (isBoth = false) => {
        conflictRooms.forEach(conflictRoomId => removeRoom({ id: conflictRoomId }));
        setTab(accommodationType === 'both' ? 1 : accommodationType === 'rooms' ? 1 : 0);
        if (!isBoth) {
            setConflictReservation(null)
            handleStep(2);
        }
    }

    const handleBackToSelectCottages = (isBoth = false) => {
        conflictCottages.forEach(conflictCottageId => removeCottage({ id: conflictCottageId }));
        setTab(accommodationType === 'both' ? 2 : accommodationType === 'cottages' ? 1 : 0);
        if (!isBoth) {
            setConflictReservation(null)
            handleStep(2);
        }
    }

    const handleReSelectBoth = () => {
        handleBackToSelectRooms(true);
        handleBackToSelectCottages(true);
        setConflictReservation(null)
        handleStep(2);
    }

    const handleYes = () => {
        // conflictAddOn = {id: 11, item_id: 21, name: item_name, price: 28}. the id is where the item belong (room or cottage);
        setRoomAddOns(conflictAddOn.id, { quantity: 0, item_id: conflictAddOn.item_id });
        setCottageAddOns(conflictAddOn.id, { quantity: 0, item_id: conflictAddOn.item_id });
        setTotalRoomsPrice(totalRoomsPrice - conflictAddOn.price);
        setTotalCottagesPrice(totalCottagesPrice - conflictAddOn.price);
        setConflictReservation('');
        notifySuccess({ message: 'Item: ' + conflictAddOn.name + ' removed.' });
    }

    const handleNo = () => {
        setConflictReservation('');
    }

    const handleCloseAndClear = () => {
        setConflictReservation('');
        resetAll();
        notifySuccess({
            message: 'Thank you for your booking. We will validate your GCash payment shortly.',
            duration: 3000
        });
    }

    return (
        <Modal
            // hasCloseIcon={false}
            button={hiddenButton}
            open={!!conflictReservation.message}
            handleClose={handleCloseAndClear}
            maxWidth="sm"
            title='Accommodation Just Booked'
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
                                <SimpleButtonWTextIcon onClick={() => handleBackToSelectRooms()} color='info' text='Re-select Rooms' Icon={<MdOutlineBedroomChild />} /> :
                                undefined
                        }
                        {
                            (conflictCottages && conflictCottages.length !== 0) ?
                                <SimpleButtonWTextIcon onClick={() => handleBackToSelectCottages()} color='info' text='Re-select Cottages' Icon={<MdOutlineCottage />} /> :
                                undefined
                        }
                        {
                            (conflictRooms && conflictRooms.length !== 0 && conflictCottages && conflictCottages.length !== 0) ?
                                <SimpleButtonWTextIcon onClick={() => handleReSelectBoth()} color='info' text='Re-select' Icon={<IoArrowUndo />} /> :
                                undefined
                        }

                        {
                            conflictAddOn ? <>
                                <Button onClick={handleNo} variant='contained' color='error'>
                                    No
                                </Button>

                                <Button onClick={handleYes} variant='contained'>
                                    Yes
                                </Button>
                            </> : undefined
                        }

                    </CommonFooter>

                </>
            }
        />
    )
}

export default ConflictBooking_Modal
