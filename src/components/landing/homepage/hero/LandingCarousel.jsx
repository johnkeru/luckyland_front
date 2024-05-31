import { Box, IconButton, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
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
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? content.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setVideoEnded(true);
        setCurrentIndex((prevIndex) => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
    };

    const handleIndicatorClick = (index) => {
        setVideoEnded(true);
        setCurrentIndex(index);
    };

    const goNextContent = () => {
        setCurrentIndex((prevIndex) => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
    };

    const handleVideoEnded = () => {
        setVideoEnded(true);
        goNextContent();
    };

    useEffect(() => {
        if (!loading && (!isOtherPage ? videoEnded : true)) {
            const intervalId = setInterval(() => {
                goNextContent();
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [content.length, loading, videoEnded]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '77vh', sm: isScrolled ? '30vh' : isOtherPage ? '70vh' : '90vh' },
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
                    sx={{ bgcolor: 'primary.light' }}
                />
            ) : (
                <Paper elevation={3} style={{ height: '100%', position: 'relative' }}>
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
                            {!(isScrolled && !isMobile) ? (
                                <Box sx={{ position: 'absolute', top: 100, left: { xs: 20, md: 100 }, zIndex: 2 }}>
                                    {muted ? (
                                        <IconButton
                                            color="primary"
                                            sx={{
                                                opacity: 0.6,
                                                bgcolor: 'primary.contrastText',
                                                ":hover": {
                                                    bgcolor: 'primary.contrastText',
                                                    opacity: 1,
                                                },
                                            }}
                                            onClick={() => setMuted(false)}
                                        >
                                            <MdVolumeOff size={24} />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            color="primary"
                                            sx={{
                                                opacity: 0.6,
                                                bgcolor: 'primary.contrastText',
                                                ":hover": {
                                                    bgcolor: 'primary.contrastText',
                                                    opacity: 1,
                                                },
                                            }}
                                            onClick={() => setMuted(true)}
                                        >
                                            <MdVolumeUp size={24} />
                                        </IconButton>
                                    )}
                                </Box>
                            ) : undefined}
                        </Box>
                    )}
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(180deg, rgba(0, 0, 0, ${isMobile ? '0.6' : '0.4'}) 0%, rgba(0, 0, 0, ${isMobile ? '0.8' : '0.6'}) 50%, rgba(0, 0, 0, ${isMobile ? '0.6' : '0.4'}) 100%)`
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        top: (isScrolled && !isMobile) ? '30%' : { xs: isOtherPage ? '58%' : '55%', md: isOtherPage ? '53%' : '50%' },
                        transition: '500ms ease',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        width: { xs: '90%', sm: '70%' }
                    }}
                    >
                        <Typography
                            fontSize={{ xs: '2rem', sm: '2.5rem', md: '3.7rem' }}
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                            }}>
                            {content[currentIndex].name}
                        </Typography>
                        <Typography
                            fontSize={{ xs: '16px', sm: '18px', md: '19px' }}
                            my={3}
                            color="white"
                            style={{
                                opacity: (isScrolled && !isMobile) ? 0 : 1,
                                transition: 'opacity 0.5s ease-in-out',
                                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            {content[currentIndex].description}
                        </Typography>
                        <Box
                            sx={{
                                opacity: (isScrolled && !isMobile) ? 0 : 1,
                                transition: 'opacity 0.5s ease-in-out',
                            }}
                        >
                            <ReservationButton />
                        </Box>
                    </Box>
                </Paper>
            )}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: { xs: isHovered ? '1%' : '-50px', sm: isHovered ? '5%' : '-50px' },
                    transform: 'translateY(-50%)',
                    transition: 'left 0.5s ease',
                }}
            >
                <IconButton sx={{ fontSize: { xs: '2rem', sm: '3rem' } }} onClick={handlePrev}>
                    <MdChevronLeft color={theme.palette.primary.contrastText} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: { xs: isHovered ? '1%' : '-50px', sm: isHovered ? '5%' : '-50px' },
                    transform: 'translateY(-50%)',
                    transition: 'right 0.5s ease',
                }}
            >
                <IconButton sx={{ fontSize: { xs: '2rem', sm: '3rem' } }} onClick={handleNext}>
                    <MdChevronRight color={theme.palette.primary.contrastText} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default LandingCarousel;
