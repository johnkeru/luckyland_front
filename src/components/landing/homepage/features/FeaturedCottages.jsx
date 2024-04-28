import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CustomCarousel from '../../../../utility_components/CustomCarousel';
import { useNavigate } from 'react-router';
import scrollTop from '../../../../utility_functions/scrollTop';

const FeaturedCottages = ({ loading, cottageTypes }) => {

    const nav = useNavigate();
    const [selectedType, setSelectedType] = useState(null);

    const handleGo = () => {
        nav('/cottages');
        scrollTop();
    }

    useEffect(() => {
        setSelectedType(cottageTypes[0]);
    }, [cottageTypes])


    return (
        <Grid container justifyContent="center" alignItems="center">

            <Grid item xs={12} md={6} display={{ xs: 'none', md: 'block' }}>
                {
                    (loading) ? <Skeleton /> :
                        (selectedType && selectedType.cottages) ?
                            <CustomCarousel
                                images={selectedType.cottages[0].images}
                                height={500}
                                noIndicator
                            />
                            : undefined
                }
            </Grid>

            <Grid item xs={12} md={6} py={{ xs: 3, md: 0 }}>
                <Box width={{ xs: '80%', md: '70%', lg: '50' }} m='auto'>
                    <Typography variant="h6">Our Cottages</Typography>
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
                        <Button onClick={handleGo} sx={{ mt: 4 }} fullWidth variant='text'>View All cottages</Button>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} md={6} display={{ xs: 'block', md: 'none' }}>
                {
                    (loading) ? <Skeleton /> :
                        (selectedType && selectedType.cottages) ?
                            <CustomCarousel
                                images={selectedType.cottages[0].images}
                                height={500}
                                noIndicator
                            />
                            : undefined
                }
            </Grid>

        </Grid>
    );
}

function CottageItem({ isActive, name, price, imageUrl, onClick }) {
    return (
        <Box bgcolor={isActive ? '#e3e3e3' : undefined} p={1} sx={{ display: 'flex', mt: 2 }} onClick={onClick}>
            <img src={imageUrl} alt={name} style={{ width: '5rem', height: '3.75rem', marginRight: '0.5rem' }} />
            <Box>
                <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>{name}</Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem' }}>{price}</Typography>
            </Box>
        </Box>
    );
}

export default FeaturedCottages;