import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import useBookingSummary from '../../../hooks/useBookingSummary';
import { formatDateToMonth } from "../../../utility_functions/formatTime";
import formatPrice from "../../../utility_functions/formatPrice";

const BookingSummary = ({ nextButton, handleNext }) => {
    const { date, price, selectedRoom, guestInfo, removeSelectedRoom, customer } = useBookingSummary();

    const handleRemoveRoom = () => {
        removeSelectedRoom();
    }
    useEffect(() => {
        if (!selectedRoom) {
            handleNext && handleNext(0);
        }
    }, [selectedRoom]);

    return (
        <Box
            position='sticky' top={0} left={0} width='100%' height='100%'
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

                {selectedRoom ? <>
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography fontWeight={600} variant="body1" gutterBottom>
                            Selected room:
                        </Typography>
                        <Button
                            size="small"
                            onClick={handleRemoveRoom}
                            sx={{
                                p: 0,
                                boxShadow: 'none',
                                bgcolor: 'transparent',
                                fontSize: '13px',
                                textTransform: 'capitalize',
                                textDecoration: 'underline',
                                ":hover": { bgcolor: 'transparent', textDecoration: 'underline' }
                            }}
                        >Change room</Button>
                    </Box>

                    <Box display='flex' alignItems='start' gap={2}>
                        <img width='150px' height='140px' src={selectedRoom.images[0].url} />
                        <Box width='100%'>
                            <Box display='flex' alignItems='center' justifyContent='space-between' width='100%' mb={1}>
                                <Typography display='flex' >{selectedRoom.name}</Typography>
                                <span style={{ color: 'GrayText', fontSize: '12px' }}>₱ {formatPrice(selectedRoom.price)}</span>
                            </Box>


                            {guestInfo?.adult ? <Box display='flex' alignItems='center' justifyContent='space-between' mt={1}>
                                <Typography variant='body2'>Adult/s: {guestInfo.adult}</Typography>
                                {/* <span style={{ color: 'GrayText', fontSize: '12px' }}>({guestInfo.adult} x ₱ {formatPrice(1100)})</span> */}
                            </Box> : undefined}
                            {guestInfo?.children ? <Box display='flex' alignItems='center' justifyContent='space-between' mt={1}>
                                <Typography variant='body2'>Child/ren: {guestInfo.children}</Typography>
                                {/* <span style={{ color: 'GrayText', fontSize: '12px' }}>({guestInfo.children} x ₱ {formatPrice(400)})</span> */}
                            </Box> : undefined}
                            {guestInfo?.seniors ? <Box display='flex' alignItems='center' justifyContent='space-between' mt={1}>
                                <Typography variant='body2'>Senior/s: {guestInfo.seniors}</Typography>
                                {/* <span style={{ color: 'GrayText', fontSize: '12px' }}>Free</span> */}
                            </Box> : undefined}

                            <Box display='flex' alignItems='center' justifyContent='space-between' mt={1}>
                                <Typography variant='body2'>Sub total: </Typography>
                                <span style={{ color: 'GrayText', fontSize: '12px' }}>₱ {formatPrice(selectedRoom.price)}</span>
                            </Box>

                        </Box>
                    </Box>
                </> : undefined}


                {date ? <>
                    <Typography fontWeight={600} variant="body1" mt={1}>
                        Date:
                    </Typography>

                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography variant="body2" >
                            {formatDateToMonth(date.checkIn)} - {formatDateToMonth(date.checkOut)} / {date.duration} {date.duration > 1 ? 'days' : 'day'}
                        </Typography>
                        <span style={{ color: 'GrayText', fontSize: '12px' }}>({date.duration}d x {formatPrice(selectedRoom.price)})</span>
                    </Box>

                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography variant="body2">
                            Total Payment:
                        </Typography>
                        <span style={{ fontWeight: 600 }}>₱{formatPrice(price)}</span>
                    </Box>
                </> : undefined}

                {
                    customer ? <>
                        <Typography fontWeight={600} variant="body1" gutterBottom mt={2}>
                            Your Info:
                        </Typography>
                        <Typography variant="body2" display='flex' alignItems='center' gap={1}>
                            <FaUser />
                            {customer.firstName} {customer.lastName}
                        </Typography>
                        <Typography variant="body2" display='flex' alignItems='center' gap={1}>
                            <FaPhone />
                            {customer.phoneNumber}
                        </Typography>
                        <Typography variant="body2" display='flex' alignItems='center' gap={1}>
                            <MdEmail />
                            {customer.email}
                        </Typography>
                    </> : undefined
                }
            </Box>

            {/* Continue button */}
            <Box>

                {nextButton}
            </Box>
        </Box>
    );
};

export default BookingSummary;



