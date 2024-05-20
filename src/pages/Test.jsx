import React from 'react';
import {Box, Typography, Button, Divider} from '@mui/material';
import {FaTv, FaWifi, FaBed, FaCouch, FaArchive, FaPlus} from 'react-icons/fa';
import CustomCarousel from '../utility_components/CustomCarousel.jsx';
import formatPrice from "../utility_functions/formatPrice.js";

const room = {
    "id": 1,
    "name": "Room 101",
    "type": "Friends/Couples",
    "active": 1,
    "price": 2500,
    "description": "Experience the perfect blend of intimacy and camaraderie in our Friends/Couple Room. Designed for pairs or close friends, this room offers a cozy retreat where you can relax and reconnect. Enjoy the comfort of shared moments and the privacy you need for a memorable stay with your favorite companion.",
    "minCapacity": 4,
    "maxCapacity": 6,
    "images": [
        {
            "id": 1,
            "url": "https://res.cloudinary.com/kerutman/image/upload/v1716089173/442487600_367902302930391_3012646217232738360_n_kfknoi.jpg"
        },
        {
            "id": 2,
            "url": "https://res.cloudinary.com/kerutman/image/upload/v1716089202/442494026_367900836263871_890804219610397319_n_rthdry.jpg"
        },
        {
            "id": 3,
            "url": "https://res.cloudinary.com/kerutman/image/upload/v1716089208/440901151_367900942930527_8608555542000400424_n_zjpfyg.jpg"
        },
        {
            "id": 4,
            "url": "https://res.cloudinary.com/kerutman/image/upload/v1716089222/441288097_367900976263857_2100345856779005616_n_icmkgp.jpg"
        },
        {
            "id": 5,
            "url": "https://res.cloudinary.com/kerutman/image/upload/v1716089228/442494034_367901046263850_194221314086700140_n_hgqmzv.jpg"
        },
        {
            "id": 6,
            "url": "https://res.cloudinary.com/kerutman/image/upload/v1716089259/441287396_367901202930501_560307115632412192_n_ajub9s.jpg"
        }
    ],
    "attributes": [
        {
            "id": 7,
            "name": "50” LED TV Cable Satellite Television with HD Channels",
            "icon": <FaTv/>
        },
        {
            "id": 8,
            "name": "Complimentary Wifi Internet Access",
            "icon": <FaWifi/>
        },
        {
            "id": 9,
            "name": "Comfort Room",
            "icon": <FaCouch/>
        },
        {
            "id": 10,
            "name": "2 Bed",
            "icon": <FaBed/>
        },
        {
            "id": 11,
            "name": "1 Cabinet",
            "icon": <FaArchive/>
        },
        {
            "id": 12,
            "name": "Extra Bed (+2 capacity)",
            "icon": <FaPlus/>
        }
    ]
};

const RoomDetails = () => {
    return (
        <Box sx={{py: 4, borderBottom: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: 4}}>
            <Box sx={{display: 'flex', gap: 3}}>
                {/* Images Column */}
                <Box sx={{flex: 1}}>
                    <CustomCarousel images={room.images} height={280} noIndicator/>
                </Box>
                {/* Details Column */}
                <Box sx={{flex: 1,}}>
                    <Typography variant="h5" component="div" fontWeight="bold">{room.name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>{room.type}</Typography>
                    <Divider sx={{mb: 1, width: '80%'}}/>
                    {room.attributes.map(attribute => (
                        <Typography variant="body1" gutterBottom key={attribute.id}
                                    sx={{display: 'flex', alignItems: 'center'}}>
                            {attribute.name}
                        </Typography>
                    ))}
                    <Typography
                        mt={2} variant='body2' sx={{width: 'fit-content', cursor: 'pointer', color: '#333',}}
                    >
                        VIEW MORE
                    </Typography>
                </Box>

                {/* Price and Book Button Column */}
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column',}}>
                    <Typography variant="h6">Price</Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <Typography variant="h4" color="primary">₱{formatPrice(room.price)}</Typography>
                        /
                        <Typography variant="body2">Per Night</Typography>
                    </Box>
                    <Box mt={'auto'} mb={4}>
                                <Button variant="contained" fullWidth>
                                    Book This
                                </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RoomDetails;
