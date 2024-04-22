import { Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import DashboardLoading from '../DashboardLoading';

const PieReservation = ({ titleColor }) => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: '/api/dashboard/pie-graph',
            setResponse: setData,
            setLoading
        });
    }, []);

    return (
        <Paper elevation={2} sx={{ p: 2, width: '100%', ":hover": { boxShadow: 5 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Booking Summary
            </Typography>

            {
                loading ? <DashboardLoading /> : data.length !== 0 ?
                    <PieChart
                        series={[
                            {
                                data,
                                innerRadius: 30,
                                outerRadius: 100,
                            },
                        ]}
                        height={220}
                    />
                    : 'no reservation yet.'
            }
        </Paper>
    )
}

export default PieReservation