import { Box, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const FeaturedCottages = ({ loading, cottageTypes }) => {

    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        setSelectedType(cottageTypes[0]);
    }, [cottageTypes])


    return (
        <Grid container justifyContent="center" alignItems="center">

            <Grid item xs={12} md={6} display={{ xs: 'none', md: 'block' }}>
                {
                    (loading) ? <Skeleton /> :
                        (selectedType && selectedType.cottages) ? <img src={selectedType.cottages[0].images[0].url} alt="Main Room" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                            : undefined
                }
            </Grid>

            <Grid item xs={12} md={6} py={{ xs: 3, md: 0 }}>
                <Box width={{ xs: '65%', md: '70%', lg: '50' }} m='auto'>
                    <Typography variant="h6">Our Rooms</Typography>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.75rem' } }}>Cottages</Typography>
                    <Box mt={4}>
                        {
                            loading ? <Skeleton height={100} /> :
                                selectedType ?
                                    <>
                                        {
                                            cottageTypes.map((cottageType) => (
                                                <CottageItem
                                                    isActive={cottageType.type === selectedType.type}
                                                    key={cottageType.id}
                                                    onClick={() => setSelectedType(cottageType)}
                                                    id={cottageType.id}
                                                    name={cottageType.type}
                                                    price={`Price: ${cottageType.price} per night`}
                                                    imageUrl={cottageType.cottages[0].images[0].url} />
                                            ))
                                        }
                                    </> : undefined
                        }
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} md={6} display={{ xs: 'block', md: 'none' }}>
                {
                    (loading) ? <Skeleton /> :
                        (selectedType && selectedType.cottages) ? <img src={selectedType.cottages[0].images[0].url} alt="Main Room" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                            : undefined
                }
            </Grid>

        </Grid>
    );
}

function CottageItem({ isActive, name, price, imageUrl, onClick }) {
    return (
        <Box bgcolor={isActive ? '#c0c0c0' : undefined} color={isActive ? 'white' : '#333'} p={1} sx={{ display: 'flex', alignItems: 'center', mt: 2 }} onClick={onClick}>
            <img src={imageUrl} alt={name} style={{ width: '5rem', height: '3.75rem', marginRight: '0.5rem' }} />
            <Box>
                <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>{name}</Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem' }}>{price}</Typography>
            </Box>
        </Box>
    );
}

export default FeaturedCottages;