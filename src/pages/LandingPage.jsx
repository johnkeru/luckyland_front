import React from 'react';
import AboutLuckyLand from '../components/landing/homepage/AboutLuckyLand';
import Hero from '../components/landing/homepage/Hero';

import { Box } from '@mui/material';
import FAQs from '../components/landing/homepage/FAQs';
import Footer from '../components/landing/homepage/Footer';
import Gallery from '../components/landing/homepage/Gallery';
import Guide from '../components/landing/homepage/Guide';
import Map from '../components/landing/homepage/Map';
import Pools from '../components/landing/homepage/Pools';
import { primaryLightColors } from '../styles/globalStyle';
import Testimonials from "../components/landing/homepage/Testimonials.jsx";
import ReadyToBook from "../components/landing/homepage/ReadyToBook.jsx";
import Accommodation from "../components/landing/homepage/Accommodation.jsx";
import OurFeatures from "../components/landing/homepage/OurFeatures.jsx";

let origVid = 'https://res.cloudinary.com/kerutman/video/upload/v1712859212/GICWmADJckhLuJMCAHz-HAASy_57bmdjAAAF_hfgey5.mp4';
// let newOne = 'https://res.cloudinary.com/kerutman/video/upload/v1712858179/GAvW0hl1Bc9xkRoEAFxBd50a9Fx9bmdjAAAF_rosljw.mp4';

const isOrig = true;
// let vid = isOrig ? origVid : newOne;

let slowmo1 = 'https://res.cloudinary.com/kerutman/video/upload/v1712945254/VID20230927101905_gwlmec.mp4';
// let slowmo2 = 'https://res.cloudinary.com/kerutman/video/upload/v1712945259/VID20230927101817_sohk3u.mp4';

export const displayContent = [
    {
        name: "Welcome To LuckyLand Resort",
        description: "At LuckyLand Retreat, a serene getaway nestled in nature. Enjoy poolside relaxation and immerse yourself in tranquility. Perfect for a peaceful retreat from everyday life.",
        video: origVid
    },
    {
        name: "Unveil Adventures",
        description: "Uncover adventures in our island paradise with exciting water sports and jungle explorations. Encounter hidden caves, explore scenic trails, and witness mesmerizing sunsets. LuckyLand Resort offers a range of outdoor activities that allow you to connect with nature and create unforgettable memories.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/6_m20n9d.jpg'
    },
    {
        name: "Explore Tranquility",
        description: "Experience tranquility amidst our natural surroundings. Relax by the nature, explore scenic trails, and immerse yourself in the beauty of LuckyLand Resort.",
        video: slowmo1
    },
    {
        name: "Hidden Gems",
        description: "Embark on a journey to discover hidden gems as you dive into clear waters, trek through lush rainforests, and encounter exotic wildlife. LuckyLand Resort is surrounded by breathtaking landscapes and pristine beaches, providing endless opportunities for exploration and adventure.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/4_fqz3ko.jpg'
    },
];

const LandingPage = ({
    children,
    content,
    loading,
    isOtherPage = false
}) => {

    const currentURL = window.location.href;
    const parts = currentURL.split('/');
    const lastPart = parts[parts.length - 1];

    return (
        <Box color='text.secondary' >
            {/* <Hero content={content || displayContent} isOtherPage={isOtherPage} loading={loading} />
            <Box bgcolor={primaryLightColors.primary50}>
                {children}
            </Box> */}

            {/* <Guide />
            <Pools /> */}
            {/*<Featured path={lastPart} />*/}
            {/* <OurFeatures />
            <Accommodation path={lastPart} />
            <Testimonials />
            <ReadyToBook />
            <Gallery />
            <AboutLuckyLand />
            <Map />
            <FAQs />
            <Footer /> */}
        </Box>
    );
};

export default LandingPage;
