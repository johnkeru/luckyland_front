import Masonry from '@mui/lab/Masonry';
import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { ImCamera } from "react-icons/im";

export default function Gallery({ mobilePad }) {

    const theme = useTheme();
    const gradient = `linear-gradient(180deg, ${theme.palette.background.white} 0%, ${theme.palette.primary.lighter} 100%)`;

    return (
        <Box style={{ background: gradient }}>
            <Box display="flex" flexDirection="column" mx="auto" py={5} width={{ xs: mobilePad, sm: '90%', md: '70%' }}>
                <Typography
                    variant="h3"
                    color='primary'
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                        mb: 7, // Adding marginBottom to sx
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1.5, md: 3 },
                        justifyContent: 'center',
                    }}
                >
                    LuckyLand Gallery

                    <ImCamera />
                </Typography>

                <Masonry columns={3} spacing={1}>
                    {itemData.map((item, index) => (
                        <Box key={index} bgcolor='background.white' p={{ xs: 1, sm: 1.5, md: 2 }} sx={{ boxShadow: 2, ":hover": { boxShadow: 5 } }}>
                            <img
                                srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=162&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                }}
                            />
                        </Box>
                    ))}
                </Masonry>
            </Box>
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
    {
        img: 'https://imgs.search.brave.com/WjQgw5tPAHo0XGyiMsF704GHlSybCskzYUqtQ6YWOI4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b29sXzc0MTkwLTE5/NzUuanBnP3NpemU9/NjI2JmV4dD1qcGc',
        title: 'Honey',
    },
    {
        img: 'https://imgs.search.brave.com/HZ5jE2zRdxt6epj9MSCqDGoxb5UFxOwBizb5LDDTJXY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8x/Mi8xNi8yMi8yMi9i/b3JhLWJvcmEtMzAy/MzQzN182NDAuanBn',
        title: 'Basketball',
    },
];
