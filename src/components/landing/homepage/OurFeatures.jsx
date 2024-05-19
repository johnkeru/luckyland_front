import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel.js";
import BeachAccessIcon from "@mui/icons-material/BeachAccess.js";
import StarIcon from "@mui/icons-material/Star.js";
import React from "react";

const OurFeatures = () => {
    return (
        <Box sx={{  py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Our Features
                </Typography>
                <Grid container spacing={4}>
                    {[
                        { title: 'Luxurious Rooms', icon: <HotelIcon />, img: 'https://source.unsplash.com/400x300/?hotel' },
                        { title: 'Beachfront Views', icon: <BeachAccessIcon />, img: 'https://source.unsplash.com/400x300/?beach' },
                        { title: 'Five-Star Dining', icon: <StarIcon />, img: 'https://source.unsplash.com/400x300/?dining' },
                    ].map((feature) => (
                        <Grid item key={feature.title} xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                {feature.icon}
                                <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                                <img src={feature.img} alt={feature.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default OurFeatures;