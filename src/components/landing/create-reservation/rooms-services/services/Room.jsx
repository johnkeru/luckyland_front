import React, { useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { FaPeopleRoof } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import formatPrice from '../../../../../utility_functions/formatPrice';
import RoleChip from "../../../../employee/RoleChip";

import { BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

const Room = ({ room, setViewRoom }) => {

    const [hover, setHover] = useState(false);

    return (
        <Card
            sx={{
                mb: 2,
                position: 'relative',
                border: '1px solid #ddd',
                width: '32%',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {hover && <Box
                position='absolute'
                width='100%'
                height='100%'
                top={0}
                left={0}
                display='flex'
                justifyContent='center'
                alignItems='center'
                color='white'
                sx={{
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.2862394957983193) 13%, rgba(0,0,0,0.5327380952380952) 100%)'
                }}
            >
                <Box display='flex' alignItems='center' gap={1}>
                    <Button variant='contained' color='success'>Add</Button>
                    <Button onClick={() => setViewRoom(room)} variant='outlined' sx={{ border: '1px solid white', color: 'white', ":hover": { border: '1px solid white' } }}>See more</Button>
                </Box>
            </Box>}
            <CardMedia
                component="img"
                height="140"
                image={room.images[0].url}
                alt={room.name}
            />
            <CardContent>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography variant="h6" component="div">
                        {room.name}
                    </Typography>
                    <RoleChip role={room.type} size="small" />
                    {!room.active ? <Chip label='Unavailable' /> : undefined}
                </Box>

                {/* attributes */}
                <Box my={2} display='flex' alignItems='center' gap={2} color='GrayText'>
                    <Box display='flex' alignItems='center' gap={1}>
                        <FaWifi />
                        <Typography fontSize='14px'>Wi-Fi</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap={.5} >
                        <PiTelevisionSimpleFill />
                        <Typography fontSize='14px'>TV</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap={.5} >
                        <MdBedroomChild />
                        <Typography fontSize='14px'>Bed</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap={.5}>
                        <BiSolidCabinet />
                        <Typography fontSize='14px'>Cabinet</Typography>
                    </Box>
                </Box>

                <Box display='flex' justifyContent='space-between' alignItems='center' mt={2} title={room.capacity + ' capacity'}>
                    <Typography variant="body2">
                        ₱{formatPrice(room.price)} / night
                    </Typography>
                    <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={1}>
                        {room.type === 'Family' ? <FaPeopleRoof /> : <IoPeopleSharp />} {room.capacity}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Room