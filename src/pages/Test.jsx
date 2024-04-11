import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { FaUsers } from "react-icons/fa";

import { BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const Test = ({ room = {
    type: 'Family Room',
    attributes: [],
    minCapacity: 8,
    maxCapacity: 10,
    price: 3243,
    image: [{ url: 'https://res.cloudinary.com/kerutman/image/upload/v1712318098/434634660_226166927226572_5577912189830270801_n_vm4giq.jpg' },
    { url: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/3_vb5wxf.jpg' }]
} }) => {


    return (
        <Box width='50%' m='auto' border='1px solid #ccc' overflow='hidden' >
            <img src="https://res.cloudinary.com/kerutman/image/upload/v1712318098/434634660_226166927226572_5577912189830270801_n_vm4giq.jpg" alt="One Bedroom Pool Villa" style={{ width: '100%', height: '300px', objectFit: 'cover', }} />
            <Box px={3}>
                <Typography variant='h4' color='primary'>12 {room.type}</Typography>

                <Typography my={1.5} variant='body1' display='flex' alignItems='center' gap={1}><FaUsers /> Ideal for Families: {room.minCapacity} (+{room.maxCapacity - room.minCapacity})</Typography>
                <Box my={1.5} display='flex' gap={2}>
                    <Typography variant='body1' display='flex' alignItems='center' gap={1}><FaWifi /> Wi-Fi</Typography>
                    <Typography variant='body1' display='flex' alignItems='center' gap={1}><MdBedroomChild /> Bed</Typography>
                    <Typography variant='body1' display='flex' alignItems='center' gap={1}><PiTelevisionSimpleFill /> TV</Typography>
                    <Typography variant='body1' display='flex' alignItems='center' gap={1}><BiSolidCabinet /> Cabinet</Typography>
                </Box>
                <Box mb={1.5}>
                    <Typography>
                        <span>&#8226;</span> Your own Private Garden Retreat with a Crystal Clear Pool
                    </Typography>
                    <Typography>
                        <span>&#8226;</span> Experience Ultimate Relaxation in our Al Fresco Dining Pavilion and En-suite Bathroom
                    </Typography>
                </Box>
            </Box>
            <Typography bgcolor='background.paper2' px={3} py={1.5} fontWeight='bold'>Starting from PHP 16,329 per night</Typography>
            <Button variant='outlined' color='primary' sx={{ mx: 3, my: 1.5 }}>See all rooms</Button>
        </Box>
    );
};

export default Test;