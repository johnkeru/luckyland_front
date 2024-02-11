import React, { useMemo } from 'react';

function ImageGallery({ images, curr }) {
    const renderGalleryItem = (img, i) => {
        if (img.includes("vid")) {
            return (
                <video
                    key={img}
                    className={`w-screen h-screen object-cover ${curr === i ? "block" : "hidden"}`}
                    autoPlay={true}
                    loop={true}
                    poster={images[2]}
                    src={img}
                    muted
                    controls={false}
                    preload="none"
                />
            );
        } else {
            return (
                <img
                    key={img}
                    alt={img}
                    src={img}
                    width={800}
                    height={800}
                    className={`w-screen h-screen object-cover ${curr === i ? "block" : "hidden"}`}
                    loading="lazy"
                />
            );
        }
    };

    const galleryItems = useMemo(() => {
        return images.map((img, i) => renderGalleryItem(img, i));
    }, [images, curr]);

    return <div className="flex">{galleryItems}</div>;
}

export default React.memo(ImageGallery);
