import { Box, Button, Paper, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router';
import SecondToolbar from './SecondToolbar';


export default function Hero({ content, isIndicator }) {
    return (
        <Box position='relative'>
            <SecondToolbar />
            <Box mt={2}>
                <Carousel autoPlay indicators={isIndicator}>
                    {content.map((item, i) => <Item key={i} item={item} />)}
                </Carousel>
            </Box>
        </Box>
    );
}

function Item({ item }) {
    const nav = useNavigate();

    return (
        <Paper
            sx={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.355), rgba(0,0,0,0.355)), url('${item.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px',
                textAlign: 'center',
                color: '#fff',
            }}
        >
            <Box width='70%' m='auto'>
                <Typography variant="h2" sx={{ marginBottom: '20px' }}>{item.name}</Typography>
                <Typography variant="body1" sx={{ marginBottom: '30px' }}>
                    {item.description}
                </Typography>
                <Button
                    onClick={() => nav('reservation')}
                    variant="contained"
                    sx={{
                        bgcolor: '#3f51b5', // Dark blue color
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        padding: '12px 30px', // Slightly reduced padding
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', // Soft shadow
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Make Reservation
                </Button>
            </Box >
        </Paper>
    );
}
