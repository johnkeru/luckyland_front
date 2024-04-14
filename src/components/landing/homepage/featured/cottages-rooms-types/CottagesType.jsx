import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { FaTree, FaUsers, FaWifi } from 'react-icons/fa'; // Added FaTree for a nature touch
import { useNavigate } from 'react-router-dom';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';

const CottageType = ({ cottage, cottageCounts }) => {
    const nav = useNavigate();

    return (
        <Box width={{ xs: '100%', lg: "48%" }} border="1px solid #f0f0f0" overflow="hidden" position="relative" borderRadius={2} boxShadow={2} sx={{ ":hover": { boxShadow: 4, borderColor: '#ccc' } }}> {/* Adjusted box shadow and border color */}
            <CustomCarousel images={cottage.images} height={'30%'} />
            <Box px={3} py={2}>
                <Typography variant="h5" color="primary" mb={1.5}>
                    {cottage.type === 'Big Cottage' ? cottageCounts['Big Cottage'] : cottageCounts['Small Cottage']} {cottage.type}
                </Typography>

                <Typography my={1} variant="body1" display="flex" alignItems="center" gap={1}>
                    <FaUsers /> Ideal for {cottage.capacity} people
                </Typography>
                <Box my={1} display="flex" gap={2}>
                    <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                        <FaWifi /> Wi-Fi
                    </Typography>
                    <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                        <FaTree /> Nature views {/* Added nature icon */}
                    </Typography>
                </Box>

            </Box>
            <Typography bgcolor="background.paper2" px={3} py={1.5} fontWeight="bold" color="primary"> {/* Adjusted text color */}
                Starting from PHP {cottage.price} per night
            </Typography>
            <Button onClick={() => nav('/cottages')} variant="contained" size='large' color="primary" sx={{ mx: 3, my: 1.5, }}> {/* Restyled button */}
                Explore Cottages {/* Adjusted button text */}
            </Button>
        </Box>
    );
};

export default CottageType;
