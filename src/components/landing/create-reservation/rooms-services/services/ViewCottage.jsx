import { Box, Button, Chip, DialogContent, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from 'react';
import useServices from "../../../../../hooks/reservation/useServices";
import CustomCarousel from '../../../../../utility_components/CustomCarousel';
import Modal from "../../../../../utility_components/modal/Modal";
import formatPrice from '../../../../../utility_functions/formatPrice';
import RoleChip from '../../../../employee/RoleChip';

const ViewCottage = ({ cottage, addOns, isOther }) => {

    const {
        selectedCottages,
        pushNewCottage,
        removeCottage,
        setCottageAddOns,

        selectedOthers,
        pushNewOther,
        removeOther,
        setOtherAddOns,
    } = useServices();

    const pushNew = isOther ? pushNewOther : pushNewCottage;
    const remove = isOther ? removeOther : removeCottage;
    const setAddOns = isOther ? setOtherAddOns : setCottageAddOns;

    const selectedTypes = isOther ? selectedOthers : selectedCottages;

    const isAddedToBook = selectedTypes.length !== 0 ? selectedTypes.some(ct => ct.id === cottage.id) : false;
    const selectedType = selectedTypes.find(st => st.id === cottage.id) || [];
    const selectedAddOns = selectedType.length !== 0 ? selectedType.addOns || [] : [];

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
            p: 0
        }}
    >
        More about this {isOther ? 'other' : 'cottage'}
    </Button>

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            fs
            transition
            title={`${cottage.name} Details`}
            children={
                <DialogContent>
                    <Box>
                        <Grid container spacing={2} mb={{ xs: 2, md: 0 }}>
                            {/* cottage Images Carousel */}
                            <Grid item xs={12} sm={6}>
                                <CustomCarousel images={cottage.images} height={400} />
                            </Grid>
                            {/* cottage Description and Amenities */}
                            <Grid item xs={12} sm={6}>
                                <Box display='flex' flexDirection='column' px={{ xs: 2, sm: 0 }}>
                                    <Box display='flex' justifyContent='space-between' alignItems='center' mb={.5}>
                                        <Typography sx={{ fontSize: { xs: '1.3rem', md: '1.5rem' } }} fontWeight={600} >{cottage.name}</Typography>
                                        {
                                            !isAddedToBook ?
                                                <Button onClick={() => pushNew(cottage)} variant='contained' color='success'>Book now</Button>
                                                :
                                                <Button onClick={() => remove(cottage)} variant='contained' color='error'>Cancel</Button>
                                        }
                                    </Box>
                                    <Box mb={1}><RoleChip size="small" role={cottage.type} /></Box>
                                    <Typography variant="body1" paragraph>{cottage.description}</Typography>

                                    <Typography variant="h5" fontWeight={600} gutterBottom>{isOther ? 'Other' : 'Cottage'} Features</Typography>
                                    <Box display="flex" flexDirection="column">
                                        {cottage.attributes.map(attr => (
                                            <Typography key={attr.id} variant="body1">• {attr.name}</Typography>
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Additional Information */}
                        <Grid container px={0} alignItems="stretch" mt={1}>

                            {/* Available Rates */}
                            <Grid item xs={12} md={4}>
                                <Box sx={{ p: 2, boxShadow: 2, bgcolor: 'background.white', height: '100%' }}>
                                    <Typography variant="h5" fontWeight={600} gutterBottom>Available Rates</Typography>
                                    <Typography gutterBottom>Published Rates</Typography>
                                    <Typography fontWeight={600}>Capacity: {cottage.capacity}</Typography>
                                    <Typography fontWeight={600}>PHP {formatPrice(cottage.price)}</Typography>
                                    {/* <Typography fontWeight={600}>Rate: {cottage.rate}</Typography> */}
                                </Box>
                            </Grid>

                            {/* Items */}
                            {cottage.items && cottage.items.length !== 0 ?
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ p: 2, boxShadow: 2, bgcolor: 'background.white', height: '100%', }}>
                                        <Typography variant="h5" fontWeight={600} gutterBottom>Amenities</Typography>
                                        <Box display="flex" flexWrap='wrap'>
                                            {cottage.items.map((item) => (
                                                <Chip
                                                    key={item.id}
                                                    label={item.isOutOfStock ? `${item.name} (out of stock)` : item.name}
                                                    color="primary"
                                                    variant="contained"
                                                    disabled={item.isOutOfStock}
                                                    sx={{ mr: .5, mb: .5 }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid> : undefined}

                            {/* Add Ons */}
                            {
                                addOns && addOns.length !== 0 ?
                                    <Grid item xs={12} md={4}>
                                        <Box sx={{ p: 2, boxShadow: 2, bgcolor: 'background.white', position: 'relative', height: '100%', pb: { xs: 5, md: 0 } }}>
                                            <Box sx={{ opacity: !isAddedToBook ? .5 : 1 }}>
                                                <Typography variant="h5" fontWeight={600} gutterBottom>Add Ons</Typography>
                                                {!isAddedToBook && (
                                                    <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
                                                        Please book the cottage first before adding any add-ons.
                                                    </Typography>
                                                )}
                                                <Box display='flex' flexWrap='wrap' gap={2}>
                                                    {addOns.map(addOn => (
                                                        <Box key={addOn.id} display='flex' gap={1} alignItems='center'>
                                                            <Typography color={addOn.isOutOfStock ? '#c0c0c0' : ''}>{addOn.name} {addOn.isOutOfStock ? '(out of stock)' : ''}: </Typography>
                                                            <FormControl size='small' disabled={!isAddedToBook || addOn.isOutOfStock}>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={addOnDefaultValue(addOn.id)}
                                                                    label='Amenties2'
                                                                    onChange={e => setAddOns(cottage.id, { quantity: parseInt(e.target.value), name: addOn.name, item_id: addOn.id, price: addOn.price })}
                                                                >
                                                                    <MenuItem value="0">0</MenuItem>
                                                                    <MenuItem value="1">1</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    : undefined}
                        </Grid>
                    </Box>
                </DialogContent>
            } />
    );
}

export default ViewCottage;

