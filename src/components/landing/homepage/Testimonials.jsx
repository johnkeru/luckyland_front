import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const AnimatedTestimonial = ({ index }) => {
    const [ref, inView] = useInView();
    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : `translateX(${index % 2 === 0 ? '-' : ''}20px)`,
        config: { duration: 500 },
    });

    return (
        <Grid item xs={12} md={4}>
            <animated.div ref={ref} style={animation}>
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
            </animated.div>
        </Grid>
    );
};

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
                    {Array.from(new Array(3)).map((_, index) => (
                        <AnimatedTestimonial key={index} index={index} />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Testimonials;
