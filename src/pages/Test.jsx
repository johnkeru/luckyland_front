import React from 'react'
import { Box, Typography } from '@mui/material';
import { BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import formatPrice from '../utility_functions/formatPrice';
import { FaPeopleRoof } from 'react-icons/fa6';
import { IoPeopleSharp } from 'react-icons/io5';

const Test = () => {
    const rooms = [
        {
            'id': 1,
            'price': 31,
            'type': 'Family',
            'name': "Room 101",
            'image': 'https://res.cloudinary.com/kerutman/image/upload/v1712424306/1_zsnbrb.jpg',
            'capacity': 2
        },
        {
            'id': 2,
            'price': 32,
            'type': 'Friends/Couples',
            'name': "Room 202",
            'image': 'https://res.cloudinary.com/kerutman/image/upload/v1712424304/awefwa_nroxhs.webp',
            'capacity': 2
        },
        {
            'id': 3,
            'price': 33,
            'type': 'Friends/Couples',
            'name': "Room 303",
            'image': 'https://res.cloudinary.com/kerutman/image/upload/v1712424305/2_hwg4ns.webp',
            'capacity': 2
        },
        {
            'id': 4,
            'price': 34,
            'type': 'Family',
            'name': "Room 404",
            'image': 'https://res.cloudinary.com/kerutman/image/upload/v1712424304/awfwe_m1jnqu.webp',
            'capacity': 4
        },
    ]
    return (
        <Box display='flex' gap={2} flexWrap='wrap'>
            {
                rooms.map(room => (
                    <Box
                        key={room.id}
                        sx={{
                            backgroundImage: `url('${room.image}')`,
                            backgroundSize: 'cover',
                            width: '350px',
                            height: '280px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'end',
                                color: 'white',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(180deg, rgba(0,0,0,0) 39%, rgba(0,0,0,0.7372198879551821) 100%)',
                            }}
                        >
                            <Box width='100%'>
                                <Box sx={{
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                    bgcolor: room.type === 'Family' ? 'rgba(245, 170, 66, .8)' : 'rgba(24, 133, 201, .8)',
                                    width: 'fit-content',
                                    py: 1,
                                    px: 2,
                                    mb: .5
                                }}>
                                    <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: 600 }}>{room.type}</Typography>
                                </Box>
                                <Box mx={2} mb={2} >
                                    <Typography variant="body1" fontWeight={600}>{room.name}</Typography>

                                    <Box display="flex" alignItems="center" my={1} gap={2}>
                                        <MdBedroomChild />
                                        <FaWifi />
                                        <BiSolidCabinet />
                                        <PiTelevisionSimpleFill />
                                    </Box>

                                    <Box display='flex' justifyContent='space-between' mt={1} alignItems='center' width='100%' title={`${2} capacity (+${4 - 2})`}>
                                        <Typography variant="body2">
                                            ₱ {formatPrice(room.price)} / night
                                        </Typography>
                                        <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={.5}>
                                            {room.type === 'Family' ? <FaPeopleRoof /> : <IoPeopleSharp />} {2}
                                            <span style={{ color: 'green', fontSize: '13px' }}>(+{4 - 2})</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
}

export default Test
