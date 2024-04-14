import { Box, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { GoDotFill } from 'react-icons/go';


const CustomCarousel = ({ images, height = '100%' }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleDotClick = (index) => {
        setCurrentImage(index);
    };

    return (
        <Box height={height}>
            <Grid height='100%'>
                <Box sx={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100%', }}>
                    <Box sx={{ display: 'flex', height: '100%', transition: 'transform 0.5s ease', transform: `translateX(-${currentImage * 100}%)` }}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`Image ${index}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ))}
                    </Box>
                    <IconButton sx={{ color: 'custom.main', ":hover": { color: 'custom.white' }, position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 1, left: 0 }} onClick={handlePrev}>
                        <AiFillCaretLeft size={30} />
                    </IconButton>
                    <IconButton sx={{ color: 'custom.main', ":hover": { color: 'custom.white' }, position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 1, right: 0 }} onClick={handleNext}>
                        <AiFillCaretRight size={30} />
                    </IconButton>
                    <Box sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '5px',
                        zIndex: 2
                    }}>
                        {images.map((_, index) => (
                            <IconButton
                                key={index}
                                sx={{ color: index === currentImage ? 'custom.white' : 'custom.main' }}
                                onClick={() => handleDotClick(index)}
                                size='small'
                            >
                                <GoDotFill />
                            </IconButton>
                        ))}
                    </Box>


                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0,0,0,.1)'
                        }}
                    />
                </Box>
            </Grid>
        </Box>
    );
};

export default CustomCarousel;
