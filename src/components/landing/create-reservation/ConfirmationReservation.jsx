import { Box, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { GrSchedulePlay } from "react-icons/gr";
import { MdOutlineBedroomParent } from "react-icons/md";
import useBookingSummaryReservation from '../../../hooks/useBookingSummaryReservation';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import formatPrice from '../../../utility_functions/formatPrice';
import { formatDateToMonth } from '../../../utility_functions/formatTime';
import ConflictBooking_Modal from './modal/ConflictBooking_Modal';
import RoomImagesCarousel from './rooms-services/RoomImagesCarousel';
import total_payment from './total_payment';

const ConfirmationReservation = ({ handleStep, handleNext }) => {

    const [loading, setLoading] = useState(false);
    const [conflictMessage, setConflictMessage] = useState('');

    const {
        selectedDate,
        customer,
        privacyPolicy,
        cottageSelected,
        amenitiesToCompute,
        roomSelected,
        isCottageOvernight,
        amenitiesToSend,
        isAlreadyReserved,
        setIsAlreadyReserved,
        setReservationId,
    } = useBookingSummaryReservation();

    const total = total_payment({
        amenities: amenitiesToCompute || 0,
        cottagePrice: cottageSelected?.price || 0,
        duration: selectedDate?.duration || 0,
        roomPrice: roomSelected?.price || 0
    })

    const handleConfirmation = () => {
        if (!isAlreadyReserved) {
            const preparedData = {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
                total,
                inventories: amenitiesToSend.filter(amf => amf.quantity !== 0),
                room_id: roomSelected.id,
                isCottageOvernight: !cottageSelected ? null : isCottageOvernight === 'Day' ? false : true,
                cottage_id: !cottageSelected ? null : cottageSelected.id,
                customer,
                address: { barangay: customer.barangay, city: customer.city, province: customer.province },
                ...privacyPolicy
            }
            console.log(preparedData)
            // commonValidationCall({
            //     endpoint: 'api/reservations/createReservation',
            //     method: 'post',
            //     body: preparedData,
            //     setErrorState: setConflictMessage,
            //     setLoading,
            //     setDataDirectly: setReservationId,
            //     handleClose: () => {
            //         handleNext();
            //         setIsAlreadyReserved(true);
            //     },
            // });
        } else {
            handleNext();
        }
    };

    return (
        <>
            {
                conflictMessage ? <ConflictBooking_Modal
                    conflictMessage={conflictMessage}
                    setConflictMessage={setConflictMessage}
                    handleStep={handleStep}
                /> : undefined}

            <Box display='flex' alignItems='stretch' gap={2}>
                <Box width='40%'>
                    <Typography variant="h5" p={1.5} bgcolor={blue[500]} color='white'>
                        Booking Summary
                    </Typography>

                    <Box display='flex' width='100%' px={2} border='1px solid #ddd' py={1}>
                        <Box width='100%'>
                            {customer && (
                                <Box mb={2}>
                                    <Box display='flex' gap={1} alignItems='center' mb={1}>
                                        <FaRegUserCircle fontSize='30px' />
                                        <Typography fontWeight={600} variant="body1" fontSize='20px'>
                                            Your Info
                                        </Typography>
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" gap={1}>
                                        <Typography fontWeight={600}>Name: </Typography>
                                        {customer.firstName} {customer.lastName}
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" gap={1}>
                                        <Typography fontWeight={600}>Phone: </Typography>
                                        {customer.phoneNumber}
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" gap={1}>
                                        <Typography fontWeight={600}>Email: </Typography>
                                        {customer.email}
                                    </Box>
                                </Box>
                            )}


                            {selectedDate && (
                                <Box mb={2}>
                                    <Box display='flex' gap={1} alignItems='center'>
                                        <GrSchedulePlay fontSize='30px' />
                                        <Typography fontWeight={600} variant="body1" fontSize='20px'>
                                            Schedule
                                        </Typography>
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" gap={1}>
                                        <Typography fontWeight={600}>Check In: </Typography>
                                        {selectedDate.firstName} {formatDateToMonth(selectedDate.checkIn)}
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" gap={1}>
                                        <Typography fontWeight={600}>Check Out: </Typography>
                                        {formatDateToMonth(selectedDate.checkOut)}
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" gap={1}>
                                        <Typography fontWeight={600}>Day/s:  </Typography>
                                        {selectedDate.duration}
                                    </Box>
                                </Box>
                            )}


                            {roomSelected && (
                                <Box mb={2} >
                                    <Box display='flex' gap={1} alignItems='center'>
                                        <MdOutlineBedroomParent fontSize='30px' />
                                        <Typography fontWeight={600} variant="body1" fontSize='20px'>
                                            {roomSelected.name}
                                        </Typography>
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" justifyContent='space-between' gap={1}>
                                        <Typography fontWeight={600}>Price: </Typography>
                                        <span >₱{formatPrice(roomSelected.price)}</span>
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" gap={1}>
                                        <Typography fontWeight={600}>Type: </Typography>
                                        {roomSelected.type}
                                    </Box>
                                    <Box variant="body1" display="flex" alignItems="center" gap={1}>
                                        <Typography fontWeight={600}>Capacity:  </Typography>
                                        {roomSelected.capacity}
                                    </Box>
                                </Box>
                            )}


                            {(cottageSelected || amenitiesToCompute.length !== 0) ? <Box mt={1}>
                                <Typography fontWeight={600}>Add Ons</Typography>
                                {cottageSelected ? <Box display='flex' alignItems='center' justifyContent='space-between'>
                                    <Typography variant="body2" fontWeight={600}>
                                        {cottageSelected.name} ({cottageSelected.type})
                                    </Typography>
                                    <span >₱{formatPrice(cottageSelected.price)}</span>
                                </Box> : undefined}

                                {amenitiesToCompute ? <Box >
                                    {
                                        amenitiesToCompute.map(atc => (
                                            <Box key={atc.id} display='flex' alignItems='center' justifyContent='space-between'>
                                                <Typography variant="body2">{atc.category} ({atc.quantity})</Typography>
                                                <span >₱{formatPrice(atc.price * atc.quantity)}</span>
                                            </Box>
                                        ))
                                    }
                                </Box> : undefined}
                            </Box> : undefined}
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='space-between' p={1} px={2} border='1px solid #ddd' borderTop={0}>
                        <Typography variant='h5'>Total Payment: </Typography>
                        <Typography color='GrayText' variant='h5' fontWeight={700}>₱{formatPrice(total)}</Typography>
                    </Box>
                </Box>

                <Box width='80%' display='flex' flexDirection='column' justifyContent='space-between'>
                    <RoomImagesCarousel images={roomSelected.images} />
                    <Box>
                        <ButtonWithLoading
                            loading={loading}
                            variant='contained'
                            color='success'
                            size='large'
                            loadingText='Confirming Booking...'
                            onClick={handleConfirmation}
                        >
                            Confirm Booking
                        </ButtonWithLoading>
                    </Box>
                </Box>

            </Box>
        </>
    );
};

export default ConfirmationReservation;
