import Masonry from '@mui/lab/Masonry';
import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { ImCamera } from "react-icons/im";

const itemData = [
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg',
        title: 'Fern',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg',
        title: 'Snacks',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1714146476/384173444_702795625027230_1127771356806399914_n_sn1zyw.jpg',
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
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1714162115/346082600_3449478032047306_7852981897229480780_n_xnpkv7.jpg',
        title: '6',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1714161773/317615995_112482475027373_7893802433168843657_n_e9ig95.jpg',
        title: 'Pool',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1714161839/336369437_884238416000253_7666065717377490864_n_rkktoo.jpg',
        title: 'Honey',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1714161875/398523270_2791751964333664_4104531403428654823_n_t2ctny.jpg',
        title: 'Basketball',
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712318088/434760530_1207691516869781_3256077074535931544_n_xxokak.jpg",
        title: "us",
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712223138/4_fqz3ko.jpg",
        title: "random"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712223137/5_nshfji.jpg",
        title: "heart"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712318095/433678879_1070737890661635_4178202156844489351_n_jmjuan.jpg",
        title: "random2"
    },
    // {
    //     img: "https://res.cloudinary.com/kerutman/image/upload/v1714146924/338689126_2671374859668176_3055486381283622274_n_qufxc7.jpg",
    //     title: "random3"
    // },
];


export default function Gallery({ }) {

    const theme = useTheme();
    const gradient = `linear-gradient(180deg, ${theme.palette.background.white} 0%, ${theme.palette.primary.lighter} 100%)`;

    return (
        <Box style={{ background: gradient }} id='gallery'>
            <Box display="flex" flexDirection="column" mx="auto" py={5} width={{ xs: '96%', md: '75%', lg: '80%' }}>
                <Typography
                    variant="h2"
                    color='primary'
                    sx={{
                        fontWeight: 'bold',
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

                <Masonry sx={{ width: '100%', m: 'auto' }} columns={{ xs: 2, sm: 3, md: 4 }} spacing={1}>
                    {itemData.map((item, index) => (
                        <Box key={index} bgcolor='background.white' p={{ xs: .5, sm: 1, md: 1.5 }} sx={{ boxShadow: 2, ":hover": { boxShadow: 5 } }}>
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

