import { Box, Typography } from '@mui/material';
import { cyan, grey, orange } from '@mui/material/colors';
import React from 'react';
import BarInventory from './inventory-charts/BarInventory';
import InventoryOverviewSub from './inventory-charts/InventoryOverviewSub';
import PieInventory from './inventory-charts/PieInventory';

const InventoryOverview = () => {
    const titleColor = cyan[700];

    return (
        <Box sx={{ p: 2, border: '2px solid #ddd', bgcolor: grey[50] }}>
            <Typography gutterBottom sx={{ color: orange[800], fontSize: '26px', fontWeight: 'bold', mb: 2 }}>
                Inventory Overview
            </Typography>

            <InventoryOverviewSub titleColor={titleColor} />

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }} flexDirection={{ xs: 'column', md: 'row' }}>
                <BarInventory titleColor={titleColor} />
                <PieInventory titleColor={titleColor} />
            </Box>
        </Box>
    );
};

export default InventoryOverview;
