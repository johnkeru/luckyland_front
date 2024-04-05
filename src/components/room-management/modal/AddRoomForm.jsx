import React, { useState } from 'react';

import { Box, Button, Chip, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import InputIcon from '../../../utility_components/InputIcon';
import TextArea from '../../../utility_components/TextArea';

const AddRoomForm = ({ defaultValues, register, errors, setValue, setAttributes, attributes, setAttrErrorMsg, attrErrorMsg }) => {
    const [attribute, setAttribute] = useState([]);

    const [active, setActive] = useState((defaultValues && Boolean(defaultValues?.active) + '') || 'true');

    const handleActive = (value) => {
        setActive(value);
        setValue('active', value === 'true' ? true : false);
    }

    const handleAddAttr = () => {
        setAttrErrorMsg('')
        setAttributes(prev => {
            // Check if the attribute already exists in the array
            if (!prev.includes(attribute)) {
                // If it doesn't exist, add it to the array
                return [...prev, { name: attribute }];
            } else {
                // If it already exists, return the array as it is
                return prev;
            }
        });
        setAttribute(''); // Resetting the attribute state
    }

    return (
        <Box >
            <Typography gutterBottom variant='h6'>Room Details</Typography>
            <InputIcon defaultValue={defaultValues?.name} sx={{ mb: 2 }} errors={errors} label='Name' register={register} fullWidth name='name' />

            <TextArea defaultValue={defaultValues?.description} register={register} name='description' height='80px' placeholder='Room Description (Optional)' />


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

            <InputIcon defaultValue={defaultValues?.price} type='number' sx={{ mb: 2 }} errors={errors} label='Price' register={register} fullWidth name='price' />

            {/* <InputIcon defaultValue={defaultValues?.rate} type='number' sx={{ mb: 2 }} errors={errors} label='Rate (%)' register={register} fullWidth name='rate' /> */}
            <InputIcon defaultValue={defaultValues?.minCapacity} type='number' sx={{ mb: 2 }} errors={errors} label='Minimum Capacity' register={register} fullWidth name='minCapacity' />
            <InputIcon defaultValue={defaultValues?.maxCapacity} type='number' sx={{ mb: 2 }} errors={errors} label='Maximum Capacity' register={register} fullWidth name='maxCapacity' />

            <Typography gutterBottom variant='h6'>Room Attributes</Typography>
            <Box mb={2}>
                <Box display='flex' alignItems='center' gap={1}>
                    <TextField value={attribute} fullWidth label='Add attributes' error={!!attrErrorMsg} helperText={attrErrorMsg ? attrErrorMsg : undefined} onChange={e => setAttribute(e.target.value)} />
                    <Button variant='contained' size='large' onClick={handleAddAttr}>
                        Add
                    </Button>
                </Box>
                {attributes.length !== 0 ? <Box p={2} pb={1} pr={1} bgcolor={grey[200]} borderRadius={2} mt={1}>
                    {
                        attributes.map(attr => (
                            <Chip color='info' sx={{ mr: 1, mb: 1 }} label={attr?.name} key={attr?.name} onDelete={() => setAttributes(prev => prev.filter(attribute => attribute.name !== attr?.name))} />
                        ))
                    }
                </Box> : undefined}
            </Box>

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
