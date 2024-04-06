import formatPrice from '../../../../../utility_functions/formatPrice';

import { Box, Chip, Typography, Button } from '@mui/material';
import { BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { FaPeopleRoof } from 'react-icons/fa6';
import { IoCheckmark, IoPeopleSharp } from 'react-icons/io5';
import { MdBedroomChild } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

import useServices from '../../../../../hooks/reservation/useServices';
import { useState } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';


const Room = ({ room, setViewRoom }) => {

    const { selectedRooms, pushNewRoom, removeRoom } = useServices();
    const isAddedToBook = selectedRooms.length !== 0 ? selectedRooms.some(rm => rm.id === room.id) : false;

    const [hover, setHover] = useState(false);

    return (
        <Box
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                backgroundImage: `url('${room.images[0].url}')`,
                backgroundSize: 'cover',
                width: '380px',
                height: '280px',
                position: 'relative',
                ":hover": {
                    boxShadow: 10,
                    transition: 'ease-in-out 100ms'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: !isAddedToBook ? 'end' : 'space-between',
                    color: 'white',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 19%, rgba(0,0,0,0.7372198879551821) 100%)',
                    pb: 2,
                    pt: 1
                }}
            >
                {isAddedToBook && <Chip icon={<IoCheckmark color='black' />} sx={{ mx: 1, color: 'black', width: 'fit-content', bgcolor: 'white' }} size='small' label='Added' />}

                <Box width='100%'>

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
                            {
                                !isAddedToBook ? <Button onClick={() => pushNewRoom(room)} variant='contained' color='success' startIcon={<IoMdAdd />}>Book</Button> :
                                    <Button onClick={() => removeRoom(room)} variant='contained' color='error' startIcon={<IoMdRemove />}>Cancel</Button>
                            }
                            <Button onClick={() => setViewRoom(room)} variant='outlined' sx={{ color: 'white', border: '1px solid white', ":hover": { color: 'white', border: '1px solid white' } }}>More</Button>
                        </Box>
                    </Box>

                    <Box mx={2}>
                        <Typography variant="body1" fontWeight={600}>{room.name}</Typography>

                        <Box display="flex" alignItems="center" my={1} gap={2}>
                            <MdBedroomChild />
                            <FaWifi />
                            <BiSolidCabinet />
                            <PiTelevisionSimpleFill />
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
        </Box>
    )
}

export default Room

