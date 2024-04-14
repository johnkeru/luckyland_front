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

let slowmo1 = 'https://res.cloudinary.com/kerutman/video/upload/v1712945254/VID20230927101905_gwlmec.mp4';
let slowmo2 = 'https://res.cloudinary.com/kerutman/video/upload/v1712945259/VID20230927101817_sohk3u.mp4';

export const displayContent = [
    {
        name: "Welcome To LuckyLand Resort",
        description: "Welcome to LuckyLand Resort, where serenity meets the beachfront. Enjoy fine dining, poolside relaxation, and the occasional spa treatment.",
        video: origVid
    },
    {
        name: "Unveil Adventures",
        description: "Uncover adventures in our island paradise with exciting water sports and jungle explorations. Encounter hidden caves and exotic wildlife.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/6_m20n9d.jpg'
    },
    {
        name: "Explore Tranquility",
        description: "Experience tranquility amidst our natural surroundings. Relax by the beach, explore scenic trails, and immerse yourself in the beauty of LuckyLand Resort.",
        video: slowmo1
    },
    {
        name: "Hidden Gems",
        description: "Embark on a journey to discover hidden gems as you dive into clear waters, trek through lush rainforests, and witness mesmerizing sunsets.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/4_fqz3ko.jpg'
    },
];



const LandingPage = ({
    children,
    content,
    loading,
    isOtherPage = false
}) => {

    const mobilePad = '90%';

    console.log(import.meta.env.VITE_ENVIRONMENT)

    return (
        <Box color='text.secondary' >
            <Hero content={content || displayContent} isOtherPage={isOtherPage} loading={loading} />
            <Box>
                <Box bgcolor='background.paper2'>
                    <Box width={{ xs: mobilePad, md: '80%' }} m='auto'>
                        {children}
                    </Box>
                </Box>
                {/* <Box width={{ xs: mobilePad, md: '80%' }} m='auto'>
                    <Featured pathname={pathname} />
                </Box> */}
            </Box>

            <Box bgcolor='background.paper2'>
                <AboutLuckyLand mobilePad={mobilePad} />
            </Box>
            <Gallery mobilePad={mobilePad} />
            <Map />
            <Footer />
        </Box>
    );
};

export default LandingPage;
