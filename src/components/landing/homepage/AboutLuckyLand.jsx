import {Box, Typography,} from '@mui/material';
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
        <Box display="flex" flexDirection="column" mx="auto" py={8} width={{xs: '90%', md: '75%', lg: '70%'}}>
                <Typography variant="h4" align="center" gutterBottom mb={4}>
                    Experience Tranquility And Warm Hospitality At Luckyland Resort
                </Typography>

                <Box display='flex' justifyContent='space-between' flexDirection={{xs: 'column', lg: 'row'}}
                     mb={{xs: 0, md: 2}} gap={{xs: 1, md: 3}}>
                    <Box height={{xs: '100%', lg: '350px'}} width={{xs: '100%', lg: '650px'}}>
                        <img
                            src="https://res.cloudinary.com/kerutman/image/upload/v1716061767/442469073_367901216263833_580929652207618390_n_ntglvd.jpg"
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
                            Experience serenity and genuine hospitality at LuckyLand Resort, nestled in the heart of Purok 5, Brgy. San Isidro, Bacon, Sorsogon City. Our resort offers a blend of comfort and simplicity amidst the picturesque landscapes of Sorsogon.
                        </Typography>
                        <Typography variant="body1" mb={3}>
                            Treat yourself to delightful local cuisine at our cozy canteen, unwind by the poolside, or explore the scenic trails and nearby attractions. LuckyLand Resort promises an unforgettable retreat for your next getaway.
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h6" fontWeight="bold" mb={1}>AT A GLIMPSE</Typography>
                    <Box width='100px' height="2px" bgcolor="primary.main" borderRadius="borderRadius"/>

                    <Box m={3} my={2}>
                        <ul>
                            <li style={{listStyleType: 'disc', marginBottom: '5px'}}>
                                <Typography variant="body1">
                                    12 rooms available, suitable for couples, friends, and families.
                                </Typography>
                            </li>
                            <li style={{listStyleType: 'disc', marginBottom: '5px'}}>
                                <Typography variant="body1">
                                    10 cottages offered, catering to both large and small groups.
                                </Typography>
                            </li>
                            <li style={{listStyleType: 'disc', marginBottom: '5px'}}>
                                <Typography variant="body1">
                                    3 Swimming Pools on-site for your enjoyment.
                                </Typography>
                            </li>
                            <li style={{listStyleType: 'disc'}}>
                                <Typography variant="body1">
                                    Surrounded by nature for a tranquil atmosphere.
                                </Typography>
                            </li>
                        </ul>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <BsClockHistory/>
                        <Typography variant="body2" fontWeight={600} fontSize={13}>
                            <span>9:00 AM - 4:00 PM DAYTIME / 5:00 PM - 11:00 PM OVERNIGHT</span>
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <BiWifi size={30}/>
                        <Typography variant="body1">
                            Complimentary Wi-Fi available throughout the resort (Starlink & PLDT).
                        </Typography>
                    </Box>
                </Box>
        </Box>
    );
};

export default AboutLuckyLand;
