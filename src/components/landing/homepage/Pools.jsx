import { Box, Container, Grid, Typography } from '@mui/material';

const Pools = () => {
    const pools = [
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059023/441318717_367900382930583_4983071154116771212_n_cnqsfa.jpg',
            name: 'Kiddie Pool',
            ft: '1 to 2 ft.',
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059040/441248636_367900499597238_5469228456949724630_n_pmsedr.jpg',
            name: "Teen's Pool",
            ft: '3 to 4 ft.',
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059185/442493130_367900516263903_2306558164824536404_n_e00pxr.jpg',
            name: "Adult's Pool",
            ft: '3 to 6 ft.',
        },
    ];

    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Explore Our Swimming Pools
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    Dive into our pristine swimming pools and enjoy a refreshing escape from the sun.
                </Typography>
                <Grid container spacing={4}>
                    {pools.map((pool, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Box sx={{
                                position: 'relative',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                '&:hover img': {
                                    transform: 'scale(1.1)',
                                }
                            }}>
                                <img src={pool.img} alt={`Pool ${pool.name}`} style={{
                                    width: '100%',
                                    height: 'auto',
                                    transition: 'transform 0.3s ease-in-out',
                                }} />
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    width: '100%',
                                    p: 2,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    textAlign: 'center',
                                }}>
                                    <Typography variant="h5" fontWeight="bold" mb={1}>
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
