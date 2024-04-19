import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { cyan, red, amber, orange } from '@mui/material/colors';
import BarInventory from './inventory-charts/BarInventory';
import PieInventory from './inventory-charts/PieInventory';

const GradientBox = ({ children, color1, color2 }) => (
    <Box
        sx={{
            width: '100%',
            color: 'white',
            backgroundImage: `linear-gradient(135deg, ${color1}, ${color2})`,
            borderRadius: 1,
            padding: 1,
        }}
    >
        {children}
    </Box>
);

const InventoryOverview = () => {
    const titleColor = cyan[700];
    const outOfStockCount = 10; // Example value
    const lowStockCount = 20; // Example value

    return (
        <Box sx={{ p: 2, border: '2px solid #ddd', bgcolor: 'white' }}>
            <Typography gutterBottom sx={{ color: orange[800], fontSize: '26px', fontWeight: 'bold', mb: 2 }}>
                Inventory Overview
            </Typography>
            <Paper variant='outlined' sx={{ p: 2, width: '100%', ":hover": { boxShadow: 4 } }}>
                <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                    Inventory Overview
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, textAlign: 'center', }}>
                    <GradientBox color1="#e4841c" color2="#ffb037">
                        <Typography variant='body2' >Room Inventory</Typography>
                        <Typography variant='h5' fontWeight={600}>Total: 100</Typography>
                        <Typography variant='body2'>Last Inventory: 2024-04-01</Typography>
                    </GradientBox>
                    <GradientBox color1="#2dabea" color2="#83c2f7">
                        <Typography variant='body2' >Cottage Inventory</Typography>
                        <Typography variant='h5' fontWeight={600}>Total: 50</Typography>
                        <Typography variant='body2'>Last Inventory: 2024-04-03</Typography>
                    </GradientBox>
                    <GradientBox color1={red[500]} color2="#ff7d4d">
                        <Typography variant='body2' >Out of Stock</Typography>
                        <Typography variant='h5' fontWeight={600}>Count: {outOfStockCount}</Typography>
                        <Typography variant='body2'>Last Inventory: 2024-04-03</Typography>
                    </GradientBox>
                    <GradientBox color1={amber[500]} color2="#ffc107">
                        <Typography variant='body2' >Low Stock</Typography>
                        <Typography variant='h5' fontWeight={600}>Count: {lowStockCount}</Typography>
                        <Typography variant='body2'>Last Inventory: 2024-04-03</Typography>
                    </GradientBox>
                </Box>
            </Paper>

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <BarInventory titleColor={titleColor} />
                <PieInventory titleColor={titleColor} />
            </Box>
        </Box>
    );
};

export default InventoryOverview;
