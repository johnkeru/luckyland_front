import { Box, Typography } from "@mui/material";
import { formatDateToMonth } from "../../../utility_functions/formatTime";
import useBookingSummaryReservation from "../../../hooks/useBookingSummaryReservation";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import formatPrice from '../../../utility_functions/formatPrice'
import total_payment from "./total_payment";

const BookingSummary = ({ isNoRoom }) => {

    const { selectedDate, customer, cottageSelected, amenitiesToCompute, roomSelected } = useBookingSummaryReservation();

    return (
        <Box
            position='sticky' top={0} left={0} width='100%' height='100%'
            bgcolor='white'
            sx={{
                border: '1px solid #ccc',
                p: 2,
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
            }}>

            <Box>
                <Typography variant="h5" gutterBottom>
                    Booking Summary
                </Typography>
                {
                    customer ? <Box mb={1}>
                        <Typography fontWeight={600} variant="body1" gutterBottom >
                            Your Info:
                        </Typography>
                        <Typography variant="body1" display='flex' alignItems='center' gap={1}>
                            <FaUser />
                            {customer.firstName} {customer.lastName}
                        </Typography>
                        <Typography variant="body1" display='flex' alignItems='center' gap={1}>
                            <FaPhone />
                            {customer.phoneNumber}
                        </Typography>
                        <Typography variant="body1" display='flex' alignItems='center' gap={1}>
                            <MdEmail />
                            {customer.email}
                        </Typography>
                    </Box> : undefined
                }

                <Box mb={1}>
                    <Typography fontWeight={600} variant="body1" gutterBottom>
                        Date:
                    </Typography>
                    <Typography mt={-.5}>
                        {formatDateToMonth(selectedDate.checkIn)} - {formatDateToMonth(selectedDate.checkOut)} / {selectedDate.duration} {selectedDate.duration > 1 ? 'days' : 'day'}
                    </Typography>
                </Box>

                {(!isNoRoom && roomSelected) ? <Box display='flex' alignItems='start' gap={1}>
                    <Box width='100%'>
                        <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                            <Typography fontWeight={600}>{roomSelected.name}</Typography>
                            <span style={{ color: 'GrayText', fontSize: '15px' }}>₱ {formatPrice(roomSelected.price)}</span>
                        </Box>

                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography variant='body2'>Rate: </Typography>
                            <span style={{ color: 'GrayText', fontSize: '15px' }}>{roomSelected.rate}%</span>
                        </Box>

                    </Box>
                </Box> : undefined}


                {(cottageSelected || amenitiesToCompute.length !== 0) ? <Box mt={1} p={1} border='1px solid #ddd'>
                    <Typography fontWeight={600}>Add Ons</Typography>
                    {cottageSelected ? <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography variant="body2" fontWeight={600}>
                            {cottageSelected.name} ({cottageSelected.type})
                        </Typography>
                        <span style={{ color: 'GrayText', fontSize: '15px' }}>₱{formatPrice(cottageSelected.price)}</span>
                    </Box> : undefined}

                    {amenitiesToCompute ? <Box >
                        {
                            amenitiesToCompute.map(atc => (
                                <Box key={atc.id} display='flex' alignItems='center' justifyContent='space-between'>
                                    <Typography variant="body2">{atc.category} ({atc.quantity})</Typography>
                                    <span style={{ color: 'GrayText', fontSize: '15px' }}>₱{formatPrice(atc.price * atc.quantity)}</span>
                                </Box>
                            ))
                        }
                    </Box> : undefined}
                </Box> : undefined}

                <Box mt={2} display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography variant="body1">
                        Total Payment:
                    </Typography>
                    <span style={{ fontWeight: 600 }}>₱{formatPrice(total_payment({
                        amenities: amenitiesToCompute || 0,
                        cottagePrice: cottageSelected?.price || 0,
                        duration: selectedDate?.duration || 0,
                        roomPrice: isNoRoom ? 0 : roomSelected?.price || 0
                    }))}</span>
                </Box>

            </Box>
        </Box>
    );
};

export default BookingSummary;



