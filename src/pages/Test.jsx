import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaLocationDot } from 'react-icons/fa6';

const FamousPlacesMap = () => {
    const [activeItem, setActiveItem] = useState('LuckyLand Resort');

    const nearbyPlaces = [
        'LuckyLand Resort',
        'SM Sorsogon',
        'Sorsogon Rompeolas',
        'Sorsogon Capitol Park',
        'Sorsogon Sports Complex',
    ];

    const handleMapChange = (place) => {
        const isLuckyLand = place === nearbyPlaces[0];
        setActiveItem(place);
    };

    // Load the default map when the component mounts
    useEffect(() => {
        handleMapChange('LuckyLand Resort');
    }, []);

    return (
        <Box py={3}>
            <Box mb={5}>
                <Typography
                    variant="h3"
                    color="primary"
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                        mb: 2,
                    }}
                >
                    We're Located At
                </Typography>
                <Typography textAlign="center">Gabao, San Roque Bacon District Sorsogon City!</Typography>
            </Box>

            <Box display="flex" flexDirection={'row'}>
                <Box flex={'1'} mb={0} mr={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '400px',
                            overflow: 'hidden',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <MapContainer center={[13.0000, 122.9667]} zoom={13} style={{ width: '100%', height: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[13.0000, 122.9667]}>
                                <Popup>
                                    LuckyLand Resort
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                </Box>

                <Box flex={'1'}>
                    <Box width="100%">
                        <Button
                            variant="contained"
                            color={activeItem === nearbyPlaces[0] ? 'primary' : 'inherit'}
                            onClick={() => handleMapChange(nearbyPlaces[0])}
                            fullWidth
                            size="large"
                            sx={{ mb: 1 }}
                            startIcon={<FaLocationDot />}
                        >
                            LuckyLand Resort
                        </Button>
                        <Typography variant="h4" textAlign="center" mb={2}>
                            Nearby Places
                        </Typography>
                        <Box mb={1} display="flex" justifyContent="space-between" flexWrap="wrap">
                            {nearbyPlaces.filter((place) => place !== nearbyPlaces[0]).map((place, index) => (
                                <Typography
                                    key={index}
                                    gutterBottom
                                    onClick={() => handleMapChange(place)}
                                    color={activeItem === place ? 'primary.main' : 'inherit'}
                                    sx={{ cursor: 'pointer', ':hover': { color: 'primary.main' } }}
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
