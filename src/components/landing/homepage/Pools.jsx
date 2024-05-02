import { Box, Typography } from '@mui/material';
import React from 'react';

const Pools = () => {
    const pools = [
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1714161773/317615995_112482475027373_7893802433168843657_n_e9ig95.jpg?w=162&auto=format',
            name: 'Kids Pool',
            size: '10m x 5m',
            depth: '0.5m - 1.0m',
            top: 0,
            zIndex: 0,
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1714161875/398523270_2791751964333664_4104531403428654823_n_t2ctny.jpg?w=162&auto=format',
            name: 'Teens Pool',
            size: '20m x 10m',
            depth: '1.0m - 2.0m',
            top: -100,
            zIndex: 1,
            ml: 'auto',
            direction: 'row-reverse'
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1712318098/434634660_226166927226572_5577912189830270801_n_vm4giq.jpg?w=162&auto=format',
            name: 'Adults Pool',
            size: '25m x 15m',
            depth: '1.5m - 3.0m',
            top: -200,
            zIndex: 2
        },
    ];

    return (
        <Box >
            <Box display="flex" flexDirection="column" mx="auto" pt={5} pb={{ xs: 5, sm: 0 }} mb={{ xs: 0, sm: -15 }} width={{ xs: '94%', sm: '85%', lg: '75%' }}>
                <Typography
                    variant="h2"
                    color='primary'
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: 7 // Adding marginBottom to sx
                    }}
                >
                    Swimming Pools
                </Typography>
                {pools.map(pool => (
                    <Box
                        position='relative'
                        top={{ xs: '0', sm: pool.top }}
                        key={pool.name}
                        ml={pool.ml}
                        height={{ xs: '100%', sm: '390px' }}
                        width='100%'
                        sx={{
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            // border: '5px solid ' + blue['200'],
                            color: 'primary.main',
                            display: 'flex',
                            flexDirection: { xs: 'column-reverse', sm: pool.direction || 'row' },
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            width={{ xs: '100%', sm: '52%' }}
                            bgcolor='primary.light'
                            height='100%'
                            sx={{
                                p: 2,
                                boxShadow: 2
                            }}
                        >
                            <img
                                src={pool.img}
                                alt={pool.name}
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    height: '100%',
                                    width: '100%'
                                }} />
                        </Box>
                        <Box px={2} py={{ xs: 2, sm: 0 }}>
                            <Typography variant='h3' py={.5} fontWeight={600} px={1} textAlign={{ xs: 'center', sm: 'left' }}>
                                {pool.name}
                            </Typography>
                            <Typography variant="body2" color="text.primary" textAlign='center'>
                                Size: {pool.size} | Depth: {pool.depth}
                            </Typography>
                            <Box width='200px' className='wavyLine' mx='auto' height="20px" bgcolor="info.main" borderRadius="borderRadius" mt={2} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Pools;