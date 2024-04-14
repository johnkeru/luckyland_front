import React from 'react';
import TextField from '@mui/material/TextField';

const InputHelper = ({ focused = false, fullWidth = true, label, placeholder, value, error, number, register, name, disabled, type = 'text', sx, size = 'medium' }) => {

    return (
        <TextField
            sx={sx}
            focused={focused}
            size={size}
            fullWidth={fullWidth}
            disabled={disabled}
            id={label}
            label={label}
            placeholder={placeholder}
            defaultValue={value}
            error={!!error}
            helperText={error}
            {...register(name)}
            type={type}
        />
    );
};

export default InputHelper;
