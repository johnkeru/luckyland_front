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
        <Box sx={{ py: 8, }} id='accommodations'> {/* Setting a light background color */}
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    {isOtherPage ? 'Other Accommodations' : 'Accommodations'}
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Explore our beautifully designed accommodations for an unforgettable stay.
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
                                            Our rooms cater to all needs, offering comfortable options for couples, friends, and families.
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
                                            We offer cottages in various sizes, perfect for both small and large groups.
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
                                            Our function hall and tree house are perfect for events and parties.
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
