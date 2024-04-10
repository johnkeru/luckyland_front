import React, { useState, useEffect } from 'react';
import { IconButton, Paper, Typography, useTheme, styled, Button, Box, Skeleton } from '@mui/material';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { MdFiberManualRecord } from 'react-icons/md';

const FunButton = styled(Button)({
    borderRadius: '50px', // Rounded border
    padding: '15px 30px', // Larger padding for a bigger button
    fontSize: '1.2rem', // Slightly larger font size
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
});

const Carousel = ({ content, nav, loading, isLandingPage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? content.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
    };

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!loading) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
            }, 5000); // Change 5000 to adjust autoplay interval (milliseconds)

            return () => clearInterval(intervalId);
        }
    }, [content.length, loading]);

    return (
        <div style={{ position: 'relative', height: isLandingPage ? '70vh' : '80vh', overflow: 'hidden' }}>
            {loading ? (
                // Render skeleton loading component when loading is true
                <Skeleton
                    variant="rectangular"
                    height={isLandingPage ? '70vh' : '80vh'}
                    sx={{ bgcolor: 'primary.light' }}
                />

            ) : (
                <Paper elevation={3} style={{ height: '100%', position: 'relative' }}>
                    <img src={content[currentIndex].image} alt={content[currentIndex].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {/* Gradient Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(rgba(0,0,0,0.355), rgba(0,0,0,0.355))'
                    }}></div>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '70%' }}>
                        <Typography variant="h2" color='primary.light'>{content[currentIndex].name}</Typography>
                        <Typography variant="body1" fontSize='20px' my={3} color='white'>
                            {content[currentIndex].description}
                        </Typography>
                        <FunButton
                            onClick={() => nav('/reservation')}
                            variant="contained"
                            size='large'
                        >
                            Make Reservation
                        </FunButton>
                    </div>
                </Paper>
            )}
            <div style={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handlePrev}>
                    <MdChevronLeft size={50} color={theme.palette.primary.main} />
                </IconButton>
            </div>
            <div style={{ position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleNext}>
                    <MdChevronRight size={50} color={theme.palette.primary.main} />
                </IconButton>
            </div>
            <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
                {content.map((_, index) => (
                    <MdFiberManualRecord
                        key={index}
                        size={12}
                        color={currentIndex === index ? theme.palette.primary.main : theme.palette.grey[400]}
                        onClick={() => handleIndicatorClick(index)}
                        style={{ margin: '0 4px', cursor: 'pointer' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
