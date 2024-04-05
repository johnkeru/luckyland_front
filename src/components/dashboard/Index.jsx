import React from 'react';
import { Container, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample static data for inventory
const inventoryData = [
    { id: 1, name: 'Standard Room', type: 'Room', capacity: 2, price: 100 },
    { id: 2, name: 'Deluxe Room', type: 'Room', capacity: 3, price: 150 },
    { id: 3, name: 'Beach Cottage', type: 'Cottage', capacity: 4, price: 200 },
    { id: 4, name: 'Family Room', type: 'Room', capacity: 4, price: 180 },
    { id: 5, name: 'Garden Cottage', type: 'Cottage', capacity: 3, price: 180 },
    { id: 6, name: 'Suite Room', type: 'Room', capacity: 2, price: 220 },
    { id: 7, name: 'Beachfront Villa', type: 'Villa', capacity: 6, price: 400 },
];

// Sample static data for reservations
const reservationData = [
    { id: 1, customer: 'John Doe', checkIn: '2024-04-10', checkOut: '2024-04-15', room: 'Standard Room' },
    { id: 2, customer: 'Jane Smith', checkIn: '2024-04-12', checkOut: '2024-04-18', room: 'Deluxe Room' },
    { id: 3, customer: 'Michael Johnson', checkIn: '2024-04-15', checkOut: '2024-04-20', room: 'Beach Cottage' },
    { id: 4, customer: 'Emily Williams', checkIn: '2024-04-18', checkOut: '2024-04-22', room: 'Family Room' },
    { id: 5, customer: 'Daniel Brown', checkIn: '2024-04-20', checkOut: '2024-04-25', room: 'Garden Cottage' },
    { id: 6, customer: 'Olivia Miller', checkIn: '2024-04-22', checkOut: '2024-04-27', room: 'Suite Room' },
    { id: 7, customer: 'Liam Wilson', checkIn: '2024-04-25', checkOut: '2024-04-30', room: 'Beachfront Villa' },
];

const Dashboard = () => {
    // Data for the bar chart
    const inventoryBarData = inventoryData.map(item => ({ name: item.name, price: item.price }));

    // Data for the line chart
    const reservationLineData = reservationData.map(item => ({
        name: item.customer,
        checkIn: new Date(item.checkIn).getTime(),
        checkOut: new Date(item.checkOut).getTime(),
    }));

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Inventory
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Capacity</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventoryData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>{item.capacity}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Bar Chart for Inventory Prices
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={inventoryBarData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="price" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom>
                Reservations
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reservationLineData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="checkIn" stroke="#8884d8" />
                    <Line type="monotone" dataKey="checkOut" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Dashboard;
