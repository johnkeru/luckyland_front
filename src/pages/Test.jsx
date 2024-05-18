import React from 'react';
import {
    Box, Button, Container, Grid, Paper, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HotelIcon from '@mui/icons-material/Hotel';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import StarIcon from '@mui/icons-material/Star';

const LuckyLandResort = () => {
    return (
        <main>
            {/* About Us */}
            <Box sx={{ bgcolor: '#f0f8ff', py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h4" align="center" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        LuckyLand Resort is a haven for those seeking luxury, relaxation, and a unique holiday experience. Nestled in an idyllic location, we offer top-notch amenities and unparalleled service.
                    </Typography>
                </Container>
            </Box>

            {/* Our Features */}
            <Box sx={{ bgcolor: '#e6e6fa', py: 8 }}>
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
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {feature.icon}
                                    <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                                    <img src={feature.img} alt={feature.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Accommodation */}
            <Box sx={{ bgcolor: '#fff0f5', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" gutterBottom>
                        Accommodation
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        Enjoy our beautifully designed rooms and suites, each offering breathtaking views and exceptional comfort.
                    </Typography>
                    <Grid container spacing={4}>
                        {Array.from(new Array(2)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6}>
                                <img src={`https://source.unsplash.com/400x300/?room${index}`} alt={`Room ${index}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Activities */}
            <Box sx={{ bgcolor: '#f5fffa', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" gutterBottom>
                        Activities
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        From water sports to spa treatments, our resort offers a variety of activities to keep you entertained and relaxed.
                    </Typography>
                    <Grid container spacing={4}>
                        {Array.from(new Array(3)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <img src={`https://source.unsplash.com/400x300/?activity${index}`} alt={`Activity ${index}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials */}
            <Box sx={{ bgcolor: '#fdf5e6', py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h4" align="center" gutterBottom>
                        Testimonials
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        Hear from our happy guests about their unforgettable experiences at LuckyLand Resort.
                    </Typography>
                    <Grid container spacing={4}>
                        {Array.from(new Array(3)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography variant="body1" color="text.secondary">
                                        "This was the best vacation ever! The service was impeccable and the surroundings were stunning."
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.primary" gutterBottom>
                                        - Guest {index + 1}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Ready to Book Your Stay? */}
            <Box sx={{ bgcolor: '#ffebcd', py: 8 }}>
                <Container maxWidth="sm">
                    <Typography variant="h4" align="center" gutterBottom>
                        Ready to Book Your Stay?
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        Don't miss out on the ultimate resort experience. Book your stay at LuckyLand Resort today!
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" sx={{ mx: 1 }}>Book Now</Button>
                    </Box>
                </Container>
            </Box>

            {/* FAQ */}
            <Box sx={{ bgcolor: '#e0ffff', py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h4" align="center" gutterBottom>
                        FAQ
                    </Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>What is the check-in and check-out time?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Check-in is from 3 PM, and check-out is until 11 AM.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Do you offer free Wi-Fi?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Yes, we offer complimentary high-speed Wi-Fi throughout the resort.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Are pets allowed?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Unfortunately, pets are not allowed at the resort.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </Box>

            {/* Swimming Pools */}
            <Box sx={{ bgcolor: '#ffefd5', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" gutterBottom>
                        Swimming Pools
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        Dive into our pristine swimming pools and enjoy a refreshing escape from the sun.
                    </Typography>
                    <Grid container spacing={4}>
                        {Array.from(new Array(3)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <img src={`https://source.unsplash.com/400x300/?pool${index}`} alt={`Pool ${index}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Gallery */}
            <Box sx={{ bgcolor: '#f5f5dc', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" gutterBottom>
                        Gallery
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        Explore our photo gallery to get a glimpse of the beauty and luxury that await you at LuckyLand Resort.
                    </Typography>
                    <Grid container spacing={4}>
                        {Array.from(new Array(6)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <img src={`https://source.unsplash.com/400x300/?resort${index}`} alt={`Gallery ${index}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Visit Us */}
            <Box sx={{ bgcolor: '#faf0e6', py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h4" align="center" gutterBottom>
                        Visit Us
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        Come visit us at LuckyLand Resort and experience the vacation of a lifetime. We're located at 123 Paradise Road, Dreamland.
                    </Typography>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.153059637321!2d144.9640733156169!3d-37.81421797975153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ddfa21e50d0e!2s123%20Paradise%20Road%2C%20Dreamland!5e0!3m2!1sen!2s!4v1620586958037!5m2!1sen!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0, borderRadius: '8px' }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </Container>
            </Box>
        </main>
    );
};

export default LuckyLandResort;
