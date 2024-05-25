import formatPrice from '../../../../../utility_functions/formatPrice';
import {Box, Button, Divider, Typography, useMediaQuery} from '@mui/material';
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';
import ViewRoom from './ViewRoom';
import {useTheme} from "@emotion/react";


const ReservationRoom = ({room, addOns}) => {

    const {selectedRooms, pushNewRoom, removeRoom} = useServices();
    const isAddedToBook = selectedRooms.length !== 0 ? selectedRooms.some(rm => rm.id === room.id) : false;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            px: {xs: 2, sm: 4},
            py: 4,
            borderBottom: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            backgroundColor: '#f0f8ff', // Light azure background
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row'},
                gap: {xs: 0, md: 2},
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff' // White background for content box
            }}>
                {/* Images Column */}
                <Box sx={{flex: 1,}}>
                    <CustomCarousel images={room.images} noIndicator height={isMobile ? 200 : undefined}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, flex: {xs: 0, sm: 1, md: 2},}}>
                    {/* Details Column */}
                    <Box sx={{flex: 1, p: 2}}>
                        <Typography variant="h5" component="div" fontWeight="bold"
                                    sx={{color: '#2c3e50'}}>{room.name}</Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom
                                    sx={{color: '#34495e'}}>{room.type}</Typography>
                        <Divider sx={{mb: 2, width: '80%'}}/>
                        {room.attributes.map(attribute => (
                            <Typography variant="body1" gutterBottom key={attribute.id}
                                        sx={{display: 'flex', alignItems: 'center', color: '#7f8c8d'}}>
                                {attribute.name}
                            </Typography>
                        ))}
                        <ViewRoom room={room} addOns={addOns}/>
                    </Box>

                    {/* Price and Book Button Column */}
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        justifyContent: 'space-between',
                        backgroundColor: '#ecf0f1',
                        borderRadius: {xs: 0, md: '0 10px 10px 0'}
                    }}>
                        <Typography variant="h6" sx={{color: '#2c3e50'}}>Price</Typography>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant="h4" color="primary"
                                        sx={{color: '#27ae60'}}>₱{formatPrice(room.price)}</Typography>
                            <Typography variant="body2" sx={{color: '#7f8c8d'}}>Per Night</Typography>
                        </Box>
                        <Box mt={{xs: 2, sm: 'auto'}}>
                            {
                                isAddedToBook ?
                                    <Button variant="contained" color='error' fullWidth
                                            onClick={() => removeRoom(room)}>
                                        Cancel
                                    </Button> :
                                    <Button variant="contained" fullWidth
                                            sx={{bgcolor: '#27ae60', ":hover": {bgcolor: '#27ae60'}}}
                                            onClick={() => pushNewRoom(room)}>
                                        Book This
                                    </Button>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReservationRoom;
