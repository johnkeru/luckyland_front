import { Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall'

const BarMonthlyReservationOverview = ({ titleColor }) => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        basicGetCall({
            endpoint: '/api/dashboard',
            setResponse: setData,
            setLoading
        });
    }, [])

    // Calculate total online and walk-in reservations per month
    const monthlyTotals = loading ? [] : data.map(item => ({
        month: item.month,
        online: item.online,
        walkIn: item.walkIn,
        total: item.online + item.walkIn,
    }));


    // Extracting total online and walk-in per month
    const onlineData = monthlyTotals.map(item => item.online);
    const walkInData = monthlyTotals.map(item => item.walkIn);
    const months = monthlyTotals.map(item => item.month);

    return (
        <Paper variant='outlined' sx={{ p: 2, width: '100%', ":hover": { boxShadow: 4 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Monthly Reservation Overview
            </Typography>
            {loading ? 'loading...' : <BarChart
                series={[
                    { data: onlineData, label: 'Online' },
                    { data: walkInData, label: 'Walk-in' }
                ]}
                height={220}
                xAxis={[{ data: months, scaleType: 'band' }]}
                margin={{ bottom: 30, left: 40, right: 10 }}
                tooltip={{ show: true }}
            />}
        </Paper>
    )
}

export default BarMonthlyReservationOverview