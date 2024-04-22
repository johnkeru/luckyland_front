import { Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import DashboardLoading from '../DashboardLoading';

const BarInventory = ({ titleColor }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: '/api/dashboard/room-stock-level',
            setResponse: setData,
            setLoading
        });
    }, [])

    const inventoryData = loading ? [] : data;
    // [
    //     { item: 'Shampoo', stockLevel: 80 },
    //     { item: 'Soap', stockLevel: 70 },
    //     { item: 'Towels', stockLevel: 60 },
    //     { item: 'Chairs', stockLevel: 50 },
    //     { item: 'Tables', stockLevel: 40 },
    // ];

    // Extracting inventory items and stock levels
    const items = inventoryData.map(item => item.item);
    const stockLevels = inventoryData.map(item => item.stockLevel);

    return (
        <Paper elevation={2} sx={{ p: 2, width: '100%', ":hover": { boxShadow: 5 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Room Stock Overview
            </Typography>

            {loading ? <DashboardLoading /> : data.length !== 0 ? <BarChart
                series={[{ data: stockLevels, label: 'Stock Level' }]}
                height={220}
                xAxis={[{ data: items, scaleType: 'band' }]}
                margin={{ bottom: 30, left: 40, right: 10 }}
                tooltip={{ show: true }}
            /> : 'no reservation yet.'}
        </Paper>
    );
};

export default BarInventory;
