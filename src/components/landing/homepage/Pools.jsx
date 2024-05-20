import { Box, Container, Grid, Typography } from '@mui/material';

const Pools = () => {
    const pools = [
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059023/441318717_367900382930583_4983071154116771212_n_cnqsfa.jpg',
            name: 'Kids Pool',
            size: '10m x 5m',
            depth: '0.5m - 1.0m',
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059040/441248636_367900499597238_5469228456949724630_n_pmsedr.jpg',
            name: 'Teens Pool',
            size: '20m x 10m',
            depth: '1.0m - 2.0m',
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059185/442493130_367900516263903_2306558164824536404_n_e00pxr.jpg',
            name: 'Adults Pool',
            size: '25m x 15m',
            depth: '1.5m - 3.0m',
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
                                    <Typography variant="body1" mb={1}>
                                        Size: {pool.size}
                                    </Typography>
                                    <Typography variant="body1">
                                        Depth: {pool.depth}
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
