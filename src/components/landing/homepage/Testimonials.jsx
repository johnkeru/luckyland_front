import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const Testimonials = () => {
    return (
        <Box sx={{ bgcolor: "#f9f9f9", py: 8 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: "#333", fontWeight: 600 }}
                >
                    Testimonials
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    paragraph
                    sx={{ color: "#666" }}
                >
                    Hear from our happy guests about their unforgettable experiences at
                    LuckyLand Resort.
                </Typography>
                <Grid container spacing={4}>
                    {Array.from(new Array(3)).map((_, index) => (
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
                                    "This was the best vacation ever! The service was impeccable
                                    and the surroundings were stunning."
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                                >
                                    - Guest {index + 1}
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