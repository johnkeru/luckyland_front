
import React from 'react'
import { Box } from '@mui/material';
import ResortOverview from './overview/ResortOverview';
import InventoryOverview from './overview/InventoryOverview';

const Index = () => {
    return (
        <Box>
            <ResortOverview />
            <InventoryOverview />
        </Box>
    )
}

export default Index