import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const SelectionInput = ({ defaultValue, register, name, label, error, children }) => {
    return (
        <FormControl fullWidth sx={{ mb: 2 }} error={!!error}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                {...register(name)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={defaultValue || ''}
                label={name}
            >
                <MenuItem value="" disabled>
                    <em>None</em>
                </MenuItem>
                {children}
            </Select>
            {error && <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>}
        </FormControl>
    )
}

export default SelectionInput