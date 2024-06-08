import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Chip, DialogContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from 'react';
import useServices from "../../../../../hooks/reservation/useServices";
import CustomCarousel from '../../../../../utility_components/CustomCarousel';
import Modal from "../../../../../utility_components/modal/Modal";
import formatPrice from '../../../../../utility_functions/formatPrice';
import removeAddOnsIfFree from "../../../../../utility_functions/removeAddOnsIfFree";
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
        return (selectedAddOns.length !== 0) ? (selectedAddOns.find(ad => ad.item_id === item_id)?.quantity || 0) : 0;
    }

    const availableAddOns = cottage.items && cottage.length !== 0 && addOns ? removeAddOnsIfFree(addOns, cottage) : [];

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

    const handleIncrement = (id, name, price) => {
        const quantity = Math.min(addOnDefaultValue(id) + 1, 1);
        setAddOns(cottage.id, { quantity, name, item_id: id, price });
    };

    const handleDecrement = (id, name, price) => {
        const quantity = Math.max(addOnDefaultValue(id) - 1, 0);
        setAddOns(cottage.id, { quantity, name, item_id: id, price });
    };

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
                        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 1.5, sm: 2 }} mt={3}>
                            {/* Available Rates */}
                            <Box sx={{ p: 2, boxShadow: 2, bgcolor: 'background.paper', borderRadius: 2, width: '100%' }}>
                                <Typography variant="h5" fontWeight={600} gutterBottom>
                                    Available Rates
                                </Typography>
                                <Typography gutterBottom>Published Rates</Typography>
                                <Typography fontWeight={600}>Capacity: {cottage.capacity}</Typography>
                                <Typography fontWeight={600}>PHP {formatPrice(cottage.price)}</Typography>
                                {/* <Typography fontWeight={600}>Rate: {cottage.rate}</Typography> */}
                            </Box>

                            {/* Items */}
                            {cottage.items && cottage.items.length !== 0 && (
                                <Box sx={{ p: 2, boxShadow: 2, bgcolor: 'background.paper', borderRadius: 2, width: '100%' }}>
                                    <Typography variant="h5" fontWeight={600} gutterBottom>
                                        Amenities
                                    </Typography>
                                    <Box display="flex" flexWrap="wrap">
                                        {cottage.items.map((item) => (
                                            <Chip
                                                key={item.id}
                                                label={item.isOutOfStock ? `${item.name} (out of stock)` : item.name}
                                                color="primary"
                                                variant="filled"
                                                disabled={item.isOutOfStock}
                                                sx={{ mr: 0.5, mb: 0.5 }}
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
                                                Please book the cottage first before adding any add-ons.
                                            </Typography>
                                        )}
                                        <Box display="flex" flexWrap="wrap" gap={2}>
                                            {availableAddOns.map((addOn) => (
                                                <Box
                                                    key={addOn.id}
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={1}
                                                    sx={{
                                                        border: '1px solid',
                                                        borderColor: '#e0e0e0',
                                                        borderRadius: 2,
                                                        p: 1,
                                                        bgcolor: addOn.isOutOfStock ? '#f5f5f5' : '#ffffff',
                                                    }}
                                                >
                                                    <Typography color={addOn.isOutOfStock ? '#c0c0c0' : 'text.primary'}>
                                                        {addOn.name} {addOn.isOutOfStock ? '(out of stock)' : ''}:
                                                    </Typography>
                                                    <Typography color={addOn.isOutOfStock ? '#c0c0c0' : 'text.primary'}>
                                                        ₱{addOn.price}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDecrement(addOn.id, addOn.name, addOn.price)}
                                                        disabled={!isAddedToBook || addOn.isOutOfStock || addOnDefaultValue(addOn.id) <= 0}
                                                        sx={{ color: !isAddedToBook || addOn.isOutOfStock || addOnDefaultValue(addOn.id) <= 0 ? '#c0c0c0' : 'primary.main' }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography>{addOnDefaultValue(addOn.id)}</Typography>
                                                    <IconButton
                                                        size="small"
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
            } />
    );
}

export default ViewCottage;
