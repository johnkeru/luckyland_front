import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import FeaturedRooms from './features/FeaturedRooms';
import FeaturedCottages from './features/FeaturedCottages';
import { primaryLightColors } from '../../../styles/globalStyle';

const Featured = ({ path }) => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [cottageTypes, setCottageTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/accommodations',
            setLoading,
            setDataDirectly: (data) => {
                setRoomTypes(data.rooms);
                setCottageTypes(data.cottages);
            }
        })
    }, []);

    return (
        <Box borderTop='1px solid #ddd' borderBottom='1px solid #ddd' pt={5} bgcolor={primaryLightColors.primary50}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    mb: 5 // Adding marginBottom to sx
                }}
            >
                Accommodations
            </Typography>
            {
                !path ? <>
                    <FeaturedRooms loading={loading} roomTypes={roomTypes} />
                    <FeaturedCottages loading={loading} cottageTypes={cottageTypes} />
                </> : path === 'rooms' ? <FeaturedCottages loading={loading} cottageTypes={cottageTypes} /> :
                    path === 'cottages' ? <FeaturedRooms loading={loading} roomTypes={roomTypes} /> : undefined
            }
        </Box>
    );
}

export default Featured;