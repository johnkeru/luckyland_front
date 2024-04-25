import formatPrice from '../../../../../utility_functions/formatPrice';

import { Box, Chip, Typography, Button, IconButton, Paper } from '@mui/material';
import { BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { FaPeopleRoof } from 'react-icons/fa6';
import { IoCheckmark, IoPeopleSharp } from 'react-icons/io5';
import { MdBedroomChild } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

import useServices from '../../../../../hooks/reservation/useServices';
import { useState } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ReservationRoom = ({ room, setViewRoom }) => {

    const { selectedRooms, pushNewRoom, removeRoom } = useServices();
    const isAddedToBook = selectedRooms.length !== 0 ? selectedRooms.some(rm => rm.id === room.id) : false;

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
            width={{ xs: '100%', md: '49%', lg: '32.5%', }}
            mb={1}
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
                        justifyContent: !isAddedToBook ? 'end' : 'space-between',
                        color: 'white',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        transition: 'opacity 0.3s ease',
                        background: hover ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7372198879551821) 100%)' : 'linear-gradient(180deg, rgba(0,0,0,0) 19%, rgba(0,0,0,0.5372198879551821) 100%)',
                        pb: 2,
                        pt: 1
                    }}
                >
                    {isAddedToBook && <Chip icon={<IoCheckmark color='black' />} sx={{ mx: 1, color: 'black', width: 'fit-content', bgcolor: 'white' }} size='small' label='Added' />}

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
                                    p: 1,
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
                                {
                                    !isAddedToBook ? <Button onClick={() => pushNewRoom(room)} variant='contained' color='success' startIcon={<IoMdAdd />}>Book</Button> :
                                        <Button onClick={() => removeRoom(room)} variant='contained' color='error' startIcon={<IoMdRemove />}>Cancel</Button>
                                }
                                {setViewRoom && <Button onClick={() => setViewRoom(room)} variant='outlined' sx={{ color: 'white', border: '1px solid white', ":hover": { color: 'white', border: '1px solid white' } }}>More</Button>}
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

                            <Box display='flex' justifyContent='space-between' mt={1} alignItems='center' width='100%' title={`${room.minCapacity} capacity (+${room.maxCapacity - room.minCapacity})`}>
                                <Typography variant="body2">
                                    ₱ {formatPrice(room.price)} / night
                                </Typography>
                                <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={.5}>
                                    {room.type === 'Family' ? <FaPeopleRoof /> : <IoPeopleSharp />} {room.minCapacity}
                                    <span style={{ color: 'lightgreen', fontSize: '13px' }}>(+{room.maxCapacity - room.minCapacity})</span>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default ReservationRoom

