import { Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';

const PieInventory = ({ titleColor }) => {
    // Sample data representing out of stock, low stock, in stock, and reserved items
    const inventorySummaryData = [
        { id: 0, value: 5, label: 'Out of Stock', color: '#ff6961' },
        { id: 1, value: 15, label: 'Low Stock', color: '#ffa500' },
        { id: 2, value: 60, label: 'In Stock', color: '#77dd77' },
        { id: 3, value: 20, label: 'Reserved', color: '#77aaff' },
    ];

    return (
        <Paper elevation={2} variant='outlined' sx={{ p: 2, width: '100%', ":hover": { boxShadow: 4 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Inventory Summary
            </Typography>

            <PieChart
                colors={['#ff6961', '#ffa500', '#77dd77', '#77aaff']}
                series={[
                    {
                        data: inventorySummaryData,
                        innerRadius: 30,
                        outerRadius: 100,
                    },
                ]}
                height={220}
            />
        </Paper>
    );
};

export default PieInventory;
