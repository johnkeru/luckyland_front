import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function Widget() {
    return (
        <Box
            sx={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 4,
                '& > div': {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    p: 3,
                    borderRight: { xs: '', md: '1px solid #e0e0e0' },
                    '&:last-child': {
                        borderRight: 'none',
                    },
                    '& img': {
                        marginBottom: 2,
                    },
                },
            }}
        >
            <Box>
                <img src="https://res.cloudinary.com/kerutman/image/upload/v1714056719/discover-daycations.9f83b39e_pgcioz.svg" alt="Magnifying Glass Icon" />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Discover LuckyLand Resort</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    Select a date and explore pool and more, at LuckyLand Resort.
                </Typography>
            </Box>
            <Box>
                <img src="https://res.cloudinary.com/kerutman/image/upload/v1714056741/book-confidently.8b85eec1_xmtata.svg" alt="Shopping Cart Icon" />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Book Confidently</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    After booking, receive check-in instructions, parking details, and all necessary information.
                </Typography>
            </Box>
            <Box>
                <img src="https://res.cloudinary.com/kerutman/image/upload/v1714056792/flexible-support.12cb3f52_xekssb.svg" alt="Calendar Icon" />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Flexible Support and Cancellation</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    Invite guests or cancel bookings as needed with support on our website or app.
                </Typography>
            </Box>
        </Box>
    )
}