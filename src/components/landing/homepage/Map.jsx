import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaTree } from 'react-icons/fa';
import { MdLocalAirport, MdOutlineFoodBank, MdOutlineLocalMall, MdOutlineStadium } from "react-icons/md";

const FamousPlacesMap = () => {
    const [mapSrc, setMapSrc] = useState(
        'https://maps.google.com/maps?q=luckyland%20resort&t=&z=15&ie=UTF8&iwloc=&output=embed'
    );

    const [activeItem, setActiveItem] = useState('LuckyLand Resort');

    const nearbyPlaces = [
        { name: 'LuckyLand Resort', distance: '0 km', icon: <FaMapMarkerAlt /> },
        { name: 'Sorsogon Airport', distance: '2.1 km', icon: <MdLocalAirport /> },
        { name: 'SM Sorsogon', distance: '6.6 km', icon: <MdOutlineLocalMall /> },
        { name: 'Sorsogon Sports Complex', distance: '7.1 km', icon: <MdOutlineStadium /> },
        { name: 'Sorsogon Capitol Park', distance: '7.6 km', icon: <FaTree /> },
        { name: 'Sorsogon Rompeolas', distance: '9.4 km', icon: <MdOutlineFoodBank /> },
    ];

    const handleMapChange = (place) => {
        const isLuckyLand = place === nearbyPlaces[0].name;
        setMapSrc(
            `https://maps.google.com/maps?q=${encodeURIComponent(place)}&t=${isLuckyLand ? 'h' : ''}&z=${isLuckyLand ? 16 : 13}&ie=UTF8&iwloc=&output=embed`
        );
        setActiveItem(place);
    };

    useEffect(() => {
        handleMapChange('LuckyLand Resort');
    }, []);

    return (
        <Box sx={{ bgcolor: '#f0f8ff', py: 8, }}>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    Visit Us
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    paragraph
                >
                    Come visit us at LuckyLand Resort and experience the vacation of a
                    lifetime. We're located at Purok 5, Brgy. San Isidro Bacon Sorsogon
                    City. Landmarks: Grotto and Bahay Pag-asa.
                </Typography>


                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                >
                    <Box
                        width={{ xs: '100%', md: '48%' }}
                        mb={{ xs: 2, md: 0 }}
                        sx={{
                            height: '400px',
                            overflow: 'hidden',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: 1,
                            border: '2px solid primary.main'
                        }}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            id="gmap_canvas"
                            src={mapSrc}
                            style={{ border: 0 }}
                        />
                    </Box>

                    <Box width={{ xs: '100%', md: '48%' }}>
                        <Button
                            variant="contained"
                            color={activeItem === nearbyPlaces[0].name ? 'primary' : 'inherit'}
                            onClick={() => handleMapChange(nearbyPlaces[0].name)}
                            fullWidth
                            size="large"
                            sx={{ mb: 2, bgcolor: activeItem === nearbyPlaces[0].name ? 'primary.main' : 'inherit', color: activeItem === nearbyPlaces[0].name ? '#fff' : '#000' }}
                            startIcon={<FaMapMarkerAlt />}
                        >
                            LuckyLand Resort
                        </Button>
                        <Typography variant="h6" mb={1}>
                            Nearby Places
                        </Typography>
                        <Box>
                            {nearbyPlaces
                                .filter((place) => place.name !== nearbyPlaces[0].name)
                                .map((place, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => handleMapChange(place.name)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            ':hover': { color: 'primary.main' },
                                            textAlign: 'center',
                                            mb: 1,
                                            color: activeItem === place.name ? 'primary.main' : 'inherit'
                                        }}
                                    >
                                        {place.icon}
                                        <Typography sx={{ ml: 1 }}>
                                            {place.name} ({place.distance})
                                        </Typography>
                                    </Box>
                                ))}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FamousPlacesMap;
