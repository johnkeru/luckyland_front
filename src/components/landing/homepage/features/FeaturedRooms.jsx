import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { primary, primaryLightColors } from '../../../../styles/globalStyle';
import CustomCarousel from '../../../../utility_components/CustomCarousel';
import scrollTop from '../../../../utility_functions/scrollTop';

const FeaturedRooms = ({ loading, roomTypes }) => {

    const nav = useNavigate();
    const handleGo = () => {
        nav('/rooms');
        scrollTop();
    }
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        setSelectedType(roomTypes[0]);
    }, [roomTypes]);

    return (
        <Grid container justifyContent="center" alignItems="center" bgcolor={primary.contrastText}>

            <Grid item xs={12} md={6} py={{ xs: 3, md: 0 }}>
                <Box width={{ xs: '80%', md: '70%', lg: '50' }} m='auto'>
                    <Typography variant="h6" color='primary.main'>Our Rooms</Typography>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.75rem' } }}>Rooms</Typography>
                    <Box mt={4}>
                        {
                            loading ? <Skeleton height={100} /> :
                                selectedType ?
                                    <>
                                        {
                                            roomTypes.map((roomType) => (
                                                <RoomItem
                                                    isActive={roomType.type === selectedType.type}
                                                    key={roomType.id}
                                                    onClick={() => setSelectedType(roomType)}
                                                    id={roomType.id}
                                                    name={roomType.type}
                                                    price={`Price: ${roomType.price} per night`}
                                                    imageUrl={roomType.rooms[0].images[0].url} />
                                            ))
                                        }
                                    </> : undefined
                        }
                        <Button onClick={handleGo} sx={{ mt: 4 }} fullWidth variant='outlined' size='large'>View All rooms</Button>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                {
                    (loading) ? <Skeleton /> :
                        (selectedType && selectedType.rooms) ?
                            <CustomCarousel
                                images={selectedType.rooms[0].images}
                                height={500}
                                noIndicator
                            />
                            : undefined
                }
            </Grid>
        </Grid>
    );
}

function RoomItem({ isActive, name, price, imageUrl, onClick }) {
    return (
        <Box bgcolor={isActive ? primaryLightColors.primary200 : undefined} color={isActive ? '#fff' : undefined} p={1} sx={{ display: 'flex', mt: 2 }} onClick={onClick}>
            <img src={imageUrl} alt={name} style={{ width: '5rem', height: '4rem', marginRight: '0.5rem' }} />
            <Box>
                <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>{name}</Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem' }}>{price}</Typography>
            </Box>
        </Box>
    );
}

export default FeaturedRooms;