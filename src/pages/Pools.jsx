import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const PoolComponent = () => {
    const getRandomImage = () => {
        const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
        return `https://picsum.photos/500/300?random=${randomNumber}`; // Fetch a random image from Lorem Picsum
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>
                Welcome to Our Resort
            </Typography>

            <Typography variant="h4" sx={{ mb: 2 }}>
                Our Pools
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
                <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px', mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Kids Pool
                    </Typography>
                    <img src={getRandomImage()} alt="Kids Pool" style={{ width: '100%', borderRadius: '4px' }} />
                    <Typography>
                        A shallow pool designed for children
                    </Typography>
                </Box>

                <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px', mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Teen Pool
                    </Typography>
                    <img src={getRandomImage()} alt="Teen Pool" style={{ width: '100%', borderRadius: '4px' }} />
                    <Typography>
                        A pool suitable for teenagers
                    </Typography>
                </Box>

                <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px', mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Adult Pool
                    </Typography>
                    <img src={getRandomImage()} alt="Adult Pool" style={{ width: '100%', borderRadius: '4px' }} />
                    <Typography>
                        A pool for adults to relax and swim
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default PoolComponent;
