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
        name: "Welcome To UnLuckyLand Resort",
        description: "Escape to UnLuckyLand Resort for a serene beachfront experience. Indulge in exquisite dining, relax poolside, or unwind with a spa treatment.",
        video: slowmo1
    },
    {
        name: "Adventure Awaits",
        description: "Explore our island paradise with thrilling water sports and jungle treks. Discover hidden caves and exotic wildlife.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/6_m20n9d.jpg'
    },
    {
        name: "Exotic Spa Retreat",
        description: "Experience relaxation at our exotic spa with traditional massages and modern therapies amidst tranquil surroundings.",
        video: slowmo2
    },
    {
        name: "Nice",
        description: "Discover hidden treasures as you dive into crystal-clear waters and hike through lush rainforests. Witness breathtaking sunsets.",
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

    const mobilePad = '90%';

    return (
        <Box color='text.secondary' >
            <Hero content={content || displayContent} isOtherPage={isOtherPage} loading={loading} />
            <Box>
                <Box bgcolor='background.paper2'>
                    <Box width={{ xs: mobilePad, md: '80%' }} m='auto'>
                        {children}
                    </Box>
                </Box>
                <Box width={{ xs: mobilePad, md: '80%' }} m='auto'>
                    <Featured pathname={pathname} />
                </Box>
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
