import {Box, Container, Grid, Typography} from '@mui/material';
import React from 'react';
import {primaryLightColors} from "../../../styles/globalStyle.js";

const Pools = () => {
    const pools = [
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059023/441318717_367900382930583_4983071154116771212_n_cnqsfa.jpg',
            name: 'Kids Pool',
            size: '10m x 5m',
            depth: '0.5m - 1.0m',
            top: 0,
            zIndex: 0,
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059040/441248636_367900499597238_5469228456949724630_n_pmsedr.jpg',
            name: 'Teens Pool',
            size: '20m x 10m',
            depth: '1.0m - 2.0m',
            top: -100,
            zIndex: 1,
            ml: 'auto',
            direction: 'row-reverse'
        },
        {
            img: 'https://res.cloudinary.com/kerutman/image/upload/v1716059185/442493130_367900516263903_2306558164824536404_n_e00pxr.jpg',
            name: 'Adults Pool',
            size: '25m x 15m',
            depth: '1.5m - 3.0m',
            top: -200,
            zIndex: 2
        },
    ];

    return (
        <Box sx={{ bgcolor: primaryLightColors.primary50, py: 5 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Swimming Pools
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    Dive into our pristine swimming pools and enjoy a refreshing escape from the sun.
                </Typography>
                <Grid container spacing={4}>
                    {pools.map((pool) => (
                        <Grid item key={pool.name} xs={12} sm={6} md={4}>
                            <img src={pool.img} alt={`Pool ${pool.name}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>

        // <Box >
        //     <Box display="flex" flexDirection="column" mx="auto" pt={5} pb={{ xs: 5, sm: 0 }} mb={{ xs: 0, sm: -15 }} width={{ xs: '94%', sm: '85%', lg: '75%' }}>
        //         <Typography
        //             variant="h2"
        //             color='primary'
        //             sx={{
        //                 fontWeight: 'bold',
        //                 textAlign: 'center',
        //                 mb: 7 // Adding marginBottom to sx
        //             }}
        //         >
        //             Swimming Pools
        //         </Typography>
        //         {pools.map(pool => (
        //             <Box
        //                 position='relative'
        //                 top={{ xs: '0', sm: pool.top }}
        //                 key={pool.name}
        //                 ml={pool.ml}
        //                 height={{ xs: '100%', sm: '390px' }}
        //                 width='100%'
        //                 sx={{
        //                     borderTopRightRadius: 5,
        //                     borderTopLeftRadius: 5,
        //                     // border: '5px solid ' + blue['200'],
        //                     color: 'primary.main',
        //                     display: 'flex',
        //                     flexDirection: { xs: 'column-reverse', sm: pool.direction || 'row' },
        //                     alignItems: 'center',
        //                 }}
        //             >
        //                 <Box
        //                     width={{ xs: '100%', sm: '52%' }}
        //                     bgcolor='primary.light'
        //                     height='100%'
        //                     sx={{
        //                         p: 2,
        //                         boxShadow: 2
        //                     }}
        //                 >
        //                     <img
        //                         src={pool.img}
        //                         alt={pool.name}
        //                         style={{
        //                             objectFit: 'cover',
        //                             objectPosition: 'center',
        //                             height: '100%',
        //                             width: '100%'
        //                         }} />
        //                 </Box>
        //                 <Box px={2} py={{ xs: 2, sm: 0 }}>
        //                     <Typography variant='h3' py={.5} fontWeight={600} px={1} textAlign={{ xs: 'center', sm: 'left' }}>
        //                         {pool.name}
        //                     </Typography>
        //                     <Typography variant="body2" color="text.primary" textAlign='center'>
        //                         Size: {pool.size} | Depth: {pool.depth}
        //                     </Typography>
        //                     <Box width='200px' className='wavyLine' mx='auto' height="20px" bgcolor="info.main" borderRadius="borderRadius" mt={2} />
        //                 </Box>
        //             </Box>
        //         ))}
        //     </Box>
        // </Box>
    );
};

export default Pools;