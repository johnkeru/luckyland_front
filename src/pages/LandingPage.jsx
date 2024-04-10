import React from 'react';
import Featured from '../components/landing/homepage/Featured';
import Hero from '../components/landing/homepage/Hero';
import AboutLuckyLand from '../components/landing/homepage/AboutLuckyLand';

import { Box } from '@mui/material';
import Footer from '../components/landing/homepage/Footer';
import Map from '../components/landing/homepage/Map';

export const displayContent = [
    {
        name: "Welcome To UnLuckyLand Resort",
        description: "Experience the ultimate relaxation in our luxurious beachfront villas.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712318098/434634660_226166927226572_5577912189830270801_n_vm4giq.jpg'
    },
    {
        name: "Exotic Spa Retreat",
        description: "Indulge in our exotic spa retreat and rejuvenate your body and soul.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/3_vb5wxf.jpg'
    },
    {
        name: "Adventure Awaits",
        description: "Embark on thrilling adventures and discover the hidden treasures of our island paradise.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/6_m20n9d.jpg'
    },
    {
        name: "Nice",
        description: "Embark on thrilling adventures and discover the hidden treasures of our island paradise.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/4_fqz3ko.jpg'
    },
]

const LandingPage = ({
    children,
    content,
    loading,
}) => {

    const pathname = window.location.pathname;



    return (
        <>
            <Hero content={content || displayContent} isIndicator={pathname === '/'} loading={loading} />

            {/* dynamic */}
            <Box>
                <Box bgcolor='#ededed'>
                    <Box width='80%' m='auto'>
                        {children}
                    </Box>
                </Box>
                <Box width='80%' m='auto'>
                    <Featured pathname={pathname} />
                </Box>
            </Box>

            <Box bgcolor='#ededed'>
                <AboutLuckyLand />
            </Box>
            <Map />
            <Footer />
        </>
    );
};

export default LandingPage;
