import formatPrice from '../../../../../utility_functions/formatPrice';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { FaWifi } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";

import { FaCheck } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';


const ReservationCottage = ({ cottage, setViewCottage }) => {

    const { selectedCottages, pushNewCottage, removeCottage } = useServices();
    const isAddedToBook = selectedCottages.length !== 0 ? selectedCottages.some(rm => rm.id === cottage.id) : false;


    return (
        <Grid item xs={12} sm={6} md={4} mb={{ xs: 0, sm: 2 }}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    ":hover": { boxShadow: 4 },
                    borderRadius: { xs: 0, md: 4 },
                    overflow: 'hidden',
                    height: '100%'
                }}>

                <Box position='relative'>
                    <CustomCarousel
                        images={cottage.images}
                        height='200px'
                    />
                    {isAddedToBook && <Chip
                        color='primary'
                        sx={{
                            position: 'absolute',
                            top: 10,
                            left: 1,
                            mx: 1,
                            pl: 1,
                            width: 'fit-content',
                        }}
                        icon={<FaCheck />}
                        label='Added'
                    />}
                </Box>


                <Box sx={{ p: { xs: 2, sm: 3 }, color: '#333' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1, color: 'primary.main' }}>
                        <MdBedroomChild color='inherit' size={20} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>{cottage.type}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {cottage.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <FaWifi title='wifi' /> <Typography variant='body2'>Free Wifi</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        ₱ {formatPrice(cottage.price)} / night
                    </Typography>

                    <Box display='flex' gap={1} justifyContent='end'>
                        <Button variant="outlined" fullWidth onClick={() => setViewCottage(cottage)}>
                            See More
                        </Button>

                        {
                            isAddedToBook ? <Button variant="contained" color='error' fullWidth onClick={() => removeCottage(cottage)} startIcon={<IoMdRemove />}>
                                Cancel
                            </Button> :
                                <Button variant="contained" fullWidth onClick={() => pushNewCottage(cottage)} startIcon={<IoMdAdd />}>
                                    Book Now
                                </Button>
                        }
                    </Box>

                </Box>
            </Box>
        </Grid>
    )
}

export default ReservationCottage

