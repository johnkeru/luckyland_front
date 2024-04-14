import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box } from '@mui/material';

function RoomImagesCarousel({ images, autoPlay = true }) {
    return (
        <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
            <Carousel indicators={false} autoPlay={autoPlay} sx={{ borderRadius: 2 }}>
                {images.map((image, i) => (
                    <Paper key={i} elevation={10} >
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'cover'
                            }}
                            src={image.url}
                            alt={`Slide ${i}`}
                        />
                    </Paper>
                ))}
            </Carousel>
        </Box >
    );
}

export default RoomImagesCarousel;