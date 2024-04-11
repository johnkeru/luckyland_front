import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import LandingCarousel from './hero/LandingCarousel';
import SecondToolbar from './hero/SecondToolbar';


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
