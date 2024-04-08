import React from 'react';
import HeroAndNavigation from '../components/landing/homepage/HeroAndNavigation';
import FeaturedCottagesAndRooms from '../components/landing/homepage/FeaturedCottagesAndRooms';
import AdditionalOffers from '../components/landing/homepage/AdditionalOffers';

const LandingPage = () => {

    return (
        <>
            <HeroAndNavigation />
            <FeaturedCottagesAndRooms />
            <AdditionalOffers />
        </>
    );
};

export default LandingPage;
