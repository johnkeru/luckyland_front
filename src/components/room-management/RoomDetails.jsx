import React, { useState } from 'react';
import { Box, Button, Chip, DialogContent, Grid, Paper, Typography } from "@mui/material";
import RoomImagesCarousel from "./RoomImageCarousel";
import CommonFooter from "../../utility_components/modal/CommonFooter";
import Modal from "../../utility_components/modal/Modal";
import AddRoom from './modal/AddRoom';
import RoleChip from '../employee/RoleChip';

const RoomDetails = ({ room, button, onSuccess }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            maxWidth="lg"
            title={`${room.name} Details`}
        >
            <DialogContent sx={{ width: '1200px' }} dividers>
                {/* Option 1: Top Placement */}

                <Grid container spacing={2}>
                    {/* Room Images Carousel */}
                    <Grid item xs={12} sm={6}>
                        <RoomImagesCarousel images={room.images} />
                    </Grid>
                    {/* Room Description and Amenities */}
                    <Grid item xs={12} sm={6}>
                        <Box display='flex' flexDirection='column'>
                            <Box display='flex' justifyContent='space-between' alignItems='center' mb={.5}>
                                <Typography variant="h4" fontWeight={600} >{room.name}</Typography>
                                {
                                    !room.active ? <Chip label='Unavailable' /> : undefined
                                }
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
                    <Grid item xs={12} sm={4}>
                        <Paper style={{ padding: 20, height: '100%' }}>
                            <Typography variant="h5" fontWeight={600} gutterBottom>Available Rates</Typography>
                            <Typography gutterBottom>Published Rates</Typography>
                            <Typography fontWeight={600}>
                                Capacity: {room.minCapacity}
                                <span style={{ color: 'green', marginLeft: '5px' }}>(+{room.maxCapacity - room.minCapacity})</span>
                            </Typography>
                            <Typography fontWeight={600}>PHP {room.price}</Typography>
                            {/* <Typography fontWeight={600}>Rate: {room.rate}</Typography> */}
                        </Paper>
                    </Grid>

                    {/* Items */}
                    <Grid item xs={12} sm={4}>
                        <Paper style={{ padding: 20, height: '100%' }}>
                            <Typography variant="h5" fontWeight={600} gutterBottom>Amenities</Typography>
                            <Box display="flex" flexWrap='wrap'>
                                {room.items.map((item) => (
                                    <Chip key={item.id} label={item.name} color="primary" variant="outlined" style={{ marginRight: 5, marginBottom: 5 }} />
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            </DialogContent>
            {/* Common Footer */}
            <CommonFooter>
                <AddRoom
                    button={
                        <Button variant="contained" size='large'>Edit this room</Button>
                    }
                    defaultValues={room}
                    onSuccess={onSuccess}
                />
            </CommonFooter>
        </Modal>
    );
}

export default RoomDetails;
