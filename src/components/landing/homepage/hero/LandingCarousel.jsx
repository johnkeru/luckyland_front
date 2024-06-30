import React, { useState, useEffect } from 'react';
import {
    Box,
    IconButton,
    Paper,
    Skeleton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { MdChevronLeft, MdChevronRight, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import ReservationButton from '../../../../utility_components/ReservationButton';

const LandingCarousel = ({ content, loading, isOtherPage, isScrolled, muted, setMuted }) => {
    const [videoEnded, setVideoEnded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handlePrev = () => {
        setVideoEnded(true);
        setCurrentIndex(prevIndex => (prevIndex === 0 ? content.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setVideoEnded(true);
        setCurrentIndex(prevIndex => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
    };

    const handleIndicatorClick = index => {
        setVideoEnded(true);
        setCurrentIndex(index);
    };

    const goNextContent = () => {
        setCurrentIndex(prevIndex => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
    };

    const handleVideoEnded = () => {
        setVideoEnded(true);
        goNextContent();
    };

    useEffect(() => {
        if (!loading && (!isOtherPage ? videoEnded : true)) {
            const intervalId = setInterval(goNextContent, 5000);
            return () => clearInterval(intervalId);
        }
    }, [content.length, loading, videoEnded]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '77vh', sm: isScrolled ? '30vh' : isOtherPage ? '70vh' : '80vh' },
                overflow: 'hidden',
                transition: 'height 0.5s ease-in-out',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {loading ? (
                <Skeleton
                    variant="rectangular"
                    height={isOtherPage ? '70vh' : '100vh'}
                    sx={{ bgcolor: theme.palette.primary.light }}
                />
            ) : (
                <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
                    {content[currentIndex].image ? (
                        <img
                            src={content[currentIndex].image}
                            alt={content[currentIndex].name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                            <video
                                autoPlay
                                muted={muted}
                                poster={content[3].image}
                                loop
                                onEnded={handleVideoEnded}
                                onPlay={() => setVideoEnded(false)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            >
                                <source src={content[currentIndex].video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            {!(isScrolled && !isMobile) && (
                                <Box sx={{ position: 'absolute', top: 100, left: { xs: 20, md: 100 }, zIndex: 2 }}>
                                    <IconButton
                                        color="primary"
                                        sx={{
                                            opacity: 0.6,
                                            bgcolor: theme.palette.primary.contrastText,
                                            ':hover': { bgcolor: theme.palette.primary.contrastText, opacity: 1 },
                                        }}
                                        onClick={() => setMuted(prev => !prev)}
                                    >
                                        {muted ? <MdVolumeOff size={24} /> : <MdVolumeUp size={24} />}
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    )}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(180deg, rgba(0, 0, 0, ${isMobile ? '0.6' : '0.4'}) 0%, rgba(0, 0, 0, ${isMobile ? '0.8' : '0.6'}) 50%, rgba(0, 0, 0, ${isMobile ? '0.6' : '0.4'}) 100%)`,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: isScrolled && !isMobile ? '30%' : { xs: isOtherPage ? '58%' : '55%', md: isOtherPage ? '53%' : '50%' },
                            transition: '500ms ease',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            width: { xs: '90%', sm: '70%' },
                            color: '#fff',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            opacity: isScrolled && !isMobile ? 0 : 1,
                        }}
                    >
                        <Typography variant="h3" fontWeight={600} mb={2}>
                            {content[currentIndex].name}
                        </Typography>
                        <Typography variant="body1" mb={3}>
                            {content[currentIndex].description}
                        </Typography>
                        <Box opacity={isScrolled && !isMobile ? 0 : 1}>
                            <ReservationButton />
                        </Box>
                    </Box>
                </Paper>
            )}
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: isHovered ? '1%' : '-50px',
                    transform: 'translateY(-50%)',
                    transition: 'left 0.5s ease',
                    fontSize: { xs: '2rem', sm: '3rem' },
                }}
                onClick={handlePrev}
            >
                <MdChevronLeft color={theme.palette.primary.contrastText} />
            </IconButton>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: isHovered ? '1%' : '-50px',
                    transform: 'translateY(-50%)',
                    transition: 'right 0.5s ease',
                    fontSize: { xs: '2rem', sm: '3rem' },
                }}
                onClick={handleNext}
            >
                <MdChevronRight color={theme.palette.primary.contrastText} />
            </IconButton>
        </Box>
    );
};

export default LandingCarousel;
