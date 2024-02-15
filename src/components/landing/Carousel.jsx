import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ImageGallery from "./ImageGallery";

let images = [
    '/public/landing/1.jpg',
    '/public/landing/2.jpg',
    '/public/landing/3.jpg',
    '/public/landing/4.jpg',
    '/public/landing/5.jpg',
    '/public/landing/6.jpg',
    '/public/landing/7.jpg',
];

export default function Carousel({
    autoSlide = false,
    autoSlideInterval = 5000,
    children,
    noSlide = false,
}) {
    const [curr, setCurr] = useState(0);

    const prev = () =>
        setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
    const next = () =>
        setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [curr]);

    return (
        <>
            {/* <ImageGallery curr={curr} images={images} /> */}

            <div
                className="mt-10 md:mt-20 absolute w-full left-0 right-0 m-auto z-20 inset-0 items-center px-4 justify-between p-1 flex"
            >
                {!noSlide ? <button
                    onClick={prev}
                    className="text-white group-hover:opacity-100"
                >
                    <BsChevronCompactLeft size={40} />
                </button> : undefined}

                <div className="flex justify-center items-center w-full ">
                    {/* CHILDREN HERE! */}
                    {children}
                </div>

                {!noSlide ? <button
                    onClick={next}
                    className="text-white group-hover:opacity-100"
                >
                    <BsChevronCompactRight size={40} />
                </button> : undefined}
            </div>

            {!noSlide ? <div className="absolute z-20 bottom-4 right-0 left-0 px-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {images.map((_, i) => (
                        <div
                            onClick={() => setCurr(i)}
                            key={i}
                            className={`cursor-pointer
              transition-all h-1 bg-white rounded-sm
              ${curr === i ? "px-4" : "px-2 bg-opacity-50"}
            `}
                        />
                    ))}
                </div>
            </div> : undefined}
        </>
    );
}