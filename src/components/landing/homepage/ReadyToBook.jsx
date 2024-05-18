import {Box, Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import scrollTop from "../../../utility_functions/scrollTop.js";

const ReadyToBook = () => {
    const nav = useNavigate();
    const goToReservation = () => {
        nav('/create-reservation');
        scrollTop();
    }

    return (
        <Box
            sx={{
                py: 15,
                backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://res.cloudinary.com/kerutman/image/upload/v1712223139/1_aoj4i8.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: 'white', // Text color
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    Ready to Book Your Stay?
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Don't miss out on the ultimate resort experience. Book your stay at LuckyLand Resort today!
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" size='large' sx={{mx: 1}} onClick={goToReservation}>Book
                        Now</Button>
                </Box>
            </Container>
        </Box>
    );
}

export default ReadyToBook;
