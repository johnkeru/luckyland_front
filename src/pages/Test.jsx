import React, { useState } from 'react';
import './Test.css'; // Import CSS file for carousel styling

const images = [
    {
        id: 61,
        url: 'https://res.cloudinary.com/kerutman/image/upload/v1717243781/rooms/fam/05.1_nb3hiv.jpg',
    },
    {
        id: 62,
        url: 'https://res.cloudinary.com/kerutman/image/upload/v1717243349/rooms/fam/IMG20240527101142_oqlmop.jpg',
    },
    {
        id: 63,
        url: 'https://res.cloudinary.com/kerutman/image/upload/v1717243345/rooms/fam/IMG20240527101203_n0s8u2.jpg',
    },
    {
        id: 64,
        url: 'https://res.cloudinary.com/kerutman/image/upload/v1717243347/rooms/fam/IMG20240527101230_ij9gcw.jpg',
    }
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="carousel">
            {images.map((image, index) => (
                <img
                    key={image.id}
                    src={image.url}
                    alt={`slide-${index}`}
                    className={index === currentIndex ? 'slide active' : 'slide'}
                />
            ))}
            <button onClick={prevSlide} className="prev">
                &#10094;
            </button>
            <button onClick={nextSlide} className="next">
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;
