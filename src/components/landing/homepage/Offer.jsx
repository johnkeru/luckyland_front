import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Offer = () => {
    return (
        <Box mt={8} pb={10}>
            <Container maxWidth="md">
                <Typography variant="h3" mt={3} pb={2} align="center">
                    About LuckyLand Resort
                </Typography>
                <Box sx={{ width: '100px', height: '5px', bgcolor: 'gray', mx: 'auto', mb: 7 }} />
            </Container>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        paddingRight: { md: '20px' },
                        order: { xs: 2, md: 1 },
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            background: `url('https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg') center/cover fixed`,
                            backgroundPosition: 'center', // Center the background image
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            height: '400px', // Adjust height as needed
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                zIndex: 0,
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        paddingLeft: { md: '20px' },
                        order: { xs: 1, md: 2 },
                    }}
                >
                    <Box pr={10}>
                        <Typography variant="h4" gutterBottom align="center">
                            Luckyland Resort
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et semper libero.
                            Vestibulum vitae ante id libero scelerisque convallis a vel tellus.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Suspendisse eget arcu semper, eleifend nisi vel, laoreet nisi. Vivamus commodo semper
                            lacus, vel hendrerit turpis bibendum nec.
                        </Typography>
                        <Typography variant="body1">
                            Phasellus fringilla nunc sit amet magna posuere, id egestas tortor luctus. Mauris eu
                            massa sit amet magna aliquet luctus. Ut feugiat, elit id ultricies tincidunt, est
                            purus volutpat velit.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Offer;
