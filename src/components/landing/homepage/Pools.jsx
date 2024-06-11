import { Box, Container, Grid, Typography } from '@mui/material';

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

    return (
        <Box sx={{ py: 8, backgroundColor: '#f0f0f0' }}> {/* Setting a light background color */}
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
                    Discover Our Swimming Pools
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    Immerse yourself in our serene swimming pools and indulge in the ultimate relaxation.
                </Typography>
                <Grid container spacing={4}>
                    {pools.map((pool, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Box sx={{
                                position: 'relative',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Adding a subtle shadow
                                '&:hover img': {
                                    transform: 'scale(1.1)',
                                }
                            }}>
                                <img src={pool.img} alt={`Pool ${pool.name}`} style={{
                                    width: '100%',
                                    height: '300px',
                                    transition: 'transform 0.3s ease-in-out',
                                    objectFit: 'cover', // Ensuring the image covers the container
                                }} />
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    width: '100%',
                                    p: 1,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    textAlign: 'center',
                                }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {pool.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {pool.ft}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Pools;
