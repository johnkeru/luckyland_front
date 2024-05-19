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
                backgroundImage: "linear-gradient(rgba(0, 123, 255, 0.6), rgba(0, 183, 255, 0.5), rgba(255, 193, 7, 0.4)), url('https://res.cloudinary.com/kerutman/image/upload/v1716061767/442469073_367901216263833_580929652207618390_n_ntglvd.jpg')",
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
                <Box sx={{display: 'flex', justifyContent: 'center', bgcolor: 'white', p: .3, width: 'fit-content', borderRadius: 1, m: 'auto'}}>
                    <Button variant="contained" size='large'  onClick={goToReservation}>Book
                        Now</Button>
                </Box>
            </Container>
        </Box>
    );
}

export default ReadyToBook;
