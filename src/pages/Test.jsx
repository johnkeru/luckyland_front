import React, { useState } from 'react';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={prevImage}>{'<'}</button>
            <img src={images[currentIndex]} alt={`Image ${currentIndex}`} style={{ width: '300px', height: '200px', margin: '0 10px' }} />
            <button onClick={nextImage}>{'>'}</button>
        </div>
    );
};

const ImageCarousel = () => {
    const images = [
        'https://res.cloudinary.com/kerutman/image/upload/v1712223139/1_aoj4i8.jpg',
        'https://res.cloudinary.com/kerutman/image/upload/v1712223139/3_vb5wxf.jpg',
        'https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg',
    ];

    return (
        <div>
            <h2>Image Carousel</h2>
            <Carousel images={images} />
        </div>
    );
};

export default ImageCarousel;
