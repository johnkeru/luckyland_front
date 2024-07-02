import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReservationCottages from '../components/landing/create-reservation/rooms-services/services/ReservationCottages';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import LandingPage from './LandingPage';

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

const CottagesPage = ({ isOther }) => {
    const [cottagesAndAddOns, setCottagesAndAddOns] = useState({ cottages: [], addOns: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: `api/landing/${isOther ? 'others' : 'cottages'}`,
            setDataDirectly: setCottagesAndAddOns,
            setLoading,
        });
        return () => setCottagesAndAddOns({ cottages: [], addOns: [] });
    }, [isOther]);

    const heroDataParam = getUniqueCottagesByType(cottagesAndAddOns || []);
    const heroDataContent = getHeroData(heroDataParam) || [];

    return (
        <Box>
            <LandingPage isOtherPage content={heroDataContent} loading={loading} children={
                <Box display="flex" flexDirection="column" mx="auto" width={{ xs: '100%', md: '85%', lg: '80%' }}>
                    <Typography
                        variant="h2"
                        color='primary'
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 7,
                            mx: 5
                        }}
                    >
                        LuckyLand Resort's {isOther ? 'Others' : 'Cottages'}
                    </Typography>
                    <ReservationCottages isOther={isOther} defaultValue={{ cottagesAndAddOns, loading }} />
                </Box>
            } />
        </Box>
    )
}

export default CottagesPage