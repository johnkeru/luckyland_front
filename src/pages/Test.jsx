import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const Test = () => {

    const reservationData = [
        { month: 'January', online: 20, walkIn: 15 },
        { month: 'February', online: 25, walkIn: 18 },
        { month: 'March', online: 30, walkIn: 15 },
        { month: 'April', online: 10, walkIn: 16 },
    ];

    // Calculate total online and walk-in reservations per month
    const monthlyTotals = reservationData.map(item => ({
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
        <Container maxWidth="xl" sx={{ my: 2 }}>
            <Box>
                <Box display="flex" justifyContent="center" alignItems="center" gap={2} textAlign='center' >
                    <Paper elevation={2} sx={{ width: '100%', py: 1, bgcolor: '#e4841c', color: 'white', borderRadius: 0 }}>
                        <Typography variant='body1' >UPCOMING GUESTS</Typography>
                        <Typography variant='h4' fontWeight={600}>5</Typography>
                    </Paper>
                    <Paper elevation={2} sx={{ width: '100%', py: 1, bgcolor: '#2494cc', color: 'white', borderRadius: 0 }}>
                        <Typography variant='body1' >WALK-IN</Typography>
                        <Typography variant='h4' fontWeight={600}>5</Typography>
                    </Paper>
                    <Paper elevation={2} sx={{ width: '100%', py: 1, bgcolor: '#642c81', color: 'white', borderRadius: 0 }}>
                        <Typography variant='body1' >MONTH GUESTS</Typography>
                        <Typography variant='h4' fontWeight={600}>5</Typography>
                    </Paper>
                    <Paper elevation={2} sx={{ width: '100%', py: 1, bgcolor: '#3a9e99', color: 'white', borderRadius: 0 }}>
                        <Typography variant='body1' >AVAILABLE ROOMS</Typography>
                        <Typography variant='h4' fontWeight={600}>5</Typography>
                    </Paper>
                    <Paper elevation={2} sx={{ width: '100%', py: 1, bgcolor: '#dc5622', color: 'white', borderRadius: 0 }}>
                        <Typography variant='body1' >AVAILABLE COTTAGES</Typography>
                        <Typography variant='h4' fontWeight={600}>5</Typography>
                    </Paper>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Paper elevation={2} sx={{ width: '100%', p: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 'bold', marginBottom: 3 }}>
                            Monthly Reservation Overview
                        </Typography>
                        <BarChart
                            series={[
                                { data: onlineData, name: 'Online' },
                                { data: walkInData, name: 'Walk-in' }
                            ]}
                            height={290}
                            xAxis={[{ data: months, scaleType: 'band' }]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                            tooltip={{ show: true }}
                        />
                    </Paper>

                    <Paper elevation={2} sx={{ width: '100%', p: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 'bold', marginBottom: 3 }}>
                            Booking Summary
                        </Typography>
                        fwefwe
                    </Paper>

                    <Paper elevation={2} sx={{ width: '100%', p: 2 }}>
                        wefawe
                    </Paper>
                </Box>

            </Box>

        </Container>
    );
};

export default Test;
