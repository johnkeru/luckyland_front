import { Box, Typography } from '@mui/material';

export default function Guide() {
    return (
        <Box
            sx={{
                width: { xs: '100%', sm: '80%' },
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
                    borderRight: { xs: '', md: '2px solid #f0f0f0' },
                    '&:last-child': {
                        borderRight: 'none',
                    },
                    '& img': {
                        marginBottom: 2,
                        width: 64, // Adjusted size for better visibility
                        height: 64,
                    },
                },
            }}
        >
            <Box>
                <img src="https://res.cloudinary.com/kerutman/image/upload/v1714056719/discover-daycations.9f83b39e_pgcioz.svg" alt="Magnifying Glass Icon" />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>Discover LuckyLand Resort</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    Explore the beauty of LuckyLand Resort and its pool amenities on your selected date.
                </Typography>
            </Box>
            <Box>
                <img src="https://res.cloudinary.com/kerutman/image/upload/v1714056741/book-confidently.8b85eec1_xmtata.svg" alt="Shopping Cart Icon" />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>Book Confidently</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    Receive comprehensive check-in instructions, parking details, and all necessary information after booking.
                </Typography>
            </Box>
            <Box>
                <img src="https://res.cloudinary.com/kerutman/image/upload/v1714056792/flexible-support.12cb3f52_xekssb.svg" alt="Calendar Icon" />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>Support and Cancellation</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    Utilize our email support for inviting guests or managing booking cancellations as needed.
                </Typography>
            </Box>
        </Box>
    )
}
