import React from 'react';
import { Container, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const ResortOverview = () => {
    // Static data for demonstration
    const upcomingGuests = 25;
    const checkedOutGuests = 10;
    const reservationsOnline = 15;
    const reservationsWalkIn = 5;
    const totalGuests = upcomingGuests - checkedOutGuests;
    const availableRooms = 20;
    const vacantCottages = 5;
    const availableCottages = 10;

    const data = [
        { month: 'Jan', onlineReservations: 20, walkInReservations: 10 },
        { month: 'Feb', onlineReservations: 15, walkInReservations: 8 },
        { month: 'Mar', onlineReservations: 25, walkInReservations: 12 },
        { month: 'Apr', onlineReservations: 18, walkInReservations: 7 },
        { month: 'May', onlineReservations: 22, walkInReservations: 9 },
        { month: 'Jun', onlineReservations: 28, walkInReservations: 14 },
    ];

    // Static data for table metrics
    const tableMetrics = [
        { metric: 'UPCOMING GUESTS', value: 25 },
        { metric: 'CHECKED OUT GUESTS', value: 10 },
        { metric: 'ONLINE RESERVATIONS', value: 20 },
        { metric: 'WALK-IN RESERVATIONS', value: 10 },
    ];

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 'bold', marginBottom: 3 }}>
                    Resort Overview
                </Typography>
                <Paper sx={{ padding: 2, border: '1px solid #c0c0c0', transition: 'box-shadow 0.3s', ":hover": { boxShadow: 4 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                Key Metrics
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {tableMetrics.map(({ metric, value }) => (
                                            <TableRow key={metric}>
                                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>{metric}</TableCell>
                                                <TableCell>{value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                Reservation Trends
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={data}
                                    margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                                >
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="onlineReservations" fill="#8884d8" name="Online Reservations" />
                                    <Bar dataKey="walkInReservations" fill="#82ca9d" name="Walk-in Reservations" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Grid>

                    </Grid>
                </Paper>
            </Container>

            <Container maxWidth="xl" sx={{ mt: 2 }}>
                <Paper sx={{ padding: 2, border: '1px solid #c0c0c0', transition: 'box-shadow 0.3s', ":hover": { boxShadow: 4 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                Key Metrics
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Total number of guests this month</TableCell>
                                            <TableCell>{totalGuests}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Available rooms for the DAY</TableCell>
                                            <TableCell>{availableRooms}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Vacant cottages</TableCell>
                                            <TableCell>{vacantCottages}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Available cottages</TableCell>
                                            <TableCell>{availableCottages}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                Reservation Trends
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="onlineReservations" stroke="#8884d8" name="Online Reservations" />
                                    <Line type="monotone" dataKey="walkInReservations" stroke="#82ca9d" name="Walk-in Reservations" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Grid>


                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default ResortOverview;
