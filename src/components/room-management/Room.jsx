import formatPrice from '../../utility_functions/formatPrice';

import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IoPeopleSharp } from 'react-icons/io5';
import { MdBedroomChild } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import RoomDetails from './RoomDetails';
import AddRoom from './modal/AddRoom';


const Room = ({ room, onSuccess, isCottage }) => {
    const [hover, setHover] = useState(false);

    const [currentSlide, setCurrentSlide] = useState(0);
    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === room.images.length - 1 ? 0 : prevSlide + 1));
    };
    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? room.images.length - 1 : prevSlide - 1));
    };

    return (
        <Box
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            height={300}
            width={450}
        >
            <Paper sx={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
                {room.images.map((image, index) => (
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

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'end',
                        color: 'white',
                        position: 'absolute',
                        zIndex: 20,
                        width: '100%',
                        height: '100%',
                        transition: 'opacity 0.3s ease',
                        background: hover ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7372198879551821) 100%)' : 'linear-gradient(180deg, rgba(0,0,0,0) 19%, rgba(0,0,0,0.5372198879551821) 100%)',
                        pb: 2,
                        pt: 1
                    }}
                >

                    <Box width='100%'>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            mb={1}
                            sx={{
                                opacity: hover ? 1 : 0,
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    transform: `translateX(${hover ? '0' : '-20px'})`, // Slide from left to right
                                    transition: 'transform 0.3s ease',
                                    opacity: hover ? 1 : 0,
                                    transitionDelay: '0.1s', // Delay transition for smoother effect
                                }}
                            >
                                <FaAngleLeft color='white' />
                            </IconButton>
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    transform: `translateX(${hover ? '0' : '20px'})`, // Slide from right to left
                                    transition: 'transform 0.3s ease',
                                    opacity: hover ? 1 : 0,
                                    transitionDelay: '0.1s', // Delay transition for smoother effect
                                }}
                            >
                                <FaAngleRight color='white' />
                            </IconButton>
                        </Box>

                        <Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
                            <Typography variant='h6'
                                sx={{
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                    bgcolor: room.type === 'Family' ? 'rgba(245, 170, 66, .8)' : 'rgba(24, 133, 201, .8)',
                                    width: 'fit-content',
                                    py: 1,
                                    px: 2,
                                    fontSize: '16px', fontWeight: 600
                                }}
                            >
                                {room.type}
                            </Typography>
                            <Box
                                sx={{
                                    opacity: hover ? 1 : 0,
                                    transition: 'opacity 0.3s ease',
                                    transform: `translateX(${hover ? '0' : '20px'})`, // Adjust the value for desired sliding distance
                                    transitionProperty: 'transform, opacity',
                                    transitionDuration: '0.3s',
                                    transitionTimingFunction: 'ease',
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                    mr: 1
                                }}
                            >
                                <AddRoom
                                    isCottage={isCottage}
                                    button={
                                        <Button variant="contained">Edit</Button>
                                    }
                                    defaultValues={room}
                                    onSuccess={onSuccess}
                                />
                                {onSuccess && <RoomDetails
                                    isCottage={isCottage}
                                    room={room}
                                    onSuccess={onSuccess}
                                    button={
                                        <Button variant='outlined' sx={{ color: 'white', border: '1px solid white', ":hover": { color: 'white', border: '1px solid white' } }}>More</Button>
                                    }
                                />}
                            </Box>
                        </Box>

                        <Box mx={2}>
                            <Typography variant="body1" fontWeight={600}>{room.name}</Typography>

                            <Box display="flex" alignItems="center" my={1} gap={2}>
                                <MdBedroomChild title='bed' />
                                <FaWifi title='free wifi' />
                                <BiSolidCabinet title='cabinet' />
                                <PiTelevisionSimpleFill title='televesion' />
                            </Box>

                            <Box display='flex' justifyContent='space-between' mt={1} alignItems='center' width='100%' title={!isCottage ? `${room.minCapacity} capacity (+${room.maxCapacity - room.minCapacity})` : `${room.capacity} capacity`}>
                                <Typography variant="body2">
                                    ₱ {formatPrice(room.price)} / night
                                </Typography>
                                <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={.5}>
                                    <IoPeopleSharp /> {!isCottage ? room.minCapacity : room.capacity}
                                    {!isCottage ? <span style={{ color: 'lightgreen', fontSize: '13px' }}>(+{room.maxCapacity - room.minCapacity})</span> : undefined}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default Room