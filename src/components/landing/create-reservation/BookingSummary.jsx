import { Box, Typography } from "@mui/material";
import formatPrice from "../../../utility_functions/formatPrice";
import { formatDateToMonth } from "../../../utility_functions/formatTime";
import useBookingSummaryReservation from "../../../hooks/useBookingSummaryReservation";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const BookingSummary = ({ handleNext }) => {

    const { selectedDate, customer } = useBookingSummaryReservation();

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

                {/* <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography fontWeight={600} variant="body1" gutterBottom>
                        Selected room:
                    </Typography>
                </Box> */}
                {/* 
                <Box display='flex' alignItems='start' gap={2}>
                    <img width='150px' height='140px' src={'https://imgs.search.brave.com/Svi0m9K0yvxW7v4ryZ7UUkiMV9MaeP_bec_R2bvFgrc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9weGJh/ci5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMDIvbmFy/dXRvLXBpY3R1cmVz/LmpwZw'} />
                    <Box width='100%'>
                        <Box display='flex' alignItems='center' justifyContent='space-between' width='100%' mb={1}>
                            <Typography display='flex' >room 123</Typography>
                            <span style={{ color: 'GrayText', fontSize: '12px' }}>₱ {formatPrice(21321)}</span>
                        </Box>


                        <Box display='flex' alignItems='center' justifyContent='space-between' mt={1}>
                            <Typography variant='body2'>Adult/s: 2 </Typography>
                        </Box>

                        <Box display='flex' alignItems='center' justifyContent='space-between' mt={1}>
                            <Typography variant='body2'>Sub total: </Typography>
                            <span style={{ color: 'GrayText', fontSize: '12px' }}>₱ {formatPrice(21312)}</span>
                        </Box>

                    </Box>
                </Box> */}


                <Typography fontWeight={600} variant="body1" mt={1}>
                    Date:
                </Typography>

                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography variant="body2" >
                        {formatDateToMonth(selectedDate.checkIn)} - {formatDateToMonth(selectedDate.checkOut)} / {selectedDate.duration} {selectedDate.duration > 1 ? 'days' : 'day'}
                    </Typography>
                    {/* <span style={{ color: 'GrayText', fontSize: '12px' }}>({selectedDate.duration}d x {formatPrice(32423423)})</span> */}
                </Box>

                {/* 
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography variant="body2" >
                        fawefawe
                    </Typography>
                    <span style={{ color: 'GrayText', fontSize: '12px' }}>(7d x {formatPrice(34234234)})</span>
                </Box>

                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography variant="body2">
                        Total Payment:
                    </Typography>
                    <span style={{ fontWeight: 600 }}>₱{formatPrice(2312312)}</span>
                </Box> */}


                {
                    customer ? <>
                        <Typography fontWeight={600} variant="body1" gutterBottom mt={2}>
                            Your Info:
                        </Typography>
                        <Typography gutterBottom variant="body2" display='flex' alignItems='center' gap={1}>
                            <FaUser />
                            {customer.firstName} {customer.lastName}
                        </Typography>
                        <Typography gutterBottom variant="body2" display='flex' alignItems='center' gap={1}>
                            <FaPhone />
                            {customer.phoneNumber}
                        </Typography>
                        <Typography gutterBottom variant="body2" display='flex' alignItems='center' gap={1}>
                            <MdEmail />
                            {customer.email}
                        </Typography>
                    </> : undefined
                }
            </Box>
        </Box>
    );
};

export default BookingSummary;



