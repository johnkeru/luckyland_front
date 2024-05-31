import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const staticTestimonials = [
    {
        name: "Guest 1",
        testimonial: "Beautiful resort! Peaceful and surrounded by nature. Lots of space to relax. Highly recommend!"
    },
    {
        name: "Guest 2",
        testimonial: "A quiet and serene place with many fun statues for kids, like Marvel characters, dinosaurs, animals, and heroes. Perfect for a getaway. Loved the wide open areas and natural beauty."
    },
    {
        name: "Guest 3",
        testimonial: "Amazing resort with breathtaking beauty. So peaceful and spacious. A refreshing and peaceful stay."
    }
];


const Testimonials = () => {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: "#333", fontWeight: 600 }}
                >
                    What Our Guests Say
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    paragraph
                    sx={{ color: "#666" }}
                >
                    Discover why our guests love staying at LuckyLand Resort!
                </Typography>
                <Grid container spacing={4}>
                    {staticTestimonials.map((testimony, index) => (
                        <Grid item key={index} xs={12} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                    borderRadius: 12,
                                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                    },
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                    sx={{ mb: 2, fontSize: "1.1rem", lineHeight: 1.6 }}
                                >
                                    {testimony.testimonial}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                                >
                                    - {testimony.name}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Testimonials;
