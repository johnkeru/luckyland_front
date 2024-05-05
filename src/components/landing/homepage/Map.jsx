// import { useTheme } from '@emotion/react';
// import { Box, Button, Typography, useMediaQuery } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { FaLocationDot } from "react-icons/fa6";
// import { PiMapPinFill } from "react-icons/pi";
// import { primary, primaryLightColors } from '../../../styles/globalStyle'

// const FamousPlacesMap = () => {

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const isDesktop = useMediaQuery(theme.breakpoints.down('md'));

//     const [mapSrc, setMapSrc] = useState(
//         "https://maps.google.com/maps?q=luckyland%20resort&t=&z=15&ie=UTF8&iwloc=&output=embed"
//     );

//     const [activeItem, setActiveItem] = useState("LuckyLand Resort");

//     const nearbyPlaces = [
//         "LuckyLand Resort",
//         "SM Sorsogon",
//         "Sorsogon Rompeolas",
//         "Sorsogon Capitol Park",
//         "Sorsogon Sports Complex",
//     ];

//     const handleMapChange = (place) => {
//         const isLuckyLand = place === nearbyPlaces[0];
//         // Modify the map source based on the selected place
//         setMapSrc(`https://maps.google.com/maps?q=${encodeURIComponent(place)}&t=${isLuckyLand ? 'h' : ''}&z=${isLuckyLand ? 18 : 13}&ie=UTF8&iwloc=&output=embed`);
//         setActiveItem(place);

//         // Scroll to the map section with smooth animation
//         const mapSection = document.getElementById('map-section');
//     };

//     // Load the default map when the component mounts
//     useEffect(() => {
//         handleMapChange("LuckyLand Resort");
//     }, []);

//     return (
//         <Box bgcolor={primary.contrastText}>
//             <Box py={3} width={{ xs: '100%', md: '85%', lg: '80%' }} m='auto'>
//                 <Box display="flex" flexDirection={{ xs: 'column-reverse', md: 'row' }}>
//                     <Box width={{ xs: '100%', md: "50%" }} mb={{ xs: 2, md: 0 }} mr={{ xs: 0, md: 2 }}>
//                         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '400px', overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
//                             <iframe
//                                 width="100%"
//                                 height="100%"
//                                 id="gmap_canvas"
//                                 src={mapSrc}
//                             ></iframe>
//                             <a href="https://123movies-i.net"></a>
//                             <br />
//                             <style>
//                                 {`.mapouter{position:relative;text-align:right;height:400px;width:100%;}`}
//                             </style>
//                             <a href="https://www.embedgooglemap.net"></a>
//                             <style>
//                                 {`.gmap_canvas{overflow:hidden;background:none!important;height:400px;width:100%;}`}
//                             </style>
//                         </Box>
//                         {/* <Button sx={{ width: { xs: '90%', sm: '100%' }, mb: 2, m: 'auto', textAlign: 'center', display: 'flex', }} variant='contained' color={activeItem === nearbyPlaces[0] ? 'primary' : 'inherit'} onClick={() => handleMapChange(nearbyPlaces[0])} fullWidth size='large' startIcon={<FaLocationDot />}>LuckyLand Resort</Button> */}
//                     </Box>

//                     <Box width={{ xs: "90%", md: "50%" }} m={{ xs: 'auto', md: '0' }} mb={{ xs: 2, sm: 0 }} color='primary.main' display='flex' justifyContent='center'>
//                         <Box textAlign='center'>
//                             <PiMapPinFill size={isMobile ? 100 : isDesktop ? 125 : 220} />
//                             <Typography fontSize={{ xs: '2rem', sm: '4rem' }} fontWeight={600} my={1}>Visit Us</Typography>
//                             <Typography fontSize={{ xs: '1rem', sm: '1.3rem' }} color='gray'>Gabao, San Roque Bacon District Sorsogon City</Typography>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default FamousPlacesMap;




import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { primaryLightColors } from '../../../styles/globalStyle';

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
        <Box bgcolor={primaryLightColors.primary50}>
            <Box py={3} width={{ xs: '100%', md: '85%', lg: '80%' }} m='auto' >
                <Box mb={5}>
                    <Typography
                        variant="h2"
                        color='primary'
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 2
                        }}
                    >
                        Visit Us
                    </Typography>
                    <Typography textAlign='center'>Gabao, San Roque Bacon District Sorsogon City</Typography>
                </Box>

                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                    <Box width={{ xs: '100%', md: "50%" }} mb={{ xs: 2, md: 0 }} mr={{ xs: 0, md: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '400px', overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <iframe
                                width="100%"
                                height="100%"
                                id="gmap_canvas"
                                src={mapSrc}
                            />
                        </Box>
                    </Box>

                    <Box width={{ xs: "90%", md: "50%" }} m={{ xs: 'auto', md: '0' }}>
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
