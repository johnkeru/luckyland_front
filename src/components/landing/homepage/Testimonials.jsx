import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Link,
    Rating,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const GuestReview = ({ name, avatar, comment, rating }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            width: 56,
                            height: 56,
                            fontSize: '1.5rem',
                            textTransform: 'uppercase',
                        }}
                        aria-label="guest-avatar"
                    >
                        {avatar}
                    </Avatar>
                }
                title={
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                }
                subheader={<Rating name="read-only" value={rating} readOnly />}
                sx={{ paddingBottom: 0 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {comment}
                </Typography>
            </CardContent>
        </Card>
    );
};

const WhatOurGuestsSay = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Sample guest reviews data
    const guestReviews = [
        {
            name: 'Jon Robert Huiden',
            avatar: 'JR',
            comment: 'Nice place, kids will definitely enjoy and love this place but this resorts water are not for people like me who has skin asthma that can be triggered by non-flowing water.',
            rating: 4,
        },
        {
            name: 'Graciano III Natividad',
            avatar: 'GN',
            comment: `Clean Water
Nice ambiance
Big and clean cottages for an average price

P100/adult
P80/kid/pwd/senior

P700/cottage
P3500/airconditioned room`,
            rating: 5,
        },
        {
            name: 'Alexander Jerus',
            avatar: 'AJ',
            comment:
                'I just had a few hours stay in this resort. It was a wet rainy night. After the meeting, everybody left without me exploring the place.',
            rating: 5,
        },
        {
            name: 'Jessica Guevarra',
            avatar: 'JS',
            comment:
                'Very child friendly place',
            rating: 5,
        },
        {
            name: 'James Boayes',
            avatar: 'JB',
            comment:
                '1.5 km interior from secondary road.',
            rating: 5,
        },
        {
            name: 'Krezza Ghail Falcon',
            avatar: 'KG',
            comment:
                "It's so beautiful here ❤️",
            rating: 5,
        },
        {
            name: 'Jepri',
            avatar: 'J',
            comment:
                "Malawak ang area, pweding maglakad lakad ang ganda madaming puno.",
            rating: 4,
        },
        {
            name: 'Noroddin Antonio',
            avatar: 'NA',
            comment:
                "I'll be back hahahaha beautiful scenery's.",
            rating: 5,
        },
    ];

    // Calculate average rating


    return (
        <Box sx={{ py: 8 }}>
            <Box maxWidth="lg" sx={{ margin: '0 auto', px: 2 }}>
                <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    What Our Guests Say
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Discover what our guests love about LuckyLand Resort.
                </Typography>
                <Typography variant="h2" align="center" paragraph>
                    4.4
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, gap: 1 }}>
                    <FaGoogle size={22} />
                    <Rating name="read-only" value={4.5} readOnly precision={0.5} />
                </Box>
                <Typography variant="body2" align="center" color="text.secondary" paragraph>
                    {/* <Link href="https://www.google.com/maps/place/LuckyLand+Resort/@12.9934162,124.0282777,17.37z/data=!4m18!1m9!3m8!1s0x33a0efb4b53376b9:0xa6b516f973d6d1a3!2sLuckyLand+Resort!8m2!3d12.9930432!4d124.0313494!9m1!1b1!16s%2Fg%2F11kb7xrv51!3m7!1s0x33a0efb4b53376b9:0xa6b516f973d6d1a3!8m2!3d12.9930432!4d124.0313494!9m1!1b1!16s%2Fg%2F11kb7xrv51?entry=ttu"
                        target="_blank" rel="noopener noreferrer"> */}
                    19 reviews
                    {/* </Link> */}
                </Typography>
                <Grid container spacing={isMobile ? 2 : 4} justifyContent="center" mt={1}>
                    {guestReviews.map((review, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <GuestReview {...review} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default WhatOurGuestsSay;
