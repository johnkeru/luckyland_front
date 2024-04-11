import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Paper, Typography } from '@mui/material';

export default function LineReservation({ titleColor }) {
    const reservationData = [
        { date: '2024-01-01', reservations: 20 },
        { date: '2024-02-01', reservations: 25 },
        { date: '2024-03-01', reservations: 30 },
        { date: '2024-04-01', reservations: 15 },
    ];

    const dates = reservationData.map(item => new Date(item.date));
    const reservations = reservationData.map(item => item.reservations);

    return (
        <Paper variant='outlined' sx={{ p: 2, width: '100%', ":hover": { boxShadow: 4 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Reservation Line Chart
            </Typography>

            <LineChart
                series={[
                    { data: reservations, name: 'Reservations' },
                    // You can add more series if needed
                ]}
                xAxis={[{ data: dates, scaleType: 'time' }]}
                yAxis={[{ scaleType: 'linear' }]}
                height={220}
                margin={{ top: 20, bottom: 40, left: 40, right: 10 }}
                tooltip={{ show: true }}
            />
        </Paper>
    );
}
