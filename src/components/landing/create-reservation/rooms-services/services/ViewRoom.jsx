import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Chip, DialogContent, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';
import Modal from '../../../../../utility_components/modal/Modal';
import formatPrice from '../../../../../utility_functions/formatPrice';
import removeAddOnsIfFree from "../../../../../utility_functions/removeAddOnsIfFree";

const ViewRoom = ({ room, addOns, }) => {
    const { selectedRooms, pushNewRoom, removeRoom, setRoomAddOns } = useServices();

    const isAddedToBook = selectedRooms.length !== 0 ? selectedRooms.some(rm => rm.id === room.id) : false;

    const selectedRoom = selectedRooms.find(selectedRoom => selectedRoom.id === room.id) || [];
    const selectedAddOns = selectedRoom.length !== 0 ? selectedRoom.addOns || [] : [];

    const addOnDefaultValue = (item_id) => {
        return (selectedAddOns.length !== 0) ? (selectedAddOns.find(ad => ad.item_id === item_id)?.quantity || 0) : 0;
    }

    const availableAddOns = room.items && room.length !== 0 && addOns ? removeAddOnsIfFree(addOns, room) : [];

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
    </Button>;

    const handleIncrement = (id, name, price) => {
        const quantity = Math.min(addOnDefaultValue(id) + 1, 1);
        setRoomAddOns(room.id, { quantity, name, item_id: id, price });
    };

    const handleDecrement = (id, name, price) => {
        const quantity = Math.max(addOnDefaultValue(id) - 1, 0);
        setRoomAddOns(room.id, { quantity, name, item_id: id, price });
    };

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
                        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 1.5, sm: 2 }} mt={3}>
                            {/* Available Rates */}
                            <Box p={3} bgcolor="#f5f5f5" borderRadius={2} width='100%'>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Available Rates
                                </Typography>
                                <Typography variant="body1">
                                    Capacity: {room.minCapacity} (+{room.maxCapacity - room.minCapacity})
                                </Typography>
                                <Typography variant="body1">
                                    Price: PHP {formatPrice(room.price)}
                                </Typography>
                            </Box>

                            {/* Amenities */}
                            {room.items && room.items.length > 0 && (
                                <Box p={3} bgcolor="#f5f5f5" borderRadius={2} width='100%'>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        Amenities
                                    </Typography>
                                    <Box>
                                        {room.items.map((item) => (
                                            <Chip
                                                key={item.id}
                                                label={item.isOutOfStock ? `${item.name} (out of stock)` : item.name}
                                                color="primary"
                                                variant="variant"
                                                disabled={item.isOutOfStock}
                                                sx={{ mr: 1, mb: 1 }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* Add Ons */}
                            {availableAddOns && availableAddOns.length !== 0 && (
                                <Box sx={{ p: 2, boxShadow: 2, bgcolor: 'background.paper', position: 'relative', pb: { xs: 5, md: 0 }, borderRadius: 2, width: '100%' }}>
                                    <Box sx={{ opacity: !isAddedToBook ? 0.5 : 1 }}>
                                        <Typography variant="h5" fontWeight={600} >
                                            Add Ons
                                        </Typography>
                                        {!isAddedToBook && (
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Please book the room first before adding any add-ons.
                                            </Typography>
                                        )}
                                        <Box display="flex" flexWrap="wrap" gap={2} py={{ xs: 1, sm: 2 }}>
                                            {availableAddOns.map(addOn => (
                                                <Box
                                                    key={addOn.id}
                                                    display='flex'
                                                    alignItems='center'
                                                    gap={1}
                                                    sx={{
                                                        border: '1px solid',
                                                        borderColor: '#e0e0e0',
                                                        borderRadius: 2,
                                                        p: 1,
                                                        bgcolor: addOn.isOutOfStock ? '#f5f5f5' : '#ffffff'
                                                    }}
                                                >
                                                    <Typography color={addOn.isOutOfStock ? '#c0c0c0' : 'text.primary'}>
                                                        {addOn.name} {addOn.isOutOfStock ? '(out of stock)' : ''}:
                                                    </Typography>
                                                    <Typography color={addOn.isOutOfStock ? '#c0c0c0' : 'text.primary'}>
                                                        ₱{addOn.price}
                                                    </Typography>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() => handleDecrement(addOn.id, addOn.name, addOn.price)}
                                                        disabled={!isAddedToBook || addOn.isOutOfStock || addOnDefaultValue(addOn.id) <= 0}
                                                        sx={{ color: !isAddedToBook || addOn.isOutOfStock || addOnDefaultValue(addOn.id) <= 0 ? '#c0c0c0' : 'primary.main' }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography>{addOnDefaultValue(addOn.id)}</Typography>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() => handleIncrement(addOn.id, addOn.name, addOn.price)}
                                                        disabled={!isAddedToBook || addOn.isOutOfStock || addOnDefaultValue(addOn.id) >= 1}
                                                        sx={{ color: !isAddedToBook || addOn.isOutOfStock || addOnDefaultValue(addOn.id) >= 1 ? '#c0c0c0' : 'primary.main' }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>

                    </Box>
                </DialogContent>
            }
        />
    );
}

export default ViewRoom;
