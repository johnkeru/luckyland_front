import { Box, IconButton, Paper, Skeleton, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdFiberManualRecord, MdVolumeOff, MdVolumeUp } from 'react-icons/md';


const LandingCarousel = ({ content, loading, isOtherPage, isScrolled, muted, setMuted }) => {
    const [videoEnded, setVideoEnded] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();

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

    useEffect(() => {
        if (!loading && (!isOtherPage ? videoEnded : true)) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
            }, 5000); // Change 5000 to adjust autoplay interval (milliseconds)

            return () => clearInterval(intervalId);
        }
    }, [content.length, loading, videoEnded]);

    return (
        <Box
            style={{
                position: 'relative',
                height: isOtherPage ? isScrolled ? '40vh' : '70vh' : isScrolled ? '35vh' : '85vh',
                overflow: 'hidden',
                transition: 'height 0.5s ease-in-out',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {loading ? (
                // Render skeleton loading component when loading is true
                <Skeleton
                    variant="rectangular"
                    height={isOtherPage ? '70vh' : '100vh'}
                    sx={{ bgcolor: 'primary.light' }}
                />

            ) : (
                <Paper elevation={3} style={{ height: '100%', position: 'relative' }}>
                    {
                        content[currentIndex].image ? <img
                            src={content[currentIndex].image}
                            alt={content[currentIndex].name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        /> :
                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                <video
                                    autoPlay
                                    muted={muted}
                                    poster={content[3].image}
                                    loop
                                    onEnded={() => setVideoEnded(true)}
                                    onPlay={() => setVideoEnded(false)}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}

                                >
                                    <source src={content[currentIndex].video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                {!isScrolled ? <Box sx={{ position: 'absolute', top: 100, left: { xs: 20, md: 100 }, zIndex: 2 }}>
                                    {
                                        muted ? <IconButton color='primary'
                                            sx={{
                                                opacity: .6,
                                                bgcolor: 'primary.contrastText',
                                                ":hover": {
                                                    bgcolor: 'primary.contrastText',
                                                    opacity: 1
                                                }
                                            }}
                                            onClick={() => setMuted(false)}>
                                            <MdVolumeOff size={24} />
                                        </IconButton> :
                                            <IconButton color='primary'
                                                sx={{
                                                    opacity: .6,
                                                    bgcolor: 'primary.contrastText',
                                                    ":hover": {
                                                        bgcolor: 'primary.contrastText',
                                                        opacity: 1
                                                    }
                                                }}
                                                onClick={() => setMuted(true)}>
                                                <MdVolumeUp size={24} />
                                            </IconButton>
                                    }
                                </Box> : undefined}
                            </Box>
                    }
                    {/* Gradient Overlay */}
                    <Box style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.39548319327731096) 0%, rgba(0,0,0,0.44058123249299714) 48%, rgba(0,0,0,0.32825630252100846) 100%)'
                    }}></Box>
                    <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '70%' }}>
                        <Typography variant="h2" color='primary.light'>{content[currentIndex].name}</Typography>
                        <Typography
                            variant="body1"
                            fontSize="20px"
                            my={3}
                            color="white"
                            style={{
                                opacity: isScrolled ? 0 : 1,
                                transition: 'opacity 0.5s ease-in-out',
                            }}
                        >
                            {content[currentIndex].description}
                        </Typography>
                    </Box>
                </Paper>
            )}
            <Box
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: isHovered ? '5%' : '-50px',
                    transform: 'translateY(-50%)',
                    transition: 'left 0.5s ease',
                }}
            >
                <IconButton onClick={handlePrev}>
                    <MdChevronLeft size={50} color={theme.palette.primary.main} />
                </IconButton>
            </Box>
            <Box
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: isHovered ? '5%' : '-50px',
                    transform: 'translateY(-50%)',
                    transition: 'right 0.5s ease',
                }}
            >
                <IconButton onClick={handleNext}>
                    <MdChevronRight size={50} color={theme.palette.primary.main} />
                </IconButton>
            </Box>
            <Box style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
                {content.map((_, index) => (
                    <IconButton
                        key={index}
                        onClick={() => handleIndicatorClick(index)}
                        size='large'
                    >
                        <MdFiberManualRecord
                            size={17}
                            color={currentIndex === index ? theme.palette.primary.main : theme.palette.primary.contrastText}
                        />
                    </IconButton>
                ))}
            </Box>
        </Box >
    );
};

export default LandingCarousel;
