import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import React, { useState } from 'react';
import { FaPeopleRoof } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import formatPrice from '../../../../../utility_functions/formatPrice';
import RoleChip from "../../../../employee/RoleChip";

import { FaWifi } from "react-icons/fa";
import useServices from "../../../../../hooks/reservation/useServices";

const Cottage = ({ cottage, setViewCottage }) => {

    const { selectedCottages, pushNewCottage, removeCottage, } = useServices();
    const isAddedToBook = selectedCottages.length !== 0 ? selectedCottages.some(ct => ct.id === cottage.id) : false;

    const [hover, setHover] = useState(false);

    return (
        <Card
            sx={{
                mb: 2,
                position: 'relative',
                border: '1px solid #ddd',
                width: '32%',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {hover && <Box
                position='absolute'
                width='100%'
                height='100%'
                top={0}
                left={0}
                display='flex'
                justifyContent='center'
                alignItems='center'
                color='white'
                sx={{
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.2862394957983193) 13%, rgba(0,0,0,0.5327380952380952) 100%)'
                }}
            >
                <Box display='flex' alignItems='center' gap={1}>
                    {
                        !isAddedToBook ? <Button onClick={() => pushNewCottage(cottage)} variant='contained' color='success'>Add</Button> :
                            <Button onClick={() => removeCottage(cottage)} variant='contained' color='error'>Cancel</Button>
                    }
                    <Button onClick={() => setViewCottage(cottage)} variant='outlined' sx={{ border: '1px solid white', color: 'white', ":hover": { border: '1px solid white' } }}>See more</Button>
                </Box>
            </Box>}
            <CardMedia
                component="img"
                height="140"
                image={cottage.images[0].url}
                alt={cottage.name}
            />
            <CardContent>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography variant="h6" component="div">
                        {cottage.name}
                    </Typography>
                    <RoleChip role={cottage.type} size="small" />
                    {!cottage.active ? <Chip label='Unavailable' /> : undefined}
                </Box>

                {/* attributes */}
                <Box my={2} display='flex' alignItems='center' gap={2} color='GrayText'>
                    <Box display='flex' alignItems='center' gap={1}>
                        <FaWifi />
                        <Typography fontSize='14px'>Wi-Fi</Typography>
                    </Box>
                </Box>

                <Box display='flex' justifyContent='space-between' alignItems='center' mt={2} title={cottage.capacity + ' capacity'}>
                    <Typography variant="body2">
                        ₱{formatPrice(cottage.price)} / night
                    </Typography>
                    <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={1}>
                        {cottage.type === 'Family' ? <FaPeopleRoof /> : <IoPeopleSharp />} {cottage.capacity}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Cottage