import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { MdOutlineEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import CopyRight from '../../../utility_components/CopyRight';

const Footer = () => {
    return (
        <Box borderTop='1px solid #ddd' bgcolor='background.paper' pt={3}>
            <Grid container justifyContent="center" spacing={3} pb={2} textAlign={{ xs: 'center', md: 'left' }}>
                <Grid item xs={12} md={3}>
                    <Box width='fit-content' m='auto'>
                        <img src='/logo/logo1.png' alt='Resort Logo' width='200px' height='200px' />
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box>
                        <Typography variant='h5' mb={4}>Explore</Typography>
                        <Typography variant='body1' mb={1.5}>Accommodation</Typography>
                        <Typography variant='body1' mb={1.5}>Dining</Typography>
                        <Typography variant='body1' mb={1.5}>Activities</Typography>
                        <Typography variant='body1' mb={1.5}>Facilities</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box>
                        <Typography variant='h5' mb={4}>Contact Us</Typography>
                        <Typography variant='body1' mb={1.5} display='flex' gap={1} justifyContent={{ xs: 'center', md: 'start' }}>
                            <MdOutlineEmail /> info@luckylandresort.com
                        </Typography>
                        <Typography variant='body1' mb={1.5} display='flex' gap={1} justifyContent={{ xs: 'center', md: 'start' }}>
                            <FaPhoneAlt /> +1 (123) 456-7890
                        </Typography>
                        <Typography variant='body1' mb={1.5} display='flex' gap={1} justifyContent={{ xs: 'center', md: 'start' }}>
                            <FaSquareFacebook /> Luckyland Resort
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box>
                        <Typography variant='h5' mb={4}>Quick Links</Typography>
                        <Typography variant='body1' mb={1.5}>About Us</Typography>
                        <Typography variant='body1' mb={1.5}>Services</Typography>
                        <Typography variant='body1' mb={1.5}>Gallery</Typography>
                        <Typography variant='body1' mb={1.5}>Contact Us</Typography>
                    </Box>
                </Grid>
            </Grid>
            <CopyRight sx={{ py: 2, bgcolor: '#e6e6e6' }} />
        </Box>
    );
};

export default Footer;
