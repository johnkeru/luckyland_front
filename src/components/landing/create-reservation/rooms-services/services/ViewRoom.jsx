import { Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import React from 'react';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';
import formatPrice from '../../../../../utility_functions/formatPrice';
import RoleChip from '../../../../employee/RoleChip';

const ViewRoom = ({ room, addOns, setViewRoom }) => {
    const { selectedRooms, pushNewRoom, removeRoom, setRoomAddOns } = useServices();

    const isAddedToBook = selectedRooms.length !== 0 ? selectedRooms.some(rm => rm.id === room.id) : false;
    const currentRoom = selectedRooms.length !== 0 ? selectedRooms.find(rm => rm.id === room.id) : {};

    // const addOnDefaultQty = (addOnId) => {
    //     if (currentRoom?.addOns && currentRoom.addOns.length !== 0) {
    //         const currentAddOn = currentRoom.addOns.find(ao => ao.inventoryId === addOnId);
    //         return currentAddOn.quantity;
    //     }
    //     return 0;
    // }

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2, width: '100%', borderRadius: 0 }}>
            {/* Option 1: Top Placement */}

            <Grid container spacing={2}>
                {/* Room Images Carousel */}
                <Grid item xs={12} sm={6}>
                    <CustomCarousel images={room.images} height={51} />
                </Grid>
                {/* Room Description and Amenities */}
                <Grid item xs={12} sm={6}>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' justifyContent='space-between' alignItems='center' mb={.5}>
                            <Typography variant="h4" fontWeight={600} >{room.name}</Typography>
                            <Box display='flex' justifyContent='space-between' alignItems='center' gap={1}>
                                {
                                    !isAddedToBook ?
                                        <Button onClick={() => pushNewRoom(room)} variant='contained' color='success' startIcon={<IoMdAdd />}>Book this room</Button>
                                        :
                                        <Button onClick={() => removeRoom(room)} variant='contained' color='error' startIcon={<IoMdRemove />}>Cancel this room</Button>
                                }
                                <IconButton title='close' onClick={() => setViewRoom()}>
                                    <IoMdClose color='red' />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box mb={1}><RoleChip size="small" role={room.type} /></Box>
                        <Typography variant="body1" paragraph>{room.description}</Typography>

                        <Typography variant="h5" fontWeight={600} gutterBottom>Room Features</Typography>
                        <Box display="flex" flexDirection="column">
                            {room.attributes.map(attr => (
                                <Typography key={attr.id} variant="body1">• {attr.name}</Typography>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Additional Information */}

            <Grid container spacing={2} alignItems="stretch" mt={1}>
                {/* Available Rates */}
                <Grid item xs={12} sm={4} >
                    <Paper sx={{ padding: 2, bgcolor: 'custom.white', height: '100%' }}>
                        <Typography variant="h5" fontWeight={600} gutterBottom>Available Rates</Typography>
                        <Typography gutterBottom>Published Rates</Typography>
                        <Typography fontWeight={600}>
                            Capacity: {room.minCapacity}
                            <span style={{ color: 'green', marginLeft: '5px' }}>(+{room.maxCapacity - room.minCapacity})</span>
                        </Typography>
                        <Typography fontWeight={600}>PHP {formatPrice(room.price)}</Typography>
                        {/* <Typography fontWeight={600}>Rate: {room.rate}</Typography> */}
                    </Paper>
                </Grid>

                {/* Items */}
                {room.items && room.items.length !== 0 ?
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ padding: 2, bgcolor: 'custom.white', height: '100%' }}>
                            <Typography variant="h5" fontWeight={600} gutterBottom>Amenities</Typography>
                            <Box display="flex" flexWrap='wrap'>
                                {room.items.map((item) => (
                                    <Chip key={item.id} label={item.name} color="primary" variant="outlined" style={{ marginRight: 5, marginBottom: 5 }} />
                                ))}
                            </Box>
                        </Paper>
                    </Grid> : undefined}

                {/* Add Ons */}
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ padding: 2, bgcolor: 'custom.white', position: 'relative', height: '100%' }}>
                        <Box sx={{ opacity: !isAddedToBook ? .5 : 1 }}>
                            <Typography variant="h5" fontWeight={600} gutterBottom>Add Ons</Typography>
                            <Box display='flex' flexWrap='wrap' gap={2}>
                                {addOns.map(addOn => (
                                    <Box key={addOn.id} display='flex' gap={1} alignItems='center'>
                                        <Typography>{addOn.name}: </Typography>
                                        <FormControl size='small' >
                                            <InputLabel>{0}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={''}
                                                label='Amenties2'
                                                onChange={e => setRoomAddOns(room.id, { quantity: parseInt(e.target.value), name: addOn.name, item_id: addOn.item_id })}
                                            >
                                                <MenuItem value="0">0</MenuItem>
                                                <MenuItem value="1">1</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Box
                            style={{
                                position: 'absolute',
                                width: '100%',
                                top: 0,
                                left: 0,
                                background: 'rgba(0,0,0,.55)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                textAlign: 'center',
                                borderRadius: 5,
                                transition: 'height 0.2s ease-in-out', // Adding transition for height property
                                height: isAddedToBook ? 0 : '100%', // Animate height from 100% to 0
                                overflow: 'hidden', // Hide content when height is 0
                                pointerEvents: isAddedToBook ? 'none' : 'auto', // Disable pointer events when not visible
                            }}
                        >
                            <Typography fontSize='17px' px={3}>Book this room first before adding any add-ons.</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

        </Paper>
    );
}

export default ViewRoom;

