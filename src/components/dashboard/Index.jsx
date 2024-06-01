import { Box, Typography } from '@mui/material';
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
            <Box sx={{
                p: 2,
                border: '2px solid #ddd',
                bgcolor: '#fafafa',
                mb: 2,
                mt: { xs: 2, sm: 0 },
                borderRadius: 2, // Optional: Rounded corners for a softer look
                boxShadow: 1, // Optional: Subtle shadow for better visual separation
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <Typography variant='h5' sx={{
                    fontWeight: 'bold',
                    color: 'text.primary'
                }}>
                    Total Visitors: {visitorCount}
                </Typography>
            </Box>
            <ResortOverview />
            <Box my={1} />
            <InventoryOverview />
        </Box>
    );
};

export default Index;
