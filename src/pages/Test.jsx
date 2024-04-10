import React from 'react';
import { TbGardenCart } from "react-icons/tb";
import { FaUtensils } from 'react-icons/fa';
import { MdPool } from 'react-icons/md';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 345,
    margin: 'auto',
    marginBottom: 16,
};

const mediaStyle = {
    height: 0,
    paddingTop: '56.25%', // 16:9
};

const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
};

const iconStyle = {
    marginRight: 8,
};

const seeMoreButtonStyle = {
    marginTop: 'auto',
    alignSelf: 'center',
};

const OneBedroomPoolVilla = () => {
    return (
        <Card style={cardStyle}>
            <CardMedia
                style={mediaStyle}
                image="/path/to/your/image.jpg"
                title="One Bedroom Pool Villa"
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    One Bedroom Pool Villa
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    90 sqm / 968 sqft
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Maximum 3 adults & 1 child
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Price: ₱10,000 per night
                </Typography>
                <div style={iconContainerStyle}>
                    <TbGardenCart style={iconStyle} />
                    <Typography variant="body2">Garden courtyard with pool</Typography>
                </div>
                <div style={iconContainerStyle}>
                    <FaUtensils style={iconStyle} />
                    <Typography variant="body2">Al fresco dining pavilion</Typography>
                </div>
                <div style={iconContainerStyle}>
                    <MdPool style={iconStyle} />
                    <Typography variant="body2">Bathroom with pool view</Typography>
                </div>
            </CardContent>
            <Button style={seeMoreButtonStyle} color="primary">
                See More
            </Button>
        </Card>
    );
};

export default OneBedroomPoolVilla;
