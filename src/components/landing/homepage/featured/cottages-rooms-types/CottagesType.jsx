import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { FaUsers, FaWifi, FaTree } from 'react-icons/fa'; // Added FaTree for a nature touch
import { GoDotFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const CottageType = ({ cottage, cottageCounts }) => {
    const nav = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cottage.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cottage.images.length - 1 : prevIndex - 1));
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <Box width="48%" border="1px solid #f0f0f0" overflow="hidden" position="relative" borderRadius={2} boxShadow={2} sx={{ ":hover": { boxShadow: 4, borderColor: '#ccc' } }}> {/* Adjusted box shadow and border color */}
            <Box display="flex" alignItems="center" justifyContent="center" position="relative">
                <img
                    src={cottage.images[currentIndex].url}
                    alt={cottage.type}
                    style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '2px 2px 0 0' }} // Added border radius for image
                />
                <Box position="absolute" left={0} transform="translateY(-50%)">
                    <Button onClick={handlePrev} variant="outlined" color="primary" size="small"> {/* Restyled button */}
                        <AiFillCaretLeft size={24} />
                    </Button>
                </Box>
                <Box position="absolute" right={0} transform="translateY(-50%)">
                    <Button onClick={handleNext} variant="outlined" color="primary" size="small"> {/* Restyled button */}
                        <AiFillCaretRight size={24} />
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" position="absolute" bottom={10}>
                    {cottage.images.map((_, index) => (
                        <IconButton
                            key={index}
                            onClick={() => handleDotClick(index)}
                            variant="text"
                            color='primary'
                        >
                            <GoDotFill size={16} color={currentIndex === index ? undefined : 'white'} /> {/* Adjusted dot size */}
                        </IconButton>
                    ))}
                </Box>
            </Box>
            <Box px={3} py={2}>
                <Typography variant="h4" color="primary" mb={1.5}>
                    {cottage.type === 'Big Cottage' ? cottageCounts['Big Cottage'] : cottageCounts['Small Cottage']} {cottage.type}
                </Typography>

                <Typography my={1} variant="body1" display="flex" alignItems="center" gap={1}>
                    <FaUsers /> Ideal for {cottage.capacity} people
                </Typography>
                <Box my={1} display="flex" gap={2}>
                    <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                        <FaWifi /> Wi-Fi
                    </Typography>
                    <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                        <FaTree /> Nature views {/* Added nature icon */}
                    </Typography>
                </Box>

            </Box>
            <Typography bgcolor="background.paper2" px={3} py={1.5} fontWeight="bold" color="primary"> {/* Adjusted text color */}
                Starting from PHP {cottage.price} per night
            </Typography>
            <Button onClick={() => nav('/cottages')} variant="contained" size='large' color="primary" sx={{ mx: 3, my: 1.5 }}> {/* Restyled button */}
                Explore Cottages {/* Adjusted button text */}
            </Button>
        </Box>
    );
};

export default CottageType;
