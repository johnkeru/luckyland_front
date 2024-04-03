import { Box, Card, CardMedia, Divider, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import useAfterReservation from '../../../hooks/reservation/useAfterReservation';
import useCustomer from '../../../hooks/reservation/useCustomer';
import useDate from '../../../hooks/reservation/useDate';
import useServices from '../../../hooks/reservation/useServices';
import useStepper from '../../../hooks/reservation/useStepper';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import formatPrice from '../../../utility_functions/formatPrice';
import { formalFormatDate } from '../../../utility_functions/formatTime';

const OverallBookingSummary = ({ handleNext }) => {

    const { reservationId, setReservationId } = useAfterReservation();
    const { privacyPolicy } = useStepper();
    const [loading, setLoading] = useState(false);

    const { customer } = useCustomer();
    const { selectedDate } = useDate();
    const { selectedRooms, selectedCottages } = useServices();

    const calculateTotalPayment = (selectedDate, rooms, cottages) => {
        const duration = selectedDate.duration;
        const roomTotal = rooms.length > 0 ? rooms.reduce((acc, room) => acc + parseFloat(room.price), 0) : 0;
        const cottageTotal = cottages.length > 0 ? cottages.reduce((acc, cottage) => acc + parseFloat(cottage.price), 0) : 0;
        return (roomTotal + cottageTotal) * duration;
    };

    const totalPayment = calculateTotalPayment(selectedDate, selectedRooms, selectedCottages);


    const handleConfirmBooking = () => {
        if (!reservationId) {
            const preparedData = {
                rooms: selectedRooms,
                cottages: selectedCottages,
                total: totalPayment,
                checkIn: selectedDate.checkIn.toISOString().slice(0, 10),
                checkOut: selectedDate.checkOut.toISOString().slice(0, 10),
                guests: customer.guests,
                customer,
                ...privacyPolicy
            }

            commonValidationCall({
                endpoint: 'api/reservations/create-reservation',
                method: 'post',
                body: preparedData,
                // setErrorState: setConflictMessage,
                setLoading,
                setDataDirectly: setReservationId,
                handleClose: () => {
                    handleNext();
                },
            });
        } else {
            handleNext();
        }
    };

    return (
        <Box p={2} bgcolor="#f9f9f9">
            <Typography variant="h5" gutterBottom align="center" color="#333">
                Overall Booking Summary
            </Typography>
            <Divider />

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h6" gutterBottom color="#333">
                                Customer Information
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1" color="#666">
                                    <strong>Customer Name:</strong> {customer.firstName} {customer.lastName}
                                </Typography>
                                <Typography variant='body1' color="#666">
                                    <strong>Total Guests: </strong> {customer.guest}
                                </Typography>
                                <Typography variant='body1' color="#666">
                                    <strong>Email: </strong> {customer.email}
                                </Typography>
                                <Typography variant='body1' color="#666">
                                    <strong>Phone Number: </strong> {customer.phoneNumber}
                                </Typography>
                                <Typography variant='body1' color="#666">
                                    <strong>Check In: </strong> {formalFormatDate(selectedDate.checkIn)}
                                </Typography>
                                <Typography variant='body1' color="#666">
                                    <strong>Check Out: </strong> {formalFormatDate(selectedDate.checkOut)}
                                </Typography>
                                <Typography variant='body1' color="#666">
                                    <strong>Duration: </strong> {selectedDate.duration}
                                </Typography>
                            </Box>

                            <Typography variant="h6" gutterBottom color="#333">
                                Total Payment
                            </Typography>
                            <Typography variant="body1" color="#666">
                                <strong>Total Payment:</strong> ₱{formatPrice(totalPayment)}
                            </Typography>
                        </Box>
                        <ButtonWithLoading
                            variant="contained"
                            color="success"
                            onClick={handleConfirmBooking}
                            sx={{ mt: 3 }}
                            size='large'
                            loading={loading}
                            loadingText='Confirming Reservation...'
                        >
                            Confirm Reservation
                        </ButtonWithLoading>

                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    {selectedRooms.length !== 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom color="#333">
                                Room Images
                            </Typography>
                            <Grid container spacing={2}>
                                {selectedRooms.map((room) => (
                                    <Grid key={room.id} item xs={12} sm={6} md={6}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                image={room.images[0].url}
                                                alt={room.name}
                                                sx={{ height: 200 }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                    {selectedCottages.length !== 0 && (
                        <Box mt={1}>
                            <Typography variant="h6" gutterBottom color="#333">
                                Cottage Images
                            </Typography>
                            <Grid container spacing={2}>
                                {selectedCottages.map((cottage) => (
                                    <Grid key={cottage.id} item xs={12} sm={6} md={6}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                image={cottage.images[0].url}
                                                alt={cottage.name}
                                                sx={{ height: 200 }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default OverallBookingSummary;























































// import { Box, Typography } from '@mui/material';
// import { blue } from '@mui/material/colors';
// import React, { useState } from 'react';
// import { FaRegUserCircle } from "react-icons/fa";
// import { GrSchedulePlay } from "react-icons/gr";
// import { MdOutlineBedroomParent } from "react-icons/md";
// import useBookingSummaryReservation from '../../../hooks/useBookingSummaryReservation';
// import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
// import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
// import formatPrice from '../../../utility_functions/formatPrice';
// import { formatDateToMonth } from '../../../utility_functions/formatTime';
// import ConflictBooking_Modal from './modal/ConflictBooking_Modal';
// import RoomImagesCarousel from './rooms-services/RoomImagesCarousel';
// import total_payment from './total_payment';

// const ConfirmationReservation = ({ handleStep, handleNext }) => {

//     const [loading, setLoading] = useState(false);
//     const [conflictMessage, setConflictMessage] = useState('');

//     const {
//         selectedDate,
//         customer,
//         privacyPolicy,
//         cottageSelected,
//         amenitiesToCompute,
//         roomSelected,
//         isCottageOvernight,
//         amenitiesToSend,
//         isAlreadyReserved,
//         setIsAlreadyReserved,
//         setReservationId,
//     } = useBookingSummaryReservation();

//     const total = total_payment({
//         amenities: amenitiesToCompute || 0,
//         cottagePrice: cottageSelected?.price || 0,
//         duration: selectedDate?.duration || 0,
//         roomPrice: roomSelected?.price || 0
//     })

//     const handleConfirmation = () => {
//         if (!isAlreadyReserved) {
//             const preparedData = {
//                 checkIn: selectedDate.checkIn,
//                 checkOut: selectedDate.checkOut,
//                 total,
//                 inventories: amenitiesToSend.filter(amf => amf.quantity !== 0),
//                 room_id: roomSelected.id,
//                 isCottageOvernight: !cottageSelected ? null : isCottageOvernight === 'Day' ? false : true,
//                 cottage_id: !cottageSelected ? null : cottageSelected.id,
//                 customer,
//                 address: { barangay: customer.barangay, city: customer.city, province: customer.province },
//                 ...privacyPolicy
//             }
//             console.log(preparedData)
//             // commonValidationCall({
//             //     endpoint: 'api/reservations/create-reservation',
//             //     method: 'post',
//             //     body: preparedData,
//             //     setErrorState: setConflictMessage,
//             //     setLoading,
//             //     setDataDirectly: setReservationId,
//             //     handleClose: () => {
//             //         handleNext();
//             //         setIsAlreadyReserved(true);
//             //     },
//             // });
//         } else {
//             handleNext();
//         }
//     };

//     return (
//         <>
//             {
//                 conflictMessage ? <ConflictBooking_Modal
//                     conflictMessage={conflictMessage}
//                     setConflictMessage={setConflictMessage}
//                     handleStep={handleStep}
//                 /> : undefined}

//             <Box display='flex' alignItems='stretch' gap={2}>
//                 <Box width='40%'>
//                     <Typography variant="h5" p={1.5} bgcolor={blue[500]} color='white'>
//                         Booking Summary
//                     </Typography>

//                     <Box display='flex' width='100%' px={2} border='1px solid #ddd' py={1}>
//                         <Box width='100%'>
//                             {customer && (
//                                 <Box mb={2}>
//                                     <Box display='flex' gap={1} alignItems='center' mb={1}>
//                                         <FaRegUserCircle fontSize='30px' />
//                                         <Typography fontWeight={600} variant="body1" fontSize='20px'>
//                                             Your Info
//                                         </Typography>
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" gap={1}>
//                                         <Typography fontWeight={600}>Name: </Typography>
//                                         {customer.firstName} {customer.lastName}
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" gap={1}>
//                                         <Typography fontWeight={600}>Phone: </Typography>
//                                         {customer.phoneNumber}
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" gap={1}>
//                                         <Typography fontWeight={600}>Email: </Typography>
//                                         {customer.email}
//                                     </Box>
//                                 </Box>
//                             )}


//                             {selectedDate && (
//                                 <Box mb={2}>
//                                     <Box display='flex' gap={1} alignItems='center'>
//                                         <GrSchedulePlay fontSize='30px' />
//                                         <Typography fontWeight={600} variant="body1" fontSize='20px'>
//                                             Schedule
//                                         </Typography>
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" gap={1}>
//                                         <Typography fontWeight={600}>Check In: </Typography>
//                                         {selectedDate.firstName} {formatDateToMonth(selectedDate.checkIn)}
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" gap={1}>
//                                         <Typography fontWeight={600}>Check Out: </Typography>
//                                         {formatDateToMonth(selectedDate.checkOut)}
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" gap={1}>
//                                         <Typography fontWeight={600}>Day/s:  </Typography>
//                                         {selectedDate.duration}
//                                     </Box>
//                                 </Box>
//                             )}


//                             {roomSelected && (
//                                 <Box mb={2} >
//                                     <Box display='flex' gap={1} alignItems='center'>
//                                         <MdOutlineBedroomParent fontSize='30px' />
//                                         <Typography fontWeight={600} variant="body1" fontSize='20px'>
//                                             {roomSelected.name}
//                                         </Typography>
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" justifyContent='space-between' gap={1}>
//                                         <Typography fontWeight={600}>Price: </Typography>
//                                         <span >₱{formatPrice(roomSelected.price)}</span>
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" gap={1}>
//                                         <Typography fontWeight={600}>Type: </Typography>
//                                         {roomSelected.type}
//                                     </Box>
//                                     <Box variant="body1" display="flex" alignItems="center" gap={1}>
//                                         <Typography fontWeight={600}>Capacity:  </Typography>
//                                         {roomSelected.capacity}
//                                     </Box>
//                                 </Box>
//                             )}


//                             {(cottageSelected || amenitiesToCompute.length !== 0) ? <Box mt={1}>
//                                 <Typography fontWeight={600}>Add Ons</Typography>
//                                 {cottageSelected ? <Box display='flex' alignItems='center' justifyContent='space-between'>
//                                     <Typography variant="body2" fontWeight={600}>
//                                         {cottageSelected.name} ({cottageSelected.type})
//                                     </Typography>
//                                     <span >₱{formatPrice(cottageSelected.price)}</span>
//                                 </Box> : undefined}

//                                 {amenitiesToCompute ? <Box >
//                                     {
//                                         amenitiesToCompute.map(atc => (
//                                             <Box key={atc.id} display='flex' alignItems='center' justifyContent='space-between'>
//                                                 <Typography variant="body2">{atc.category} ({atc.quantity})</Typography>
//                                                 <span >₱{formatPrice(atc.price * atc.quantity)}</span>
//                                             </Box>
//                                         ))
//                                     }
//                                 </Box> : undefined}
//                             </Box> : undefined}
//                         </Box>
//                     </Box>

//                     <Box display='flex' justifyContent='space-between' p={1} px={2} border='1px solid #ddd' borderTop={0}>
//                         <Typography variant='h5'>Total Payment: </Typography>
//                         <Typography color='GrayText' variant='h5' fontWeight={700}>₱{formatPrice(total)}</Typography>
//                     </Box>
//                 </Box>

//                 <Box width='80%' display='flex' flexDirection='column' justifyContent='space-between'>
//                     <RoomImagesCarousel images={roomSelected.images} />
//                     <Box>
//                         <ButtonWithLoading
//                             loading={loading}
//                             variant='contained'
//                             color='success'
//                             size='large'
//                             loadingText='Confirming Booking...'
//                             onClick={handleConfirmation}
//                         >
//                             Confirm Booking
//                         </ButtonWithLoading>
//                     </Box>
//                 </Box>

//             </Box>
//         </>
//     );
// };

// export default ConfirmationReservation;