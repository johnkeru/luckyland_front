import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import FeaturedRooms from './features/FeaturedRooms';
import FeaturedCottages from './features/FeaturedCottages';

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
        <Box borderTop='1px solid #ddd'>
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