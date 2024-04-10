import { Box, Button, Paper, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router';
import SecondToolbar from './hero/SecondToolbar';
import LandingCarousel from './hero/LandingCarousel';

const FunButton = styled(Button)({
    borderRadius: '50px', // Rounded border
    padding: '15px 30px', // Larger padding for a bigger button
    fontSize: '1.2rem', // Slightly larger font size
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
});
export default function Hero({ content, isIndicator, loading }) {
    const nav = useNavigate();

    return (
        <Box position='relative'>
            <SecondToolbar nav={nav} />
            <Box mt={2}>
                <LandingCarousel content={content} nav={nav} isLandingPage={!isIndicator} loading={loading} />
            </Box>
        </Box>
    );
}

function Item({ item, isIndicator, nav }) {

    return (
        <Paper
            sx={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.355), rgba(0,0,0,0.355)), url('${item.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: !isIndicator ? '70vh' : '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px',
                textAlign: 'center',
                color: '#fff',
            }}
        >
            <Box width='80%' m='auto'>
                <Typography variant="h2" color='primary.light'>{item.name}</Typography>
                <Typography variant="body1" fontSize='20px' my={3}>
                    {item.description}
                </Typography>
                <FunButton
                    onClick={() => nav('/reservation')}
                    variant="contained"
                    size='large'
                >
                    Make Reservation
                </FunButton>
            </Box >
        </Paper>
    );
}
