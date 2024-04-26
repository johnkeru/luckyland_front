import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent, Divider } from '@mui/material';

// Function to generate random Unsplash URLs for images
function getRandomImageUrl() {
    const randomId = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    return `https://source.unsplash.com/collection/904/${400 + randomId}x${300 + randomId}`;
}

const SwimmingPoolsPage = () => {
    const pools = [
        {
            name: 'Small Pool',
            size: '10ft x 15ft',
            depth: '3ft',
            features: ['Heated', 'Child-friendly'],
        },
        {
            name: 'Medium Pool',
            size: '20ft x 30ft',
            depth: '5ft',
            features: ['Jacuzzi', 'Waterfall'],
        },
        {
            name: 'Adult Pool',
            size: '25ft x 50ft',
            depth: '7ft',
            features: ['Diving board', 'Poolside bar'],
        },
    ];

    return (
        <Box py={5} width='80%' m='auto'>
            <Typography
                variant="h3"
                color='primary'
                sx={{
                    mb: 10,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                }}
            >
                Swimming Pools
            </Typography>
            {pools.map((pool, index) => (
                <Box key={index} sx={{ mt: index !== 0 ? 4 : 0, }}>
                    {/* Image Section */}
                    <Box item xs={12} md={6} order={{ xs: index % 2 === 0 ? 1 : 2, md: index % 2 === 0 ? 1 : 2 }}>
                        <Card sx={{ boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)', }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={getRandomImageUrl()}
                                alt={pool.name}
                            />
                        </Card>
                    </Box>
                    {/* Details Section */}
                    <Box item xs={12} md={6} order={{ xs: index % 2 === 0 ? 2 : 1, md: 2 }}>
                        <Card sx={{ boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)', }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#00688B', fontWeight: 'bold' }}>
                                    {pool.name}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Size:</strong> {pool.size}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Depth:</strong> {pool.depth}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Features:</strong>
                                </Typography>
                                <ul style={{ paddingLeft: 20 }}>
                                    {pool.features.map((feature, index) => (
                                        <li key={index}>
                                            <Typography variant="body2" color="text.secondary">
                                                - {feature}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default SwimmingPoolsPage;
