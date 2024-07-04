import { Box, Typography } from '@mui/material';

export default function Guide() {
    return (
        <Box bgcolor='#f0f8ff'>
            <Box
                sx={{
                    width: { xs: '100%', sm: '80%' },
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 4,
                    gap: { xs: 4, md: 0 }, // Adjusted gap for better spacing
                    borderBottom: { xs: '1px solid #f0f0f0', md: 'none' }, // Added bottom border for mobile view separation
                }}
            >
                <GuideItem
                    icon="https://res.cloudinary.com/kerutman/image/upload/v1714056719/discover-daycations.9f83b39e_pgcioz.svg"
                    title="Discover LuckyLand Resort"
                    description="Enjoy a day of relaxation and fun at LuckyLand Resort, featuring our beautiful pool amenities and nature environment."
                />
                <GuideItem
                    icon="https://res.cloudinary.com/kerutman/image/upload/v1714056741/book-confidently.8b85eec1_xmtata.svg"
                    title="Book Easily"
                    description="Book easily by providing basic details, selecting dates and accommodation, and paying via GCash. You'll receive check-in instructions and all necessary information via email."
                />
                <GuideItem
                    icon="https://res.cloudinary.com/kerutman/image/upload/v1714056792/flexible-support.12cb3f52_xekssb.svg"
                    title="Flexible Rescheduling and Cancellation"
                    description="Utilize our email support to reschedule or cancel your booking."
                />
            </Box>
        </Box>
    )
}

const GuideItem = ({ icon, title, description }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            p: 3,
            borderRight: { xs: 'none', md: '2px solid #fff' }, // Adjusted border styles
            '&:last-child': {
                borderRight: 'none',
            },
            textAlign: { xs: 'center', md: 'left' }, // Centered text on mobile, left-aligned on desktop
        }}
    >
        <img
            src={icon}
            alt={title}
            style={{
                marginBottom: '1rem', // Adjusted margin for better spacing
                width: '64px',
                height: '64px',
            }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main', textAlign: 'center' }}>{title}</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>{description}</Typography>
    </Box>
);
