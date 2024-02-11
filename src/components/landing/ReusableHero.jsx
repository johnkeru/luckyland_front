import React from 'react'
import Navigation from './Navigation'
import Carousel from './Carousel'

const ReusableHero = ({
    autoSlide,
    children,
    noSlide,
}) => {
    return (
        <div className='w-full'>
            <Navigation />
            <Carousel
                autoSlide={autoSlide}
                children={children}
                noSlide={noSlide}
            />

            {/* Gradient */}
            <div
                className='absolute top-0 left-0 w-full h-screen'
                style={{
                    background: "linear-gradient(180deg, rgba(0, 74, 159, 0.3) 0%, rgba(0, 74, 159, 0.5) 100%)",
                }}
            />
        </div>
    )
}

export default ReusableHero