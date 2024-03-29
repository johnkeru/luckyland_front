import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from 'react';

import { IoClose } from "react-icons/io5";
import RoomImagesCarousel from '../../../../components/room-management/RoomImageCarousel';
import RoleChip from '../../../employee/RoleChip';
import { IoMdAdd } from "react-icons/io";
import AddOns from "./AddOns/AddOns";

const RoomDetails = ({ room, amenities, setReselectRoom, handleNext }) => {

    return (
        <Box width='100%'>
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
                                <Box display='flex' alignItems='center' gap={2}>
                                    <Typography variant="h5" fontWeight={600}>{room.name}</Typography>
                                    <RoleChip size="small" role={room.type} />
                                </Box>
                                <Box display='flex' alignItems='center' gap={1}>
                                    <IconButton onClick={() => setReselectRoom()} color="error" title="close"><IoClose /></IconButton>
                                </Box>
                            </Box>
                            <Typography variant="body1">{room.description}</Typography>
                        </Box>
                        {/* Amenities */}
                        <Box flexGrow={1} mb={2}>
                            <Typography variant="h5" mb={2}>Room Features</Typography>
                            <Box display="flex" flexDirection="column">
                                {room.attributes.map(attr => (
                                    <Typography key={attr.id} variant="body1" mb={1}>• {attr.name}</Typography>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Box display='flex' width='100%' gap={4}>
                {/* Available Rates */}
                <Paper elevation={0} sx={{ width: '50%' }}>
                    <Typography variant="h6" fontWeight={600} >Available Rates</Typography>
                    <Box bgcolor="#f5f5f5" p={2}>
                        <Typography variant="subtitle1" gutterBottom>Publish Rates</Typography>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>Capacity {room.capacity}</Typography>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>PHP {room.price}</Typography>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>Rate {room.rate}</Typography>
                    </Box>
                </Paper>
                {/* Inventories */}
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Box>
                        <Typography variant="h6" fontWeight={600} >Amenities</Typography>
                        <Box display="flex" gap={2} flexWrap='wrap'>
                            {
                                amenities.filter(am => am.for === 'Room').map((amenety) => <Typography key={amenety.id}>{room.capacity} {amenety.category.name}</Typography>)
                            }
                        </Box>
                    </Box>
                    <Button size="large" onClick={() => handleNext()} startIcon={<IoMdAdd />} variant="contained">Book this room</Button>
                </Box>
            </Box>

            <AddOns amenities={amenities} />
        </Box>
    );
}

export default RoomDetails;
