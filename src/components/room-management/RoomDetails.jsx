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
            <DialogContent sx={{ width: '100%' }} dividers>
                <Grid container spacing={2}>
                    {/* Room Images Carousel */}
                    <Grid item xs={12} sm={7}>
                        <RoomImagesCarousel images={room.images} />
                    </Grid>
                    {/* Room Description and Amenities */}
                    <Grid item xs={12} sm={5}>
                        <Box display="flex" flexDirection="column" height="100%">
                            {/* Room Description */}
                            <Box mb={2}>
                                <Box mb={2} display='flex' alignItems='center' justifyContent='space-between'>
                                    <Box display='flex' alignItems='center' gap={1}>
                                        <Typography fontWeight={600}>Type</Typography>
                                        <RoleChip role={room.type} />
                                    </Box>
                                    {!room.active ? <Box display='flex' alignItems='center' gap={1}>
                                        <Typography fontWeight={600}>Status</Typography>
                                        <Chip label='Unavailable' />
                                    </Box> : undefined}
                                </Box>
                                <Typography variant="body1">{room.description}</Typography>
                            </Box>
                            {/* Amenities */}
                            <Box flexGrow={1} mb={2}>
                                <Typography variant="h5" mb={2}>Amenities</Typography>
                                <Box display="flex" flexDirection="column">
                                    {room.attributes.map(attr => (
                                        <Typography key={attr.id} variant="body1" mb={1}>• {attr.name}</Typography>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box display='flex' alignItems='start' width='100%'>
                    {/* Available Rates */}
                    <Paper elevation={0} sx={{ width: '50%', p: 2 }}>
                        <Typography variant="h6" fontWeight={600} >Available Rates</Typography>
                        <Box bgcolor="#f5f5f5" p={2}>
                            <Typography variant="subtitle1" gutterBottom>Publish Rates</Typography>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>Capacity {room.capacity}</Typography>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>PHP {room.price}</Typography>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>Rate {room.rate}</Typography>
                        </Box>
                    </Paper>
                    {/* Inventories */}
                    <Paper elevation={0} sx={{ width: '50%', p: 2 }}>
                        <Typography variant="h6" fontWeight={600} >Inventories</Typography>
                        <Box display="flex" flexWrap='wrap'>
                            {room.inventories.map(inv => (
                                <Typography mr={2} mb={1} gutterBottom key={inv.inventory_id} variant="body1" >
                                    {room.capacity} {inv.productName}
                                </Typography>
                            ))}
                        </Box>
                    </Paper>

                </Box>
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
