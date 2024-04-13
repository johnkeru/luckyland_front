import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import useTypes from '../../../hooks/rooms/useTypes';

const TypeOfRoom = ({ defaultValues, errors, register, name }) => {

    const { types } = useTypes();

    return (
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors?.type}>
            <InputLabel id="demo-simple-select-label">Type of room</InputLabel>
            <Select
                {...register(name)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={defaultValues?.type || ''}
                label={name}
            >
                <MenuItem value="" disabled>
                    <em>None</em>
                </MenuItem>
                {
                    types.map(t => (
                        <MenuItem key={t.id} value={t.type}>{t.type}</MenuItem>
                    ))
                }
            </Select>
            {errors?.type && <FormHelperText sx={{ color: 'red' }}>{errors?.type?.message}</FormHelperText>}
        </FormControl>
    )
}

export default TypeOfRoom