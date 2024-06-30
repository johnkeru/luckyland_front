// src/Carousel.js

import React, { useState, useEffect, useRef } from 'react';
import './NewCustomCarousel.css';

const NewCustomCarousel = ({ noIndicator = false, images, height = '100%' }) => {
    const [currentIndex, setCurrentIndex] = useState(1); // Start from 1 due to the prepended clone
    const [isTransitioning, setIsTransitioning] = useState(true);
    const timeoutRef = useRef(null);
    const transitionDuration = 500;
    const delay = 3000;

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setIsTransitioning(true);
        }, delay);

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    const handleTransitionEnd = () => {
        if (currentIndex >= images.length + 1) {
            setCurrentIndex(1);
            setIsTransitioning(false);
        } else if (currentIndex <= 0) {
            setCurrentIndex(images.length);
            setIsTransitioning(false);
        }
    };

    const goToIndex = (index) => {
        setCurrentIndex(index + 1);
        setIsTransitioning(true);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setIsTransitioning(true);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsTransitioning(true);
    };

    return (
        <div className="carousel" style={{ height }}>
            <div
                className={`carousel-inner${isTransitioning ? ' transitioning' : ''}`}
                style={{
                    transform: `translateX(${-currentIndex * 100}%)`,
                    transitionDuration: isTransitioning ? `${transitionDuration}ms` : '0ms'
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className="carousel-item">
                    <img src={images[images.length - 1].url} alt={`Slide ${images.length}`} />
                </div>
                {images.map((image, index) => (
                    <div className="carousel-item" key={image.id}>
                        <img src={image.url} alt={`Slide ${index}`} />
                    </div>
                ))}
                <div className="carousel-item">
                    <img src={images[0].url} alt={`Slide 0`} />
                </div>
            </div>
            {!noIndicator && (
                <div className="carousel-controls">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            className={`carousel-dot${currentIndex === idx + 1 ? ' active' : ''}`}
                            onClick={() => goToIndex(idx)}
                        />
                    ))}
                </div>
            )}
            <button className="carousel-arrow left" onClick={handlePrev}>
                &#9664;
            </button>
            <button className="carousel-arrow right" onClick={handleNext}>
                &#9654;
            </button>
        </div>
    );
};

export default NewCustomCarousel;
