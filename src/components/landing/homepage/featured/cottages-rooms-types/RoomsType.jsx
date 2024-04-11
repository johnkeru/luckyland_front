import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BiSolidCabinet } from 'react-icons/bi';
import { FaUsers, FaWifi, FaChild, FaTv } from 'react-icons/fa'; // Changed MdBedroomChild to FaChild and PiTelevisionSimpleFill to FaTv
import { GoDotFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const RoomType = ({ room, roomCounts }) => {
    const nav = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === room.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? room.images.length - 1 : prevIndex - 1));
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <Box width="48%" border="1px solid #f0f0f0" overflow="hidden" position="relative" borderRadius={2} boxShadow={2} sx={{ ":hover": { boxShadow: 4, borderColor: '#ccc' } }}> {/* Adjusted box shadow and border color */}
            <Box display="flex" alignItems="center" justifyContent="center" position="relative">
                <img
                    src={room.images[currentIndex].url}
                    alt={room.type}
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
                    {room.images.map((_, index) => (
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
                    {room.type === 'Family' ? roomCounts['Family'] : roomCounts['Friends/Couples']} {room.type} Rooms
                </Typography>

                <Typography my={1} variant="body1" display="flex" alignItems="center" gap={1}>
                    <FaUsers /> Ideal for {room.type}: {room.minCapacity} (+{room.maxCapacity - room.minCapacity})
                </Typography>
                <Box my={1} display="flex" gap={2}>
                    <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                        <FaWifi /> Wi-Fi
                    </Typography>
                    <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                        <FaChild /> Bed {/* Changed to child icon */}
                    </Typography>
                    <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                        <FaTv /> TV {/* Changed to TV icon */}
                    </Typography>
                    <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                        <BiSolidCabinet /> Cabinet
                    </Typography>
                </Box>
                <Box>
                    {
                        room.attributes.map(attr => (
                            <Typography key={attr.id}>
                                <span>&#8226;</span> {attr.name}
                            </Typography>
                        ))
                    }
                </Box>
            </Box>
            <Typography bgcolor="background.paper2" px={3} py={1.5} fontWeight="bold" color="primary"> {/* Adjusted text color */}
                Starting from PHP {room.price} per night
            </Typography>
            <Button onClick={() => nav('/rooms')} variant="contained" size='large' color="primary" sx={{ mx: 3, my: 1.5 }}> {/* Restyled button */}
                Explore Rooms {/* Adjusted button text */}
            </Button>
        </Box>
    );
};

export default RoomType;
