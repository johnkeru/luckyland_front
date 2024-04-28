import formatPrice from '../../../../../utility_functions/formatPrice';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { MdOutlineBedroomChild } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

import { FaCheck } from "react-icons/fa";
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';


const ReservationRoom = ({ room, setViewRoom }) => {

    const { selectedRooms, pushNewRoom, removeRoom } = useServices();
    const isAddedToBook = selectedRooms.length !== 0 ? selectedRooms.some(rm => rm.id === room.id) : false;


    return (
        <Grid item xs={12} sm={6} lg={4} mb={2} mx={{ xs: 2, sm: 0 }}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    ":hover": { boxShadow: 4 },
                    borderRadius: { xs: 2, md: 4 },
                    overflow: 'hidden',
                    height: '100%'
                }}>

                <Box position='relative'>
                    <CustomCarousel
                        images={room.images}
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
                        <MdOutlineBedroomChild color='inherit' size={20} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>{room.type}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {room.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <BiSolidCabinet title='cabinet' />
                        <FaWifi title='wifi' />
                        <MdOutlineBedroomChild title='bed' />
                        <PiTelevisionSimpleFill title='tv' />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        ₱ {formatPrice(room.price)} / night
                    </Typography>

                    <Box display='flex' gap={1} justifyContent='end'>
                        <Button variant="outlined" fullWidth onClick={() => setViewRoom(room)}>
                            See More
                        </Button>

                        {
                            isAddedToBook ? <Button variant="contained" color='error' fullWidth onClick={() => removeRoom(room)}>
                                Cancel
                            </Button> :
                                <Button variant="contained" fullWidth onClick={() => pushNewRoom(room)} >
                                    Book Now
                                </Button>
                        }
                    </Box>

                </Box>
            </Box>
        </Grid>
    )
}

export default ReservationRoom

