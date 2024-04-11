import React from 'react';
import Featured from '../components/landing/homepage/Featured';
import Hero from '../components/landing/homepage/Hero';
import AboutLuckyLand from '../components/landing/homepage/AboutLuckyLand';

import { Box } from '@mui/material';
import Footer from '../components/landing/homepage/Footer';
import Map from '../components/landing/homepage/Map';
import Gallery from '../components/landing/homepage/Gallery';

let origVid = 'https://res.cloudinary.com/kerutman/video/upload/v1712859212/GICWmADJckhLuJMCAHz-HAASy_57bmdjAAAF_hfgey5.mp4';
let newOne = 'https://res.cloudinary.com/kerutman/video/upload/v1712858179/GAvW0hl1Bc9xkRoEAFxBd50a9Fx9bmdjAAAF_rosljw.mp4';

const isOrig = true;
let vid = isOrig ? origVid : newOne;

export const displayContent = [
    {
        name: "Welcome To UnLuckyLand Resort",
        description: "Escape to UnLuckyLand Resort and immerse yourself in the epitome of luxury. Nestled amidst pristine beaches and lush greenery, our beachfront villas offer unparalleled comfort and serenity. Indulge in exquisite dining experiences, relax by the poolside, or simply unwind with a rejuvenating spa treatment. Your ultimate getaway begins here.",
        video: vid
    },
    {
        name: "Exotic Spa Retreat",
        description: "Step into our exotic spa retreat and embark on a journey of relaxation and revitalization. From traditional massages to modern wellness therapies, our expert therapists will pamper you from head to toe. Feel the stress melt away as you indulge in our luxurious treatments amidst a tranquil setting. Your path to rejuvenation awaits.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/3_vb5wxf.jpg'
    },
    {
        name: "Adventure Awaits",
        description: "Unleash your inner adventurer and explore the wonders of our island paradise. From exhilarating water sports to thrilling jungle treks, there's an adventure for everyone. Discover hidden caves, encounter exotic wildlife, and immerse yourself in the beauty of nature. Your next unforgettable adventure begins here.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/6_m20n9d.jpg'
    },
    {
        name: "Nice",
        description: "Embark on thrilling adventures and discover the hidden treasures of our island paradise. Dive into crystal-clear waters, hike through lush rainforests, and witness breathtaking sunsets over the horizon. With endless possibilities for exploration and relaxation, your stay at UnLuckyLand Resort promises to be nothing short of magical.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/4_fqz3ko.jpg'
    },
];


const LandingPage = ({
    children,
    content,
    loading,
    isOtherPage = false
}) => {

    const pathname = window.location.pathname;

    return (
        <Box color='text.secondary'>
            <Hero content={content || displayContent} isOtherPage={isOtherPage} loading={loading} />

            {/* dynamic */}
            <Box>
                <Box bgcolor='background.paper2'>
                    <Box width='80%' m='auto'>
                        {children}
                    </Box>
                </Box>
                <Box width='80%' m='auto'>
                    <Featured pathname={pathname} />
                </Box>
            </Box>

            <Box bgcolor='background.paper2'>
                <AboutLuckyLand />
            </Box>
            <Gallery />
            <Map />
            <Footer />
        </Box>
    );
};

export default LandingPage;
