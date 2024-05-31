import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import basicGetCall from "../../../utility_functions/axiosCalls/basicGetCall";
import CustomCarousel from "../../../utility_components/CustomCarousel";
import scrollTop from "../../../utility_functions/scrollTop";
import { useNavigate } from "react-router";

const Accommodation = ({ path }) => {
    const [roomType, setRoomType] = useState(null);
    const [cottageType, setCottageType] = useState(null);
    const [otheryType, setOtherType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/accommodations',
            setLoading,
            setDataDirectly: (data) => {
                setRoomType(data.rooms[0]);
                setCottageType(data.cottages[0]);
                setOtherType(data.others[0]);
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
                <Box sx={{ bgcolor: '#fdf5e6', py: 8 }}>
                    <Container maxWidth="lg">
                        <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
                            Accommodation
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            Enjoy our beautifully designed rooms and cottages, each offering breathtaking views and
                            exceptional comfort.
                        </Typography>
                        <Box>
                            {path !== 'rooms' && (
                                <Box mb={4}>
                                    <Typography variant='h4' textAlign='center' gutterBottom>Featured Rooms</Typography>
                                    <CustomCarousel
                                        images={roomType.rooms[0].images}
                                        height={450}
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
                                </Box>
                            )}
                            {path !== 'cottages' && (
                                <Box mb={4}>
                                    <Typography variant='h4' textAlign='center' gutterBottom>Featured Cottages</Typography>
                                    <CustomCarousel
                                        images={cottageType.cottages[0].images}
                                        height={450}
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
                                </Box>
                            )}
                            {path !== 'others' && (
                                <Box mb={4}>
                                    <Typography variant='h4' textAlign='center' gutterBottom>Featured Others</Typography>
                                    <CustomCarousel
                                        images={otheryType.others[0].images}
                                        height={450}
                                        noIndicator
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                        <Button
                                            size='large'
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleGo('/others')}
                                            sx={{
                                                bgcolor: '#fcbd44',
                                                "&:hover": {
                                                    bgcolor: '#ffcc80'
                                                }
                                            }}
                                        >
                                            View All Others
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Container>
                </Box>
            ) : (
                'loading...'
            )}
        </>
    );
}

export default Accommodation;
