import { Box, IconButton, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import useBookingSummary from '../../../hooks/useBookingSummary';
import { formatDateToMonth } from "../../../utility_functions/formatTime";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const BookingSummary = ({ nextButton }) => {
    const { date, selectedRooms, removeSelectedRoom, customer, total_charge } = useBookingSummary();

    const handleRemoveRoom = (room) => {
        removeSelectedRoom(room);
    }

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
                <Typography fontWeight={600} variant="body1">
                    Date:
                </Typography>
                {date ? <Typography variant="body2" gutterBottom>
                    {formatDateToMonth(date.checkIn)} - {formatDateToMonth(date.checkOut)} / {date.duration} {date.duration > 1 ? 'days' : 'day'}
                </Typography> : undefined}

                <Typography fontWeight={600} variant="body1">
                    Room/s:
                </Typography>


                {selectedRooms.length !== 0 ?
                    <Box sx={selectedRooms.length > 5 ? { overflowY: 'scroll', height: '50%' } : undefined}>
                        {
                            selectedRooms.map((room, i) => (
                                <Typography borderBottom={'1px solid #c0c0c0'} variant="body2" key={room.id} display='flex' alignItems='center' justifyContent='space-between'>
                                    {room.name} <span style={{ fontWeight: 'bold' }}>₱{room.price}</span> (1 adult)
                                    <IconButton onClick={() => handleRemoveRoom(room)} size="small" color="error"><IoClose /></IconButton>
                                </Typography>
                            ))
                        }
                    </Box>
                    : undefined}

                {
                    selectedRooms.length !== 0 ?
                        <Typography fontWeight={600} variant="body1" gutterBottom>
                            Subtotal: ₱{total_charge * date.duration}
                        </Typography> : undefined}

                {
                    customer ? <>
                        <Typography fontWeight={600} variant="body1" >
                            Customer:
                        </Typography>
                        <Typography variant="body2" display='flex' alignItems='center' gap={1}>
                            <FaUser />
                            {customer?.fistName} {customer?.lastName}
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
                {selectedRooms.length !== 0 ?
                    <Box display='flex' justifyContent='space-between'>
                        <Typography mb={.5}>Total Charge:</Typography>
                        <Typography fontWeight={600}>PHP {total_charge * date.duration}</Typography>
                    </Box> : undefined}

                {nextButton}
            </Box>
        </Box>
    );
};

export default BookingSummary;

