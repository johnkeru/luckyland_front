import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import React from 'react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import RoleChip from '../../../../employee/RoleChip';
import RoomImageCarousel from '../../../../room-management/RoomImageCarousel';

const ViewCottage = ({ cottage, addOns, setViewCottage }) => {

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
                                <Button variant='contained' color='success' startIcon={<IoMdAdd />}>Book this cottage</Button>
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
                        <Box sx={{ opacity: .5 }}>
                            <Typography variant="h5" fontWeight={600} gutterBottom>Add Ons</Typography>
                            <Box display='flex' flexWrap='wrap' gap={2}>
                                {addOns.map(addOn => (
                                    <Box key={addOn.id} display='flex' gap={1} alignItems='center'>
                                        <Typography>{addOn.name}: </Typography>
                                        <FormControl size='small'>
                                            <InputLabel>{0}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={''}
                                                label='Amenties2'
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
                                height: '100%',
                                top: 0,
                                left: 0,
                                background: 'rgba(0,0,0,.55)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                textAlign: 'center',
                                borderRadius: 5,
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

