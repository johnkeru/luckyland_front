import formatPrice from '../../../../../utility_functions/formatPrice';
import { Box, Button, Divider, Typography } from '@mui/material';
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';


const ReservationRoom = ({ room, setViewRoom }) => {

    const { selectedRooms, pushNewRoom, removeRoom } = useServices();
    const isAddedToBook = selectedRooms.length !== 0 ? selectedRooms.some(rm => rm.id === room.id) : false;


    return (
        <Box sx={{ px: { xs: 2, sm: 0 }, py: 2, borderBottom: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 } }}>
                {/* Images Column */}
                <Box sx={{ flex: 1 }}>
                    <CustomCarousel images={room.images} height={280} noIndicator />
                </Box>
                {/* Details Column */}
                <Box sx={{ flex: 1, }}>
                    <Typography variant="h5" component="div" fontWeight="bold">{room.name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>{room.type}</Typography>
                    <Divider sx={{ mb: 1, width: '80%' }} />
                    {room.attributes.map(attribute => (
                        <Typography variant="body1" gutterBottom key={attribute.id}
                            sx={{ display: 'flex', alignItems: 'center' }}>
                            {attribute.name}
                        </Typography>
                    ))}
                    <Typography
                        mt={2} variant='body2' sx={{ width: 'fit-content', cursor: 'pointer', color: 'info.main', }}
                        onClick={() => setViewRoom(room)}
                    >
                        VIEW MORE
                    </Typography>
                </Box>

                {/* Price and Book Button Column */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                    <Typography variant="h6">Price</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h4" color="primary">₱{formatPrice(room.price)}</Typography>
                        /
                        <Typography variant="body2">Per Night</Typography>
                    </Box>
                    <Box mt={{ xs: 2, sm: 'auto' }} mb={{ xs: 0, sm: 4 }}>
                        {
                            isAddedToBook ?
                                <Button variant="contained" color='error' fullWidth onClick={() => removeRoom(room)}>
                                    Cancel
                                </Button> :
                                <Button variant="contained" fullWidth onClick={() => pushNewRoom(room)}>
                                    Book This
                                </Button>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReservationRoom

