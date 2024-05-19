import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
});

const Content = styled(Box)({
    marginLeft: '20px',
    maxWidth: '600px',
});

const ExploreButton = styled(Button)({
    backgroundColor: '#90c040',
    color: 'white',
    '&:hover': {
        backgroundColor: '#7aa32e',
    },
    marginTop: '20px',
});

const CarouselContainer = styled(Box)({
    width: '50%',
});

const KarismaExperience = () => {
    return (
        <Container>
            <CarouselContainer>
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    useKeyboardArrows
                    autoPlay
                    interval={5000}
                >
                    <div>
                        <img src="your-image-1-url.jpg" alt="Kid playing" />
                    </div>
                    <div>
                        <img src="your-image-2-url.jpg" alt="Family at pool" />
                    </div>
                </Carousel>
            </CarouselContainer>
            <Content>
                <Typography variant="h4" component="h2" gutterBottom>
                    Your Karisma Gourmet Inclusive® Experience
                </Typography>
                <Typography variant="body1" paragraph>
                    At Nickelodeon Hotels & Resorts Punta Cana, fun meets our Karisma Gourmet Inclusive® experience, so adults and kids alike get the five-star treatment they deserve. Enjoy gourmet dining, premium drinks, personalized service, complimentary access to our epic waterpark Aqua Nick™, Nickelodeon-themed activities, and the chance to meet some iconic Nickelodeon characters — all included in your stay!
                </Typography>
                <ExploreButton variant="contained">
                    Explore All Experiences
                </ExploreButton>
            </Content>
        </Container>
    );
};

export default KarismaExperience;
