import { Box, Typography } from '@mui/material';
import { BiWifi } from 'react-icons/bi';
import { BsClockHistory } from 'react-icons/bs';

const AboutLuckyLand = ({ mobilePad }) => {
    // Function to get local time in Mui Ne, Vietnam
    const getLocalTime = () => {
        const now = new Date();
        const philippineTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });
        return philippineTime;
    };

    return (
        <Box display="flex" flexDirection="column" mx="auto" py={5} width={{ xs: mobilePad, md: '70%' }}>
            <Typography
                variant="h3"
                color='primary'
                sx={{
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    mb: 7 // Adding marginBottom to sx
                }}
            >
                EXPERIENCE TRANQUILITY AND WARM HOSPITALITY AT LUCKYLAND RESORT
            </Typography>

            <Box display='flex' justifyContent='space-between' flexDirection={{ xs: 'column', lg: 'row' }} mb={2} gap={4} >
                <Box height={{ xs: '100%' }}>
                    <img src="https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg" alt="Mui Ne Resort" width='100%' height='300px' />
                </Box>

                <Box width='60%'>
                    <Typography variant="body1" gutterBottom fontWeight={600} >
                        Local Time: {getLocalTime()} (GMT+7)
                    </Typography>
                    <Typography variant="body1" mb={3}>
                        Two and a half hours east of Ho Chi Minh City, a 10 km stretch of golden beach invites unwinding. Pool villas and tropical gardens surrounding the resort's lagoon.
                    </Typography>
                    <Typography variant="body1" mb={3}>
                        Dine on fresh seafood overlooking the ocean while staying at our resort in Mui Ne. Join in the famous kitesurfing scene. Explore Cham ruins, or hot air balloon over the rolling red and white sand dunes for which Mui Ne is known for.
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Typography variant="h6" fontWeight="bold" mb={1}>AT A GLIMPSE</Typography>
                <Box width='100px' height="2px" bgcolor="primary.main" borderRadius="borderRadius" />

                <Box m={3} my={2}>
                    <ul>
                        <li style={{ listStyleType: 'disc', marginBottom: '5px' }}>
                            <Typography variant="body1" >
                                90 rooms, suites and private pool villas
                            </Typography>
                        </li>
                        <li style={{ listStyleType: 'disc', marginBottom: '5px' }}>
                            <Typography variant="body1" >
                                Beachfront infinity pool and bar
                            </Typography>
                        </li>
                        <li style={{ listStyleType: 'disc', marginBottom: '5px' }}>
                            <Typography variant="body1" >
                                20 minutes from the Red Sand Dunes of Mui Ne, and 45 minutes from the White Sand Dunes
                            </Typography>
                        </li>
                        <li style={{ listStyleType: 'disc' }}>
                            <Typography variant="body1" >
                                Two and a half hours’ drive from the resort to Ho Chi Minh City or the airport
                            </Typography>
                        </li>
                    </ul>
                </Box>
                <Box display="flex" alignItems="center" gap={1} my={2}>
                    <BsClockHistory />
                    <Typography variant="body2" fontWeight={600} fontSize={13}>
                        CHECK-IN 15:00 | CHECK-OUT 12:00
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                    <BiWifi size={30} />
                    <Typography variant="body1" >
                        Complimentary Wi-Fi available throughout the resort (Starlink & PLDT).
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutLuckyLand;
