import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { BiSolidCabinet } from 'react-icons/bi';
import { FaChild, FaTv, FaUsers, FaWifi } from 'react-icons/fa'; // Changed MdBedroomChild to FaChild and PiTelevisionSimpleFill to FaTv
import { useNavigate } from 'react-router-dom';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';

const RoomType = ({ room, roomCounts }) => {
    const nav = useNavigate();

    return (
        <Box width="48%" border="1px solid #f0f0f0" overflow="hidden" position="relative" borderRadius={2} boxShadow={2} sx={{ ":hover": { boxShadow: 4, borderColor: '#ccc' } }}> {/* Adjusted box shadow and border color */}
            <CustomCarousel images={room.images} height={35} />
            <Box px={3} py={2}>
                <Typography variant="h5" color="primary" mb={1.5}>
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
