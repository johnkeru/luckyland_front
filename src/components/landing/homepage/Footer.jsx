import React from 'react';
import { Box, Typography } from '@mui/material';
import { MdOutlineEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import CopyRight from '../../../utility_components/CopyRight';

const Footer = () => {
    return (
        <Box borderTop='1px solid #ddd' bgcolor='#f7f7f7' pt={3}>
            <Box display='flex' gap={2} width='80%' m='auto' mb={3}>
                <Box width='100%'>
                    <img src='/logo/logo1.png' alt='Resort Logo' width='200px' height='200px' />
                </Box>

                <Box width='100%'>
                    <Typography variant='h5' mb={4}>Explore</Typography>
                    <Typography variant='body1' mb={1.5}>Accommodation</Typography>
                    <Typography variant='body1' mb={1.5}>Dining</Typography>
                    <Typography variant='body1' mb={1.5}>Activities</Typography>
                    <Typography variant='body1' mb={1.5}>Facilities</Typography>
                </Box>

                <Box width='100%'>
                    <Typography variant='h5' mb={4}>Contact Us</Typography>
                    <Typography variant='body1' mb={1.5} display='flex' alignItems='center' gap={1}>
                        <MdOutlineEmail /> info@luckylandresort.com
                    </Typography>
                    <Typography variant='body1' mb={1.5} display='flex' alignItems='center' gap={1}>
                        <FaPhoneAlt /> +1 (123) 456-7890
                    </Typography>
                    <Typography variant='body1' mb={1.5} display='flex' alignItems='center' gap={1}>
                        <FaSquareFacebook /> Luckyland Resort
                    </Typography>
                </Box>

                <Box width='100%'>
                    <Typography variant='h5' mb={4}>Quick Links</Typography>
                    <Typography variant='body1' mb={1.5}>About Us</Typography>
                    <Typography variant='body1' mb={1.5}>Services</Typography>
                    <Typography variant='body1' mb={1.5}>Gallery</Typography>
                    <Typography variant='body1' mb={1.5}>Contact Us</Typography>
                </Box>
            </Box>

            <CopyRight sx={{ py: 2, bgcolor: '#e6e6e6' }} />
        </Box>
    );
};

export default Footer;
