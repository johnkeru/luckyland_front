import React, { useState } from 'react';

import { Box, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import InputIcon from '../../../utility_components/InputIcon';

const AddRoomForm = ({ defaultValues, register, errors, setValue }) => {
    const [active, setActive] = useState((defaultValues && Boolean(defaultValues?.active) + '') || 'true');
    const handleActive = (value) => {
        setActive(value);
        setValue('active', value === 'true' ? true : false);
    }
    return (
        <Box >
            <Typography gutterBottom variant='h6'>Room Details</Typography>
            <InputIcon defaultValue={defaultValues?.name} sx={{ mb: 2 }} errors={errors} label='Name' register={register} fullWidth name='name' />
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors?.type}>
                <InputLabel id="demo-simple-select-label">Type of room</InputLabel>
                <Select
                    {...register("type")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={defaultValues?.type || ''}
                    label="type"
                >
                    <MenuItem value="" disabled>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Friends/Couples">Friends/Couples</MenuItem>
                    <MenuItem value="Family">Family</MenuItem>
                </Select>
                {errors?.type && <FormHelperText sx={{ color: 'red' }}>{errors?.type?.message}</FormHelperText>}
            </FormControl>


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
