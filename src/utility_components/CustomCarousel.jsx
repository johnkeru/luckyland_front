import React, { useState } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { IconButton, Paper } from '@mui/material';

// Sample image data

const CustomCarousel = ({ images, height = '100%' }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
        <Paper sx={{ position: 'relative', overflow: 'hidden', width: '100%', height }}>
            {images.map((image, index) => (
                <div
                    key={index}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: `${(index - currentSlide) * 100}%`,
                        transition: 'left 0.5s ease-in-out',
                        backgroundImage: `url(${image.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}
            <IconButton sx={{ position: 'absolute', top: '50%', left: 0, color: 'background.white', ":hover": { opacity: 1 }, opacity: .5, transform: 'translateY(-50%)' }} onClick={handlePrev}>
                <MdArrowLeft size={50} />
            </IconButton>
            <IconButton sx={{ position: 'absolute', top: '50%', right: 0, color: 'background.white', ":hover": { opacity: 1 }, opacity: .5, transform: 'translateY(-50%)' }} onClick={handleNext}>
                <MdArrowRight size={50} />
            </IconButton>
            <div
                style={{
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 8,
                }}
            >
                {images.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: index === currentSlide ? '#fff' : '#ccc',
                            cursor: 'pointer',
                        }}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </Paper>
    );
};

export default CustomCarousel;
