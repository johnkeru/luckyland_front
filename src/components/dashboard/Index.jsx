import { Box } from '@mui/material';
import React from 'react';
import ResortOverview from './overview/ResortOverview';
import InventoryOverview from './overview/InventoryOverview';

const Index = () => {
    return (
        <Box>
            <ResortOverview />
            <Box my={1} />
            <InventoryOverview />
        </Box>
    );
};

export default Index;
