import { Box, Container, Grid, Typography, Button, CircularProgress, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import basicGetCall from "../../../utility_functions/axiosCalls/basicGetCall";
import CustomCarousel from "../../../utility_components/CustomCarousel";
import scrollTop from "../../../utility_functions/scrollTop";
import { useNavigate } from "react-router";

const Accommodation = ({ path, isOtherPage }) => {
    const [roomType, setRoomType] = useState(null);
    const [cottageType, setCottageType] = useState(null);
    const [otherType, setOtherType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/accommodations',
            setLoading,
            setDataDirectly: (data) => {
                setRoomType(data.rooms[0]);
                setCottageType(data.cottages[0]);
                setOtherType(data.others[0]);
                setLoading(false); // Update loading state once data is fetched
            }
        });
    }, []);

    const nav = useNavigate();

    const handleGo = (path) => {
        nav(path);
        scrollTop();
    }

    return (
        <Box sx={{ py: 8, backgroundColor: '#f8f8f8' }}> {/* Setting a light background color */}
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    {isOtherPage ? 'Other Accommodations' : 'Accommodations'}
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Discover our accommodations, meticulously designed to offer you an unforgettable stay.
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={4} justifyContent="center">
                        {!path.includes('rooms') && roomType && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CustomCarousel
                                        images={roomType.rooms[0].images}
                                        height={300}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Featured Rooms
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Indulge in the comfort of our spacious rooms, equipped with modern amenities and stunning views.
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        size='large'
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleGo('/rooms')}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Explore Rooms
                                    </Button>
                                </Card>
                            </Grid>
                        )}
                        {!path.includes('cottages') && cottageType && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CustomCarousel
                                        images={cottageType.cottages[0].images}
                                        height={300}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Featured Cottages
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Immerse yourself in the charm of our cozy cottages, nestled amidst picturesque surroundings.
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        size='large'
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleGo('/cottages')}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Explore Cottages
                                    </Button>
                                </Card>
                            </Grid>
                        )}
                        {!path.includes('others') && otherType && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CustomCarousel
                                        images={otherType.others[0].images}
                                        height={300}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Featured Others
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Experience ultimate relaxation in our unique others, designed to exceed your expectations.
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        size='large'
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleGo('/others')}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Explore Others
                                    </Button>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

export default Accommodation;
