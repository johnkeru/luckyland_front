import { Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';

const PieBookingSummary = ({ titleColor }) => {

    return (
        <Paper variant='outlined' sx={{ p: 2, width: '100%', ":hover": { boxShadow: 4 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Booking Summary
            </Typography>

            <PieChart
                colors={['#ff6961', '#77aaff', '#d3d3d3', '#77dd77']}
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'Cancelled', color: '#ff6961' },
                            { id: 1, value: 20, label: 'Approved', color: '#77aaff' },
                            { id: 2, value: 5, label: 'Up Comming', color: '#77dd77' },
                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                    },
                ]}
                height={220}
            />
        </Paper>
    )
}

export default PieBookingSummary