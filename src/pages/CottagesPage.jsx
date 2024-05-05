import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReservationCottages from '../components/landing/create-reservation/rooms-services/services/ReservationCottages';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import LandingPage from './LandingPage';
import { primaryLightColors } from '../styles/globalStyle';

function getUniqueCottagesByType(data) {
    const cottageTypesMap = new Map();
    const uniqueCottages = [];
    data.cottages.forEach(room => {
        if (!cottageTypesMap.has(room.type)) {
            cottageTypesMap.set(room.type, room);
        }
    });
    cottageTypesMap.forEach(room => {
        uniqueCottages.push(room);
    });
    return uniqueCottages;
}

function getHeroData(cottageTypesData) {
    let heroData = [];
    cottageTypesData.map(cottageType => (
        cottageType.images.map(image => {
            heroData.push({
                name: cottageType.type,
                description: cottageType.description,
                image: image.url
            });
        })
    ));

    return heroData;
}

const CottagesPage = () => {
    const [cottagesAndAddOns, setCottagesAndAddOns] = useState({ cottages: [], addOns: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/cottages',
            setDataDirectly: setCottagesAndAddOns,
            setLoading,
        });
    }, []);

    const heroDataParam = getUniqueCottagesByType(cottagesAndAddOns || []);
    const heroDataContent = getHeroData(heroDataParam) || [];
    return (
        <Box bgcolor={primaryLightColors.primary50}>
            <LandingPage isOtherPage content={heroDataContent} loading={loading} children={
                <Box display="flex" flexDirection="column" mx="auto" py={5} width={{ xs: '100%', md: '85%', lg: '80%' }}>
                    <Typography
                        variant="h2"
                        color='primary'
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 7 // Adding marginBottom to sx
                        }}
                    >
                        LuckyLand Resort's Cottages
                    </Typography>
                    <ReservationCottages defaultValue={{ cottagesAndAddOns, loading }} />
                </Box>
            } />
        </Box>
    )
}

export default CottagesPage