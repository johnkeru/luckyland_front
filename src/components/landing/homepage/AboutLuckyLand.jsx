import {Box, Typography,Container} from '@mui/material';
import {BiWifi} from 'react-icons/bi';
import {BsClockHistory} from 'react-icons/bs';

const AboutLuckyLand = () => {
    // Function to get local time in Mui Ne, Vietnam
    const getLocalTime = () => {
        const now = new Date();
        const philippineTime = now.toLocaleTimeString('en-US', {timeZone: 'Asia/Manila'});
        return philippineTime;
    };

    return (
        <Box display="flex" flexDirection="column" mx="auto" py={5} width={{xs: '90%', md: '75%', lg: '70%'}}>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Experience Tranquility And Warm Hospitality At Luckyland Resort
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Don't miss out on the ultimate resort experience. Book your stay at LuckyLand Resort today!
                </Typography>

                <Box display='flex' justifyContent='space-between' flexDirection={{xs: 'column', lg: 'row'}}
                     mb={{xs: 0, md: 2}} gap={{xs: 1, md: 3}}>
                    <Box height={{xs: '100%', lg: '300px'}} width={{xs: '100%', lg: '600px'}}>
                        <img
                            src="https://res.cloudinary.com/kerutman/image/upload/v1712223139/1_aoj4i8.jpg"
                            alt="LuckyLand Resort"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                height: '100%',
                                width: '100%'
                            }}/>
                    </Box>

                    <Box width={{xs: '100%', lg: '60%'}}>
                        <Typography variant="body1" gutterBottom fontWeight={600}>
                            Philippine Time: {getLocalTime()} (GMT+8)
                        </Typography>
                        <Typography variant="body1" mb={3}>
                            Discover tranquility and warm hospitality at LuckyLand Resort, located on the beautiful
                            shores
                            of Mui Ne, Vietnam. Our resort offers luxurious accommodations, stunning beachfront views,
                            and a
                            wide range of recreational activities.
                        </Typography>
                        <Typography variant="body1" mb={3}>
                            Indulge in fresh seafood at our oceanfront restaurants, unwind by our beachfront infinity
                            pool
                            and bar, or explore the nearby attractions such as the Red Sand Dunes and White Sand Dunes.
                            LuckyLand Resort is the perfect destination for your next getaway.
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h6" fontWeight="bold" mb={2}>AT A GLIMPSE</Typography>
                    <Box width='100px' height="2px" bgcolor="primary.main" borderRadius="borderRadius"/>

                    <Box m={3} my={2}>
                        <ul>
                            <li style={{listStyleType: 'disc', marginBottom: '5px'}}>
                                <Typography variant="body1">
                                    90 rooms, suites and private pool villas
                                </Typography>
                            </li>
                            <li style={{listStyleType: 'disc', marginBottom: '5px'}}>
                                <Typography variant="body1">
                                    Beachfront infinity pool and bar
                                </Typography>
                            </li>
                            <li style={{listStyleType: 'disc', marginBottom: '5px'}}>
                                <Typography variant="body1">
                                    20 minutes from the Red Sand Dunes of Mui Ne, and 45 minutes from the White Sand
                                    Dunes
                                </Typography>
                            </li>
                            <li style={{listStyleType: 'disc'}}>
                                <Typography variant="body1">
                                    Two and a half hours’ drive from the resort to Ho Chi Minh City or the airport
                                </Typography>
                            </li>
                        </ul>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <BsClockHistory/>
                        <Typography variant="body2" fontWeight={600} fontSize={13}>
                            <span>CHECK-IN 15:00</span> | <span>CHECK-OUT 12:00</span>
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <BiWifi size={30}/>
                        <Typography variant="body1">
                            Complimentary Wi-Fi available throughout the resort (Starlink & PLDT).
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutLuckyLand;
