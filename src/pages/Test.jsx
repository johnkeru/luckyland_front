import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';

const Label = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
}));

export default function Test() {
    return (
        <Box display="flex" flexDirection="column" mx="auto" py={5} width='70%'>
            <Typography
                variant="h3"
                color='primary'
                sx={{
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    mb: 7 // Adding marginBottom to sx
                }}
            >
                LuckyLand Gallery
            </Typography>

            <Masonry columns={3} spacing={2}>
                {itemData.map((item, index) => (
                    <div key={index}>
                        <img
                            srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=162&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            style={{
                                borderBottomLeftRadius: 4,
                                borderBottomRightRadius: 4,
                                display: 'block',
                                width: '100%',
                            }}
                        />
                    </div>
                ))}
            </Masonry>
        </Box>
    );
}

const itemData = [
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712317722/aefwe_rht6ky.jpg',
        title: 'Fern',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg',
        title: 'Snacks',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223137/5_nshfji.jpg',
        title: 'Mushrooms',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/6_m20n9d.jpg',
        title: 'Tower',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/1_aoj4i8.jpg',
        title: 'Sea star',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712318098/434634660_226166927226572_5577912189830270801_n_vm4giq.jpg',
        title: 'Honey',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712424306/1_zsnbrb.jpg',
        title: 'Basketball',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712465646/kyr9hvungqvf6phtjada.webp',
        title: 'Basketball',
    },
];
