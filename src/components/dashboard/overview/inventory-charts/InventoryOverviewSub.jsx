import { Box, Paper, Typography } from '@mui/material';
import { amber, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import GradientBox from '../GradientBox';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import DashboardLoading from '../DashboardLoading';

const InventoryOverviewSub = ({ titleColor }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: '/api/dashboard/inventory-summary',
            setResponse: setData,
            setLoading
        });
    }, []);

    return (
        <Paper elevation={2} sx={{ p: 2, width: '100%', ":hover": { boxShadow: 5 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Inventory Summary
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, textAlign: 'center', }} flexDirection={{ xs: 'column', md: 'row' }}>
                {loading ? <DashboardLoading height={100} /> : <GradientBox color1="#e4841c" color2="#ffb037">
                    <Typography variant='body2' >Room Inventory</Typography>
                    <Typography variant='h5' fontWeight={600}>Total: {data.roomItemsCount || 0}</Typography>
                    <Typography variant='body2'>Last Inventory: 2024-04-01</Typography>
                </GradientBox>}
                {loading ? <DashboardLoading height={100} /> : <GradientBox color1="#4CAF50" color2="#81C784">
                    <Typography variant='body2' >In Stock</Typography>
                    <Typography variant='h5' fontWeight={600}>Total: {data.inStockCount || 0}</Typography>
                    <Typography variant='body2'>Last Inventory: 2024-04-03</Typography>
                </GradientBox>}
                {loading ? <DashboardLoading height={100} /> : <GradientBox color1={amber[500]} color2="#ffc107">
                    <Typography variant='body2' >Low Stock</Typography>
                    <Typography variant='h5' fontWeight={600}>Count: {data.outOfStockCount || 0}</Typography>
                    <Typography variant='body2'>Last Inventory: 2024-04-03</Typography>
                </GradientBox>}
                {loading ? <DashboardLoading height={100} /> : <GradientBox color1={red[500]} color2="#ff7d4d">
                    <Typography variant='body2' >Out of Stock</Typography>
                    <Typography variant='h5' fontWeight={600}>Count: {data.outOfStockCount || 0}</Typography>
                    <Typography variant='body2'>Last Inventory: 2024-04-03</Typography>
                </GradientBox>}
            </Box>
        </Paper>
    )
}

export default InventoryOverviewSub