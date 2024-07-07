import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { BiWifi } from "react-icons/bi";
import { BsClockHistory, BsFillPersonFill, BsClockFill } from "react-icons/bs";

const AboutLuckyLand = () => {
    const getLocalTime = () => {
        const now = new Date();
        const philippineTime = now.toLocaleTimeString("en-US", {
            timeZone: "Asia/Manila",
        });
        return philippineTime;
    };

    return (
        <Box
            id='about'
            display="flex"
            flexDirection="column"
            mx="auto"
            py={8}
            width={{ xs: "90%", md: "75%", lg: "70%" }}
        >
            <Typography variant="h4" align="center" gutterBottom mb={4} color="primary.main" fontWeight={600}>
                About LuckyLand Resort
            </Typography>

            <Box
                display="flex"
                justifyContent="space-between"
                flexDirection={{ xs: "column", lg: "row" }}
                mb={{ xs: 0, md: 2 }}
                gap={{ xs: 1, md: 3 }}
            >
                <Box
                    height={{ xs: "100%", lg: "350px" }}
                    width={{ xs: "100%", lg: "650px" }}
                >
                    <img
                        src="https://res.cloudinary.com/kerutman/image/upload/v1719747437/448240548_512461227883314_3545241557700989722_n_tgcln2.jpg"
                        alt="LuckyLand Resort"
                        loading="eager"
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                            height: "100%",
                            width: "100%",
                            borderRadius: "8px",
                        }}
                    />
                </Box>

                <Box width={{ xs: "100%", lg: "60%" }}>
                    <Typography variant="body1" gutterBottom fontWeight={600}>
                        Local Time: {getLocalTime()} (GMT+8)
                    </Typography>
                    <Typography variant="body1" mb={3} color="text.secondary">
                        Escape to LuckyLand Resort, situated in the heart of Purok 5, Brgy. San Isidro, Bacon, Sorsogon
                        City. Our resort offers a blend of comfort and simplicity amidst the picturesque landscapes of Sorsogon.
                    </Typography>
                    <Typography variant="body1" mb={3} color="text.secondary">
                        Indulge in delightful local cuisine at our cozy canteen, unwind by the poolside, or explore the scenic trails and nearby
                        attractions. LuckyLand Resort promises an unforgettable retreat for your next getaway.
                    </Typography>
                </Box>
            </Box>

            <Box display='flex' gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                <Box mb={{ xs: 2, sm: 0 }}>
                    <Typography variant="h6" fontWeight="bold" mb={1} color="primary.main">
                        AT A GLIMPSE
                    </Typography>
                    <Divider sx={{ mb: 2, bgcolor: 'primary.main', width: '100px', py: .1, borderRadius: 5 }} />
                    <Box m={3} my={2} color="text.secondary">
                        <ul>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    16 rooms available, suitable for couples, friends, and families.
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    39 different cottages offered, catering to both large and small groups.
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    3 Swimming Pools on-site for your enjoyment.
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    2 Tree Houses
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    1 Open Hall
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc" }}>
                                <Typography variant="body1">
                                    Surrounded by nature for a tranquil atmosphere.
                                </Typography>
                            </li>
                        </ul>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={2} color="text.secondary">
                        <BsClockHistory />
                        <Typography variant="body2" fontWeight={600} fontSize={13}>
                            <span>
                                8:00 AM - 4:00 PM DAYTIME / 5:00 PM - 11:30 PM OVERNIGHT
                            </span>
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} color="text.secondary">
                        <BiWifi size={30} />
                        <Typography variant="body1">
                            Complimentary Wi-Fi available throughout the resort (Starlink & PLDT).
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight="bold" mb={1} color="primary.main">
                        ENTRANCE FEE
                    </Typography>
                    <Box m={3} my={2} color="text.secondary">
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                            Day-time Rates: (8:00 am - 4:00 pm)
                        </Typography>
                        <ul>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    Kids (ages 3-12 years old) - 80.00
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    Seniors - 80.00
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    PWD - 80.00
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    Adult (13-59 years old) - 100.00
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                            Night-time Rates: (5:00 pm - 11:30 pm)
                        </Typography>
                        <ul>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    Kids - 100.00
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    Seniors - 100.00
                                </Typography>
                            </li>
                            <li style={{ listStyleType: "disc", marginBottom: "5px" }}>
                                <Typography variant="body1">
                                    Adult - 130.00 each
                                </Typography>
                            </li>
                        </ul>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutLuckyLand;
