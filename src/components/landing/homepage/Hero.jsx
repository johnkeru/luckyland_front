import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import LandingCarousel2 from './hero/LandingCarousel2';
import SecondToolbar2 from './hero/SecondToolbar2';
import { useEffect, useState } from 'react';


export default function Hero({ content, isOtherPage, loading }) {
    const nav = useNavigate();

    const [muted, setMuted] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrolledBody, setIsScrolledBody] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 80) setMuted(true);
            setIsScrolled(scrollPosition > 80);
            setIsScrolledBody(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box position='relative'>
            <SecondToolbar2 nav={nav} isScrolled={isScrolled} isScrolledBody={isScrolledBody} />
            <LandingCarousel2
                muted={muted}
                setMuted={setMuted}
                content={content}
                isOtherPage={isOtherPage}
                loading={loading}
                isScrolled={isScrolled}
            />
        </Box>
    );
}
