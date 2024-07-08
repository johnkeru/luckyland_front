import {
    Box,
    IconButton,
    Paper,
    Skeleton,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import ReservationButton from '../../../../utility_components/ReservationButton';

const LandingCarousel2 = ({ content, loading, isOtherPage, isScrolled, muted, setMuted }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? content.length - 1 : prevIndex - 1));
    };

    const handleIndicatorClick = index => {
        setCurrentIndex(index);
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
    };

    const goNextContent = () => {
        setCurrentIndex(prevIndex => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        if (!loading && isOtherPage) {
            const intervalId = setInterval(goNextContent, 5000);
            return () => clearInterval(intervalId);
        }
    }, [content.length, loading]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '77vh', sm: isScrolled ? '25vh' : '85vh' },
                overflow: 'hidden',
                transition: 'height 0.4s ease-in-out',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {loading ? (
                <Skeleton
                    variant="rectangular"
                    height={'85vh'}
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
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            >
                                <source src={content[currentIndex].video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            {!(isScrolled && !isMobile) && (
                                <Box sx={{ position: 'absolute', top: 125, left: { xs: 20, md: 100 }, zIndex: 2 }}>
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
                            background: 'linear-gradient(3deg, rgba(0, 0, 0, 0.7372198879551821) 10%, rgba(0,0,0,0) 100%)'
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            transition: '500ms ease',
                            px: { xs: 5, md: 15 },
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            color: '#fff',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            opacity: isScrolled && !isMobile ? 0 : 1,
                        }}
                    >
                        <Box sx={{
                            pb: { xs: 0, md: 8 },
                            mt: { xs: 5, md: 0 },
                            height: '100%',
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: { xs: 'center', md: 'space-between' },
                            alignItems: { xs: 'center', md: 'end' },
                        }}>
                            <Box width={{ xs: "100%", md: '70%' }} sx={{ textAlign: { xs: 'center', sm: 'left' } }} mb={{ xs: 5, md: 0 }}>
                                <Typography variant="h4" sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    fontSize: { xs: 32, sm: 40, md: 45 }, // Adjust font size for different screen sizes
                                }}>
                                    {content[currentIndex].name}
                                </Typography>
                                <Typography variant="body1" sx={{
                                    fontSize: { xs: 17, md: 18 }, // Adjust font size for different screen sizes
                                    mb: 3,
                                }}>
                                    {content[currentIndex].description}
                                </Typography>

                                <ReservationButton />
                            </Box>
                            <Box display='flex' gap={1.3} flexWrap='wrap'>
                                {content.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 11,
                                            height: 11,
                                            border: '1px solid white',
                                            bgcolor: currentIndex === index ? 'white' : 'transparent',
                                        }}
                                        onClick={() => handleIndicatorClick(index)}
                                    />
                                ))}
                            </Box>
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

export default LandingCarousel2;
