import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { IoAdd, IoClose } from 'react-icons/io5';
import RoomModalReadMore from "./RoomModalReadMore";
import RoomSelection from "./RoomSelection";
import RoomImagesCarousel from "./RoomImagesCarousel";
import RoomModalConditions from "./RoomModalConditions";
import useBookingSummary from "../../../../hooks/useBookingSummary";

const RoomDetails = ({ room, setRoom, handleNext }) => {
    const { setSelectedRoom } = useBookingSummary();

    const handleBookRoom = () => {
        setSelectedRoom(room);
        handleNext();
    }

    return (
        <Grid borderRadius={1} width='100%'>
            <Grid display='flex'>
                {/* <img src={room.images[0]} alt="" width='70%' height='400px' /> */}
                <RoomImagesCarousel images={room.images} />
                <Box width='30%' p={2} borderRadius={1} position='relative'>
                    <Typography variant="h5" mb={1}>{room.name}</Typography>
                    {
                        room.attributes.map(attr => (
                            <Typography key={attr.id} variant="body2" mb={.4}>• {attr.name}</Typography>
                        ))
                    }

                    <Typography variant="h5" my={1}>Ameneties</Typography>
                    <Box display='flex' flexWrap='wrap' >
                        {
                            room.inventories.map(inv => (
                                <Typography mr={2} gutterBottom key={inv.productName} variant="body2" color='GrayText'>• {inv.quantity} {inv.productName}</Typography>
                            ))
                        }
                    </Box>

                    <RoomModalReadMore room={room} />

                    <IconButton
                        title='close'
                        aria-label="close"
                        onClick={() => setRoom(null)}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 8,
                            color: 'red',
                        }}
                    >
                        <IoClose />
                    </IconButton>
                </Box>
            </Grid>

            <Grid m={1}>
                <Typography variant="h6" fontWeight={600}>Available Rates</Typography>
                <Box display='flex' bgcolor={grey[200]}>
                    <Box width='40%' p={2} py={3}>
                        <Typography variant="subtitle1" gutterBottom>Publish Rates</Typography>
                        <Typography variant="subtitle2" fontWeight={600} color={blue[700]}>PHP {room.price}</Typography>
                        <Typography variant="subtitle2" fontStyle='italic' color={blue[700]} mt={-.5}>ave per night</Typography>

                        <Typography sx={{ textDecoration: 'underline', cursor: 'pointer', fontSize: '13px' }} color={blue[900]} fontStyle='italic' my={1}>rate breakdown</Typography>
                        <Typography sx={{ textDecoration: 'underline', cursor: 'pointer', fontSize: '13px' }} color={blue[900]} fontStyle='italic' mb={1}>Rate Desc/Inclusions</Typography>
                        <RoomModalConditions color={blue[900]} room={room} />
                    </Box>

                    <Box p={3} width='60%' bgcolor={grey[300]} display='flex' flexDirection='column' justifyContent='space-between'>
                        <RoomSelection />
                        <Button variant="contained" size='large' onClick={handleBookRoom}><IoAdd style={{ marginRight: '3px' }} /> Book This Room</Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default RoomDetails;