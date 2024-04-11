import { Box, Button, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { FaWifi } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight, FaPeopleRoof } from 'react-icons/fa6';
import { IoPeopleSharp } from 'react-icons/io5';
import formatPrice from '../../../../../utility_functions/formatPrice';
import { useNavigate } from 'react-router-dom'


const CottagesType = ({ cottage, cottageCounts }) => {
    const nav = useNavigate();

    const [hover, setHover] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cottage.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cottage.images.length - 1 : prevIndex - 1));
    };

    return (
        <Box
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                width: '595px',
                height: '380px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >

            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    transition: 'transform 0.3s ease', // Add transition for sliding effect
                    transform: `translateX(-${currentIndex * 380}px)` // Slide the container based on currentIndex
                }}
            >
                {cottage.images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={cottage.name}
                        style={{ width: '595px', height: '380px', objectFit: 'cover', objectPosition: 'center' }} // Set dimensions and object-fit
                    />
                ))}
            </Box>


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
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

                <Box
                    position='absolute'
                    width='100%'
                    height='100%'
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
                        onClick={handlePrevious}
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

                <Box width='100%'>
                    <Box display='flex' justifyContent='space-between' alignItems='center' mb={3}>
                        <Typography
                            sx={{
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                bgcolor: cottage.type === 'Big Cottage' ? 'rgba(188, 143, 143, .8)' : 'rgba(0, 128, 0, .7)',
                                width: 'fit-content',
                                py: 1,
                                px: 2,
                                fontSize: '20px',
                                fontWeight: 600
                            }}
                        >
                            {cottage.type}
                        </Typography>
                        <Box
                            sx={{
                                opacity: hover ? 1 : 0,
                                transition: 'opacity 0.3s ease',
                                transform: `translateX(${hover ? '0' : '20px'})`, // Adjust the value for desired sliding distance
                                transitionProperty: 'transform, opacity',
                                transitionDuration: '0.3s',
                                transitionTimingFunction: 'ease',
                                mr: 1
                            }}
                        >
                            <Button
                                onClick={() => nav('/cottages')}
                                size='large'
                                variant='outlined'
                                sx={{
                                    color: 'white',
                                    border: '1px solid white',
                                    ":hover": { color: 'white', border: '1px solid white' }
                                }}
                            >View All
                            </Button>
                        </Box>
                    </Box>

                    <Box mx={2}>
                        <Typography variant="body1" fontWeight={600}>{cottage.type === 'Big Cottage' ? cottageCounts['Big Cottage'] : cottageCounts['Small Cottage']} {cottage.type}</Typography>

                        <Box display="flex" alignItems="center" my={1} gap={1}>
                            <FaWifi />
                            <Typography>Free wifi</Typography>
                        </Box>

                        <Box display='flex' justifyContent='space-between' mt={1} alignItems='center' width='100%' title={`capacity ${cottage.capacity}`}>
                            <Typography variant="body1">
                                ₱ {formatPrice(cottage.price)} / night each
                            </Typography>
                            <Typography variant="body1" display='flex' justifyContent='space-between' alignItems='center' gap={.5}>
                                {cottage.type === 'Family' ? <FaPeopleRoof /> : <IoPeopleSharp />} {cottage.capacity}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default CottagesType;
