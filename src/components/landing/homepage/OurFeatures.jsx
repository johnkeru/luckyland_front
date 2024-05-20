import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { FaBed, FaSwimmingPool, FaUmbrellaBeach } from "react-icons/fa";

const OurFeatures = () => {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Discover Our Resort Features
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            title: 'Swimming Pools',
                            icon: <FaSwimmingPool />,
                            img: 'https://res.cloudinary.com/kerutman/image/upload/w_400,h_300/v1714161773/317615995_112482475027373_7893802433168843657_n_e9ig95.jpg'
                        },
                        {
                            title: 'Comfortable Rooms',
                            icon: <FaBed />,
                            img: 'https://res.cloudinary.com/kerutman/image/upload/w_400,h_300/v1716089228/442494034_367901046263850_194221314086700140_n_hgqmzv.jpg'
                        },
                        {
                            title: 'Relaxing Cottages',
                            icon: <FaUmbrellaBeach />,
                            img: 'https://res.cloudinary.com/kerutman/image/upload/w_400,h_300/v1716088997/441349048_367900629597225_4736797796269193821_n_vnhcnr.jpg'
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
                                <Typography variant="h5" gutterBottom sx={{
                                    fontWeight: 'bold',
                                    color: 'text.primary'
                                }}>{feature.title}</Typography>
                                <img src={feature.img} alt={feature.title} style={{
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
