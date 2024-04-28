import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import FeaturedRooms from './features/FeaturedRooms';
import FeaturedCottages from './features/FeaturedCottages';

const Featured = () => {
    const ROOMS = 'Rooms';
    const COTTAGES = 'Cottages';

    // to show
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
        <Box>
            <FeaturedRooms loading={loading} roomTypes={roomTypes} />
            <FeaturedCottages loading={loading} cottageTypes={cottageTypes} />
        </Box>
    );
}

export default Featured;