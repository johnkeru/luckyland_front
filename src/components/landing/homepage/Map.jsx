import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { FaLocationDot } from "react-icons/fa6";

const FamousPlacesMap = () => {
    const [mapSrc, setMapSrc] = useState(
        "https://maps.google.com/maps?q=luckyland%20resort&t=&z=15&ie=UTF8&iwloc=&output=embed"
    );

    const [activeItem, setActiveItem] = useState("LuckyLand Resort");

    const nearbyPlaces = [
        "LuckyLand Resort",
        "SM Sorsogon",
        "Sorsogon Rompeolas",
        "Sorsogon Capitol Park",
        "Sorsogon Sports Complex",
    ];

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleMapChange = (place) => {
        const isLuckyLand = place === nearbyPlaces[0];
        // Modify the map source based on the selected place
        setMapSrc(`https://maps.google.com/maps?q=${encodeURIComponent(place)}&t=${isLuckyLand ? 'h' : ''}&z=${isLuckyLand ? 18 : 13}&ie=UTF8&iwloc=&output=embed`);
        setActiveItem(place);

        // Scroll to the map section with smooth animation
        const mapSection = document.getElementById('map-section');
    };

    // Load the default map when the component mounts
    useEffect(() => {
        handleMapChange("LuckyLand Resort");
    }, []);

    return (
        <Box py={3} width={'80%'} m='auto'>
            <Box mb={5}>
                <Typography
                    variant="h3"
                    color='primary'
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                        mb: 2
                    }}
                >
                    Visit Us
                </Typography>
                <Typography textAlign='center'>Gabao, San Roque Bacon District Sorsogon City</Typography>
            </Box>

            <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'}>
                <Box flex={isSmallScreen ? "auto" : "1"} mb={isSmallScreen ? 2 : 0} mr={isSmallScreen ? 0 : 2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '400px', overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            id="gmap_canvas"
                            src={mapSrc}
                        ></iframe>
                        <a href="https://123movies-i.net"></a>
                        <br />
                        <style>
                            {`.mapouter{position:relative;text-align:right;height:400px;width:100%;}`}
                        </style>
                        <a href="https://www.embedgooglemap.net"></a>
                        <style>
                            {`.gmap_canvas{overflow:hidden;background:none!important;height:400px;width:100%;}`}
                        </style>
                    </Box>
                </Box>

                <Box flex={isSmallScreen ? "auto" : "1"}>
                    <Box width="100%">
                        <Button variant='contained' color={activeItem === nearbyPlaces[0] ? 'primary' : 'inherit'} onClick={() => handleMapChange(nearbyPlaces[0])} fullWidth size='large' sx={{ mb: 1 }} startIcon={<FaLocationDot />}>LuckyLand Resort</Button>
                        <Typography variant="h4" textAlign='center' mb={2}>Nearby Places</Typography>
                        <Box mb={1} >
                            {nearbyPlaces.filter(place => place !== nearbyPlaces[0]).map((place, index) => (
                                <Typography
                                    key={index}
                                    gutterBottom
                                    onClick={() => handleMapChange(place)}
                                    color={activeItem === place ? 'primary.main' : 'inherit'}
                                    sx={{ cursor: 'pointer', ":hover": { color: 'primary.main' } }}
                                >
                                    {place}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FamousPlacesMap;
