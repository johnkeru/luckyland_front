import React, { useState } from 'react';

import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import InputIcon from '../../../utility_components/InputIcon';

const AddRoomForm = ({ defaultValues, register, errors, setValue, isCottage }) => {
    const [active, setActive] = useState((defaultValues && Boolean(defaultValues?.active) + '') || 'true');
    const handleActive = (value) => {
        setActive(value);
        setValue('active', value === 'true' ? true : false, { shouldDirty: true });
    }
    return (
        <Box >
            <Typography gutterBottom variant='h6'>{!isCottage ? 'Room' : 'Cottage'} Details</Typography>
            <InputIcon defaultValue={defaultValues?.name} sx={{ mb: 2 }} errors={errors} label='Name' register={register} fullWidth name='name' />

            <Typography gutterBottom variant='h6'>Display in reservations?</Typography>
            <FormControl fullWidth >
                <RadioGroup row value={active} onChange={e => handleActive(e.target.value)}>
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default AddRoomForm;
