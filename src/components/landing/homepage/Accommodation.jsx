import { Box, Container, Grid, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import basicGetCall from "../../../utility_functions/axiosCalls/basicGetCall.js";
import CustomCarousel from "../../../utility_components/CustomCarousel.jsx";
import scrollTop from "../../../utility_functions/scrollTop.js";
import {useNavigate} from "react-router";

const Accommodation = ({path}) => {

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
        })
    }, []);

    const nav = useNavigate();
    const handleGo = (path) => {
        nav(path);
        scrollTop();
    }

    return (
        <>
            {!loading ? (
                <Box sx={{  bgcolor: '#fdf5e6',py: 8 }}>
                    <Container maxWidth="lg">
                        <Typography variant="h4" align="center" gutterBottom>
                            Accommodation
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            Enjoy our beautifully designed rooms and suites, each offering breathtaking views and
                            exceptional comfort.
                        </Typography>
                        <Grid container spacing={4}>
                            {path !=='rooms' ? <Grid item xs={12} sm={6}>
                                <Typography variant='h4' textAlign='center' gutterBottom>Featured Rooms</Typography>
                                <CustomCarousel
                                    images={roomType.rooms[0].images}
                                    height={400}
                                    noIndicator
                                />
                                <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                                    <Button size='large' variant="contained" color="primary"
                                            onClick={() => handleGo('/rooms')}>View All Rooms</Button>
                                </Box>
                            </Grid> : undefined}
                            {path !=='cottages' ? <Grid item xs={12} sm={6}>
                                <Typography variant='h4' textAlign='center' gutterBottom>Featured Cottages</Typography>
                                <CustomCarousel
                                    images={cottageType.cottages[0].images}
                                    height={400}
                                    noIndicator
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                    <Button size='large' variant="contained" color="primary"onClick={()=>handleGo('/cottages')}>View All Cottages</Button>
                                </Box>
                            </Grid> : undefined}
                        </Grid>
                    </Container>
                </Box>
            ) : (
                'loading...'
            )}
        </>
    );
}

export default Accommodation;
