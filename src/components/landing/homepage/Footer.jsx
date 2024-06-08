import { Box, Grid, Link, Typography } from '@mui/material';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { LOGO } from '../../../cloud/mainImages';
import CopyRight from '../../../utility_components/CopyRight';

const Footer = () => {
    return (
        <Box borderTop='1px solid #ddd' bgcolor='#333' color='#eee' pt={3}>
            <Grid container justifyContent="center" spacing={3} pb={{ xs: 5, sm: 4 }}
                textAlign={{ xs: 'center', md: 'left' }}>
                <Grid item xs={12} sm={4} md={3}>
                    <Box m='auto' width={{ xs: '100px', sm: '200px' }} height={{ xs: '100px', sm: '200px' }}>
                        <img src={LOGO}
                            style={{ borderRadius: '50%' }} alt='Resort Logo' width='100%' height='100%' />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Box>
                        <Typography fontWeight={{ xs: 600, sm: 500 }} fontSize={{ xs: '1.3rem', sm: '1.5rem' }}
                            mb={{ xs: 2, sm: 4 }}>Explore</Typography>
                        <Typography mb={{ xs: 1, sm: 1.5 }}>Accommodation</Typography>
                        <Typography mb={{ xs: 1, sm: 1.5 }}>Dining</Typography>
                        <Typography mb={{ xs: 1, sm: 1.5 }}>Activities</Typography>
                        <Typography mb={{ xs: 1, sm: 1.5 }}>Facilities</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Box>
                        <Typography fontWeight={{ xs: 600, sm: 500 }} fontSize={{ xs: '1.3rem', sm: '1.5rem' }}
                            mb={{ xs: 2, sm: 4 }}>Contact Us</Typography>
                        <Typography
                            mb={{ xs: 1, sm: 1.5 }}
                            display='flex'
                            alignItems='center'
                            gap={1}
                            justifyContent={{ xs: 'center', md: 'start' }}
                        >
                            <MdOutlineEmail /> Luckyland.resort58@gmail.com
                        </Typography>
                        <Typography mb={{ xs: 1, sm: 1.5 }} display='flex' alignItems='center' gap={1}
                            justifyContent={{ xs: 'center', md: 'start' }}>
                            <FaPhoneAlt />
                            (Globe) 0915-6332893
                        </Typography>
                        <Typography mb={{ xs: 1, sm: 1.5 }} display='flex' alignItems='center' gap={1}
                            justifyContent={{ xs: 'center', md: 'start' }}>
                            <FaPhoneAlt />
                            (Smart) 0968-5290685
                        </Typography>
                        <Typography mb={{ xs: 1, sm: 1.5 }} display='flex' alignItems='center' gap={1}
                            justifyContent={{ xs: 'center', md: 'start' }}>
                            <FaSquareFacebook /> Luckyland Resort
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Box>
                        <Typography fontWeight={{ xs: 600, sm: 500 }} fontSize={{ xs: '1.3rem', sm: '1.5rem' }}
                            mb={{ xs: 2, sm: 4 }}>Socials</Typography>
                        <Typography
                            mb={{ xs: 1, sm: 1.5 }}
                            display='flex'
                            alignItems='center'
                            gap={1}
                            justifyContent={{ xs: 'center', md: 'start' }}
                        >
                            <Link href='https://www.facebook.com/profile.php?id=100087968635905' target='_blank' sx={{ color: 'white', textDecoration: 'none' }}>
                                <FaSquareFacebook /> LuckyLand Resort Page
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <CopyRight sx={{ py: 2, color: '#c0c0c0', borderTop: '1px solid #636363' }} />
        </Box>
    );
};

export default Footer;
