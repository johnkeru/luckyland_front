import React from 'react';
import Featured from '../components/landing/homepage/Featured';
import Hero from '../components/landing/homepage/Hero';
import Offer from '../components/landing/homepage/Offer';

import { Box } from '@mui/material';
import Footer from '../components/landing/homepage/Footer';
import Map from '../components/landing/homepage/Map';


const LandingPage = ({
    children,
    content }) => {

    const pathname = window.location.pathname;

    const displayContent = content || [
        {
            name: "Welcome To UnLuckyLand Resort",
            description: "Experience the ultimate relaxation in our luxurious beachfront villas.",
            image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/1_aoj4i8.jpg'
        },
        {
            name: "Exotic Spa Retreat",
            description: "Indulge in our exotic spa retreat and rejuvenate your body and soul.",
            image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/3_vb5wxf.jpg'
        },
        {
            name: "Adventure Awaits",
            description: "Embark on thrilling adventures and discover the hidden treasures of our island paradise.",
            image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg'
        },
        {
            name: "Nice",
            description: "Embark on thrilling adventures and discover the hidden treasures of our island paradise.",
            image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/4_fqz3ko.jpg'
        },
    ]

    return (
        <>
            <Hero content={displayContent} isIndicator={pathname === '/'} />

            {/* dynamic */}
            <Box width='80%' m='auto' my={10}>
                <Box mb={10}>
                    {children}
                </Box>
                <Featured pathname={pathname} />
            </Box>

            <Offer />
            <Map />
            <Footer />
        </>
    );
};

export default LandingPage;
