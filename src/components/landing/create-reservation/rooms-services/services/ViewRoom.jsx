import { Box, Button, Chip, DialogContent, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';
import Modal from '../../../../../utility_components/modal/Modal';
import formatPrice from '../../../../../utility_functions/formatPrice';

const ViewRoom = ({ room, addOns, }) => {
    const { selectedRooms, pushNewRoom, removeRoom, setRoomAddOns } = useServices();

    const isAddedToBook = selectedRooms.length !== 0 ? selectedRooms.some(rm => rm.id === room.id) : false;

    const selectedRoom = selectedRooms.find(selectedRoom => selectedRoom.id === room.id) || [];
    const selectedAddOns = selectedRoom.length !== 0 ? selectedRoom.addOns || [] : [];

    const addOnDefaultValue = (item_id) => {
        return (selectedAddOns.length !== 0) ? (selectedAddOns.find(ad => ad.item_id === item_id)?.quantity || 0) + '' : '0'
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const button = <Button
        variant="text"
        sx={{
            mt: 2,
            fontWeight: 'bold',
            color: '#87CEEB', // Sky blue color
            textTransform: 'uppercase', // Uppercase text
            p: 0,
        }}
    >
        More about this room
    </Button>

    return (

        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            fs
            transition
            title={`${room.name} Details`}
            children={
                <DialogContent>
                    <Box>
                        <Grid container spacing={3}>
                            {/* Room Images Carousel */}
                            <Grid item xs={12} md={6}>
                                <CustomCarousel images={room.images} height={400} />
                            </Grid>
                            {/* Room Description and Booking */}
                            <Grid item xs={12} md={6}>
                                <Box display='flex' flexDirection='column' justifyContent='space-between' height="100%">
                                    <Box mb={2}>
                                        <Typography variant="h4" fontWeight={600} mb={1}>{room.name}</Typography>
                                        <Typography variant="body1" mb={2}>{room.description}</Typography>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>Room Features</Typography>
                                        <Box>
                                            {room.attributes.map(attr => (
                                                <Typography key={attr.id} variant="body1">• {attr.name}</Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => isAddedToBook ? removeRoom(room) : pushNewRoom(room)}
                                            sx={{ backgroundColor: isAddedToBook ? '#c0392b' : '#27ae60' }}
                                        >
                                            {isAddedToBook ? 'Cancel' : 'Book This'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Additional Information */}
                        <Grid container spacing={3} mt={3}>
                            {/* Available Rates */}
                            <Grid item xs={12} md={4}>
                                <Box p={3} bgcolor="#f5f5f5" borderRadius={8}>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>Available Rates</Typography>
                                    <Typography variant="body1">Capacity: {room.minCapacity} (+{room.maxCapacity - room.minCapacity})</Typography>
                                    <Typography variant="body1">Price: PHP {formatPrice(room.price)}</Typography>
                                </Box>
                            </Grid>

                            {/* Amenities */}
                            {room.items && room.items.length > 0 &&
                                <Grid item xs={12} md={4}>
                                    <Box p={3} bgcolor="#f5f5f5" borderRadius={8}>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>Amenities</Typography>
                                        <Box>
                                            {room.items.map((item) => (
                                                <Chip
                                                    key={item.id}
                                                    label={item.isOutOfStock ? `${item.name} (out of stock)` : item.name}
                                                    color="primary"
                                                    variant="outlined"
                                                    disabled={item.isOutOfStock}
                                                    sx={{ mr: 1, mb: 1 }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            }

                            {/* Add Ons */}
                            <Grid item xs={12} md={4}>
                                <Box p={3} bgcolor="#f5f5f5" borderRadius={8}>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>Add Ons</Typography>
                                    {!isAddedToBook && (
                                        <Typography variant="body2" color="textSecondary" mb={2}>
                                            Please book the room first before adding any add-ons.
                                        </Typography>
                                    )}
                                    <Box>
                                        {addOns.length !== 0 ? addOns.map(addOn => (
                                            <Box key={addOn.id} display='flex' alignItems='center' mb={1}>
                                                <Typography variant="body1" sx={{ mr: 1 }}>{addOn.name}</Typography>
                                                <FormControl size='small' disabled={!isAddedToBook || addOn.isOutOfStock}>
                                                    <Select
                                                        value={addOnDefaultValue(addOn.id)}
                                                        onChange={e => setRoomAddOns(room.id, { quantity: parseInt(e.target.value), name: addOn.name, item_id: addOn.id, price: addOn.price })}
                                                    >
                                                        <MenuItem value="0">0</MenuItem>
                                                        <MenuItem value="1">1</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        )) : undefined}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            }
        />


    );
}

export default ViewRoom;

