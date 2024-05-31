import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import InventoryOverview from './overview/InventoryOverview';
import ResortOverview from './overview/ResortOverview';

const Index = () => {

    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        // Fetch the visitor count from the backend
        basicGetCall({
            endpoint: 'api/visitor',
            setDataDirectly: setVisitorCount
        })
    }, []);

    return (
        <Box>
            <Box sx={{ p: 2, border: '2px solid #ddd', bgcolor: grey[50], mb: 2 }}>
                <Typography variant='h5'>Total Visitors: {visitorCount}</Typography>
            </Box>
            <ResortOverview />
            <Box my={1} />
            <InventoryOverview />
        </Box>
    );
};

export default Index;
