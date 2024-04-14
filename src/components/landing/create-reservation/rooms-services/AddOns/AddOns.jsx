import { Box, Typography } from '@mui/material';
import React from 'react';
import Amenities from './Amenities';

const AddOns = ({ amenities }) => {

    return (
        <Box bgcolor="#f5f5f5" border='1px solid #ddd' borderRadius={2} p={2} mt={2}>
            <Typography variant="h5" gutterBottom>Add Ons</Typography>
            <Amenities amenities={amenities} />
        </Box>
    )
}

export default AddOns;
