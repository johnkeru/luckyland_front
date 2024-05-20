import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import basicGetCall from "../../../utility_functions/axiosCalls/basicGetCall";
import CustomCarousel from "../../../utility_components/CustomCarousel";
import scrollTop from "../../../utility_functions/scrollTop";
import { useNavigate } from "react-router";
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children }) => {
    const [ref, inView] = useInView();
    const animation = useSpring({
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        config: { duration: 500 },
    });

    return (
        <animated.div ref={ref} style={animation}>
            {children}
        </animated.div>
    );
};

const Accommodation = ({ path }) => {
    const [roomType, setRoomType] = useState(null);
    const [cottageType, setCottageType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/accommodations',
            setLoading,
            setDataDirectly: (data) => {
                setRoomType(data.rooms[0]);
                setCottageType(data.cottages[0]);
            }
        });
    }, []);

    const nav = useNavigate();
    const handleGo = (path) => {
        nav(path);
        scrollTop();
    }

    return (
        <>
            {!loading ? (
                <AnimatedSection>
                    <Box sx={{ bgcolor: '#fdf5e6', py: 8 }}>
                        <Container maxWidth="lg">
                            <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
                                Accommodation
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary" paragraph>
                                Enjoy our beautifully designed rooms and cottages, each offering breathtaking views and
                                exceptional comfort.
                            </Typography>
                            <Grid container spacing={4}>
                                {path !== 'rooms' && (
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant='h4' textAlign='center' gutterBottom>Featured Rooms</Typography>
                                        <CustomCarousel
                                            images={roomType.rooms[0].images}
                                            height={400}
                                            noIndicator
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                            <Button
                                                size='large'
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleGo('/rooms')}
                                                sx={{
                                                    bgcolor: '#fcbd44',
                                                    "&:hover": {
                                                        bgcolor: '#ffcc80'
                                                    }
                                                }}
                                            >
                                                View All Rooms
                                            </Button>
                                        </Box>
                                    </Grid>
                                )}
                                {path !== 'cottages' && (
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant='h4' textAlign='center' gutterBottom>Featured Cottages</Typography>
                                        <CustomCarousel
                                            images={cottageType.cottages[0].images}
                                            height={400}
                                            noIndicator
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                            <Button
                                                size='large'
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleGo('/cottages')}
                                                sx={{
                                                    bgcolor: '#fcbd44',
                                                    "&:hover": {
                                                        bgcolor: '#ffcc80'
                                                    }
                                                }}
                                            >
                                                View All Cottages
                                            </Button>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Container>
                    </Box>
                </AnimatedSection>
            ) : (
                'loading...'
            )}
        </>
    );
}

export default Accommodation;
