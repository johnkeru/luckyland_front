import formatPrice from '../../../../../utility_functions/formatPrice';

import {Box, Button, Divider, Typography} from '@mui/material';
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';

const ReservationCottage = ({ cottage, setViewCottage }) => {

    const { selectedCottages, pushNewCottage, removeCottage } = useServices();
    const isAddedToBook = selectedCottages.length !== 0 ? selectedCottages.some(rm => rm.id === cottage.id) : false;


    return (
        <Box sx={{px: {xs: 2, sm: 0}, py: 4, borderBottom: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: 4}}>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: {xs: 2, sm: 3}}}>
                {/* Images Column */}
                <Box sx={{flex: 1}}>
                    <CustomCarousel images={cottage.images} height={280} noIndicator/>
                </Box>
                {/* Details Column */}
                <Box sx={{flex: 1,}}>
                    <Typography variant="h5" component="div" fontWeight="bold">{cottage.name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>{cottage.type}</Typography>
                    <Divider sx={{mb: 1, width: '80%'}}/>
                    {cottage.attributes.map(attribute => (
                        <Typography variant="body1" gutterBottom key={attribute.id}
                                    sx={{display: 'flex', alignItems: 'center'}}>
                            {attribute.name}
                        </Typography>
                    ))}
                    <Typography
                        mt={2} variant='body2' sx={{width: 'fit-content', cursor: 'pointer', color: 'info.main',}}
                        onClick={()=>setViewCottage(cottage)}
                    >
                        VIEW MORE
                    </Typography>
                </Box>

                {/* Price and Book Button Column */}
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column',}}>
                    <Typography variant="h6">Price</Typography>
                        <Typography variant="h4" color="primary">₱{formatPrice(cottage.price)}</Typography>
                    <Box mt={{xs: 2, sm: 'auto'}}  mb={4}>
                        {
                            isAddedToBook ?
                                <Button variant="contained" color='error' fullWidth onClick={() => removeCottage(cottage)}>
                                    Cancel
                                </Button> :
                                <Button variant="contained" fullWidth onClick={() => pushNewCottage(cottage)}>
                                    Book This
                                </Button>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReservationCottage

