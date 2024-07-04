import AboutLuckyLand from '../components/landing/homepage/AboutLuckyLand';
import Hero from '../components/landing/homepage/Hero';

import { Box } from '@mui/material';
import { useEffect } from 'react';
import Accommodation from "../components/landing/homepage/Accommodation.jsx";
import FAQs from '../components/landing/homepage/FAQs';
import Footer from '../components/landing/homepage/Footer';
import Gallery from '../components/landing/homepage/Gallery';
import Guide from '../components/landing/homepage/Guide';
import Map from '../components/landing/homepage/Map';
import Pools from '../components/landing/homepage/Pools';
import PropertyDetails from "../components/landing/homepage/PropertyDetails.jsx";
import ReadyToBook from "../components/landing/homepage/ReadyToBook.jsx";
import Testimonials from "../components/landing/homepage/Testimonials.jsx";
import useResortStatus from '../hooks/useResortStatus';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall.js';
import { notifyError } from '../utility_functions/toaster.js';
import Reminder from '../components/landing/homepage/Reminder';
import AccommodationStatic from '../components/landing/homepage/AccommodationStatic.jsx';

let origVid = 'https://res.cloudinary.com/kerutman/video/upload/v1712859212/GICWmADJckhLuJMCAHz-HAASy_57bmdjAAAF_hfgey5.mp4';
// let newOne = 'https://res.cloudinary.com/kerutman/video/upload/v1712858179/GAvW0hl1Bc9xkRoEAFxBd50a9Fx9bmdjAAAF_rosljw.mp4';

// const isOrig = true;
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
        description: "Embark on a journey to discover hidden gems as you dive into clear waters, trek through lush rainforests, and encounter exotic wildlife. LuckyLand Resort is surrounded by breathtaking landscapes and pristine beaches, providing endless opportunities for exploration and adventure.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1714162115/346082600_3449478032047306_7852981897229480780_n_xnpkv7.jpg'
    },
    {
        name: "Explore Tranquility",
        description: "Experience tranquility amidst our natural surroundings. Relax by the nature, explore scenic trails, and immerse yourself in the beauty of LuckyLand Resort.",
        video: slowmo1
    },
    {
        name: "Hidden Gems",
        description: "Uncover adventures in our island paradise with exciting water sports and jungle explorations. Encounter hidden caves, explore scenic trails, and witness mesmerizing sunsets. LuckyLand Resort offers a range of outdoor activities that allow you to connect with nature and create unforgettable memories.",
        image: 'https://res.cloudinary.com/kerutman/image/upload/v1716061767/442469073_367901216263833_580929652207618390_n_ntglvd.jpg'
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

    const { status, setStatus } = useResortStatus();

    useEffect(() => {
        if (!isOtherPage) {
            basicGetCall({
                endpoint: 'api/visitor/increment',
                method: 'post',
            });
        }
    }, []);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/status/get-resort-status',
            setDataDirectly: (data) => {
                setStatus(data);
                if (!Boolean(data)) {
                    notifyError({
                        message: "We're sorry, but the resort is currently closed. Feel free to explore our website!",
                        duration: 5000
                    });

                }

            }
        });
    }, [status]);

    const heroContent = (content && content.length !== 0) ? content : displayContent;

    return (
        <Box color='text.secondary' >
            <Hero content={heroContent} isOtherPage={isOtherPage} loading={loading} />
            {
                !isOtherPage ? <>
                    <AboutLuckyLand />
                    <Guide />
                </> : undefined
            }
            <Box mt={isOtherPage ? 8 : 0}>
                {children}
            </Box>
            {!isOtherPage ? <>
                <PropertyDetails />
                {/* <OurFeatures /> */}
                <Pools />
            </> : undefined}
            <AccommodationStatic lastPart={lastPart} isOtherPage={isOtherPage} />
            {!isOtherPage ? <>
                <Gallery />
                <Testimonials />
                <Reminder />
                <ReadyToBook />
                <Map />
                <FAQs />
            </> : undefined}
            <Footer />
        </Box>

    );
};

export default LandingPage;
