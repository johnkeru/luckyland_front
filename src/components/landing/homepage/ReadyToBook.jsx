import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";
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
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('https://res.cloudinary.com/kerutman/image/upload/v1716061767/442469073_367901216263833_580929652207618390_n_ntglvd.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white', // Text color
                textAlign: 'center',
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    Ready to Book Your Stay?
                </Typography>
                <Typography variant="h6" paragraph>
                    Don't miss out on the ultimate resort experience. Book your stay at LuckyLand Resort today!
                </Typography>
                <Button variant="contained" size='large' onClick={goToReservation}>Book Now</Button>
            </Container>
        </Box>
    );
}

export default ReadyToBook;
