import { Box, IconButton, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import useBookingSummary from '../../../hooks/useBookingSummary';
import { formatDateToMonth } from "../../../utility_functions/formatTime";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useEffect } from "react";

const BookingSummary = ({ nextButton, handleNext }) => {
    const { date, selectedRoom, removeSelectedRoom, customer } = useBookingSummary();

    const handleRemoveRoom = () => {
        removeSelectedRoom();
    }

    useEffect(() => {
        if (!selectedRoom) {
            handleNext && handleNext(0);
        }
    }, [selectedRoom])

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
                    <Typography fontWeight={600} variant="body1" gutterBottom>
                        Selected room: {selectedRoom?.name}
                    </Typography>

                    <Box display='flex' gap={2}>
                        <img width='50px' height='40px' src={selectedRoom.images[0].url} />
                        <Typography variant="body2" key={selectedRoom?.id} display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                            {selectedRoom?.name} <span style={{ fontWeight: 'bold' }}>₱{selectedRoom?.price}</span> (1 adult)
                            <IconButton onClick={() => handleRemoveRoom()} size="small" color="error"><IoClose /></IconButton>
                        </Typography>
                    </Box>
                </> : undefined}


                {date ? <>
                    <Typography fontWeight={600} variant="body1" mt={2}>
                        Date:
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {formatDateToMonth(date.checkIn)} - {formatDateToMonth(date.checkOut)} / {date.duration} {date.duration > 1 ? 'days' : 'day'}
                    </Typography>
                </> : undefined}

                {
                    customer ? <>
                        <Typography fontWeight={600} variant="body1" gutterBottom mt={2}>
                            Customer:
                        </Typography>
                        <Typography variant="body2" display='flex' alignItems='center' gap={1}>
                            <FaUser />
                            {customer?.firstName} {customer?.lastName}
                        </Typography>
                        <Typography variant="body2" display='flex' alignItems='center' gap={1}>
                            <FaPhone />
                            {customer?.phone}
                        </Typography>
                        <Typography variant="body2" display='flex' alignItems='center' gap={1}>
                            <MdEmail />
                            {customer?.email}
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

