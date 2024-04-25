import formatPrice from '../../utility_functions/formatPrice';

import { Box, Button, Grid, Typography } from '@mui/material';
import { BiEdit, BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import {
    MdBedroomChild
} from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import CustomCarousel from '../../utility_components/CustomCarousel';
import AddRoom from './modal/AddRoom';
import RoomDetails from './RoomDetails';

const Room = ({ room, onSuccess, isCottage, isAllow }) => {

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

                <CustomCarousel
                    images={room.images}
                    height='200px'
                />


                <Box sx={{ p: { xs: 2, sm: 3 }, color: '#333' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1, color: 'primary.main' }}>
                        <MdBedroomChild color='inherit' size={20} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>{room.type}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {room.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        {
                            isCottage ? <>
                                <FaWifi title='wifi' /> <Typography variant='body2'>Free Wifi</Typography>
                            </> :
                                <>
                                    <BiSolidCabinet title='cabinet' />
                                    <FaWifi title='wifi' />
                                    <MdBedroomChild title='bed' />
                                    <PiTelevisionSimpleFill title='tv' />
                                </>
                        }
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        ₱ {formatPrice(room.price)} / night
                    </Typography>

                    <Box display='flex' gap={1} justifyContent='end'>
                        {onSuccess && <RoomDetails
                            isAllow={isAllow}
                            isCottage={isCottage}
                            room={room}
                            onSuccess={onSuccess}
                            button={
                                <Button variant="outlined" fullWidth>
                                    See More
                                </Button>
                            }
                        />}

                        {isAllow ? <AddRoom
                            isCottage={isCottage}
                            button={
                                <Button variant="contained" color='info' fullWidth startIcon={<BiEdit />}>
                                    Edit
                                </Button>
                            }
                            defaultValues={room}
                            onSuccess={onSuccess}
                        /> : undefined}

                    </Box>

                </Box>
            </Box>
        </Grid>
    )
}

export default Room







