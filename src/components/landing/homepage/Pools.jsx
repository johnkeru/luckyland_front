import { useState } from 'react';
import { Box, Container, Typography, IconButton, Grid } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const Pools = () => {
    const pools = [
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1717249325/pools/ijfpowafaw_z7bgnr.jpg',
            name: 'Kiddie Pool',
            ft: '1 to 2 ft.',
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1717249326/pools/awefawe_pzojho.jpg',
            name: "Teen's Pool",
            ft: '3 to 4 ft.',
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1717249297/pools/aefwe_zruos8.jpg',
            name: "Adult's Pool",
            ft: '3 to 6 ft.',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === pools.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? pools.length - 1 : prevIndex - 1));
    };

    return (
        <Box sx={{ py: 8, backgroundColor: '#f0f0f0' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    Discover Our Swimming Pools
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    Immerse yourself in our serene swimming pools and indulge in the ultimate relaxation.
                </Typography>
                <Box sx={{ position: 'relative', maxWidth: '100%', overflow: 'hidden' }}>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '8px',
                        }}
                        onClick={prevSlide}
                    >
                        <NavigateBefore />
                    </IconButton>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: '0',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '8px',
                        }}
                        onClick={nextSlide}
                    >
                        <NavigateNext />
                    </IconButton>
                    <Grid container spacing={0} justifyContent="center">
                        {pools.map((pool, index) => (
                            <Grid key={index} item xs={12} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        height: '60vh', // Adjust height as needed
                                        width: '100%',
                                        overflow: 'hidden',
                                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <img
                                        src={pool.img}
                                        alt={`Pool ${pool.name}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease-in-out',
                                            cursor: 'pointer',
                                        }}
                                        onClick={nextSlide}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: '0',
                                            left: '0',
                                            width: '100%',
                                            p: 2,
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="h6" fontWeight="bold">
                                            {pool.name}
                                        </Typography>
                                        <Typography variant="body1">{pool.ft}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Pools;
