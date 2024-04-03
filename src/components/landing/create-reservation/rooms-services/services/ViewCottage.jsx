import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import React from 'react';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import useServices from "../../../../../hooks/reservation/useServices";
import RoleChip from '../../../../employee/RoleChip';
import RoomImageCarousel from '../../../../room-management/RoomImageCarousel';

const ViewCottage = ({ cottage, addOns, setViewCottage }) => {

    const { selectedCottages, pushNewCottage, removeCottage, setCottageAddOns } = useServices();
    const isAddedToBook = selectedCottages.length !== 0 ? selectedCottages.some(ct => ct.id === cottage.id) : false;

    return (
        <Paper elevation={3} style={{ padding: 20, marginBottom: 20, width: '100%' }}>
            {/* Option 1: Top Placement */}

            <Grid container spacing={2}>
                {/* cottage Images Carousel */}
                <Grid item xs={12} sm={6}>
                    <RoomImageCarousel images={cottage.images} />
                </Grid>
                {/* cottage Description and Amenities */}
                <Grid item xs={12} sm={6}>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' justifyContent='space-between' alignItems='center' mb={.5}>
                            <Typography variant="h4" fontWeight={600} >{cottage.name}</Typography>
                            <Box display='flex' justifyContent='space-between' alignItems='center' gap={1}>
                                {
                                    !isAddedToBook ?
                                        <Button onClick={() => pushNewCottage(cottage)} variant='contained' color='success' startIcon={<IoMdAdd />}>Book this cottage</Button>
                                        :
                                        <Button onClick={() => removeCottage(cottage)} variant='contained' color='error' startIcon={<IoMdRemove />}>Cancel this cottage</Button>
                                }
                                <IconButton title='close' onClick={() => setViewCottage()}>
                                    <IoMdClose color='red' />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box mb={1}><RoleChip size="small" role={cottage.type} /></Box>
                        <Typography variant="body1" paragraph>{cottage.description}</Typography>
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
                        <Typography fontWeight={600}>Capacity: {cottage.capacity}</Typography>
                        <Typography fontWeight={600}>PHP {cottage.price}</Typography>
                        <Typography fontWeight={600}>Rate: {cottage.rate}</Typography>
                    </Paper>
                </Grid>

                {/* Add Ons */}
                <Grid item xs={12} sm={4}>
                    <Paper style={{ padding: 20, position: 'relative', height: '100%' }}>
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
                                                onChange={e => setCottageAddOns(room.id, { quantity: parseInt(e.target.value), name: addOn.name, item_id: addOn.item_id })}
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
                            <Typography fontSize='17px' px={3}>Book this cottage first before adding any add-ons.</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

        </Paper>
    );
}

export default ViewCottage;
