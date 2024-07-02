import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { FaBed, FaSwimmingPool, FaUmbrellaBeach } from "react-icons/fa";

const OurFeatures = () => {
    return (
        <Box sx={{ py: 8 }} id='features'>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    Discover Our Resort Features
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            title: 'Swimming Pools',
                            icon: <FaSwimmingPool />,
                            img: 'https://res.cloudinary.com/kerutman/image/upload/v1717249296/pools/awefawefwaefwe_exxfah.jpg'
                        },
                        {
                            title: 'Comfortable Rooms',
                            icon: <FaBed />,
                            img: 'https://res.cloudinary.com/kerutman/image/upload/v1717243349/rooms/fam/IMG20240527101142_oqlmop.jpg'
                        },
                        {
                            title: 'Relaxing Cottages',
                            icon: <FaUmbrellaBeach />,
                            img: 'https://res.cloudinary.com/kerutman/image/upload/v1717201551/cottages/pool%20side%20cottages%201/IMG20240601071552_hxtjzj.jpg'
                        },
                    ].map((feature, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                borderRadius: '16px',
                                transition: 'transform 0.3s ease-in-out',  // Smooth transition
                                ":hover": {
                                    transform: 'scale(1.02)',  // Scale up on hover
                                }
                            }}>
                                <Box sx={{ fontSize: 64, color: 'gold' }}>{feature.icon}</Box>
                                <Typography variant="h5" gutterBottom color='GrayText' fontWeight={600}>{feature.title}</Typography>
                                <img
                                    src={feature.img}
                                    alt={feature.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                    }} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default OurFeatures;
