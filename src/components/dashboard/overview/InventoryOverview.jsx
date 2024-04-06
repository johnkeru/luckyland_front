import React from 'react';
import { Typography, Table, TableContainer, Container, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Box, Avatar } from '@mui/material';

const Dashboard = () => {
    // Dummy data with images
    const roomInventory = [
        { name: "Shampoo", quantity: 10, image: "https://via.placeholder.com/50" },
        { name: "Soap", quantity: 10, image: "https://via.placeholder.com/50" },
        { name: "Toothpaste", quantity: 10, image: "https://via.placeholder.com/50" },
        // Add more items with images as needed
    ];
    const cottageInventory = [
        { name: "Chair", quantity: 10, image: "https://via.placeholder.com/50" },
        { name: "Table", quantity: 10, image: "https://via.placeholder.com/50" },
        { name: "Utensils", quantity: 10, image: "https://via.placeholder.com/50" },
        // Add more items with images as needed
    ];

    // Calculate total items in room inventory
    const totalRoomItems = roomInventory.reduce((acc, item) => acc + item.quantity, 0);
    // Calculate total items in cottage inventory
    const totalCottageItems = cottageInventory.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                Inventory Overview
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Box sx={{ p: 2, backgroundColor: '#f0f0f0' }}>
                        <Typography variant="h6" gutterBottom>
                            Room Inventory
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {roomInventory.map(item => (
                                        <TableRow key={item.name}>
                                            <TableCell component="th" scope="row">
                                                <Avatar src={item.image} alt={item.name} sx={{ marginRight: 1 }} />
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography sx={{ mt: 1 }}>Total Items: {totalRoomItems}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ p: 2, backgroundColor: '#f0f0f0' }}>
                        <Typography variant="h6" gutterBottom>
                            Cottage Inventory
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cottageInventory.map(item => (
                                        <TableRow key={item.name}>
                                            <TableCell component="th" scope="row">
                                                <Avatar src={item.image} alt={item.name} sx={{ marginRight: 1 }} />
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography sx={{ mt: 1 }}>Total Items: {totalCottageItems}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Typography sx={{ mt: 2 }}>Last Inventory Date: DD/MM/YYYY</Typography>
        </Box>
    );
};

export default Dashboard;
