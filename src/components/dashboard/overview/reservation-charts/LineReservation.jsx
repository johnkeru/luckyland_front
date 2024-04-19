import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Paper, Typography } from '@mui/material';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import DashboardLoading from '../DashboardLoading';

export default function LineReservation({ titleColor }) {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: '/api/dashboard/line-graph',
            setResponse: setData,
            setLoading
        });
    }, []);

    const reservationData = loading ? [] : data;

    const dates = reservationData.map(item => new Date(item.date));
    const reservations = reservationData.map(item => item.reservations);

    return (
        <Paper elevation={2} sx={{ p: 2, width: '100%', ":hover": { boxShadow: 5 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Reservation Line Chart
            </Typography>

            {loading ? <DashboardLoading /> : data.length !== 0 ? <LineChart
                series={[
                    { data: reservations, name: 'Reservations' },
                    // You can add more series if needed
                ]}
                xAxis={[{ data: dates, scaleType: 'time' }]}
                yAxis={[{ scaleType: 'linear' }]}
                height={220}
                margin={{ top: 20, bottom: 40, left: 40, right: 10 }}
                tooltip={{ show: true }}
            /> : 'no reservation yet.'}
        </Paper>
    );
}
