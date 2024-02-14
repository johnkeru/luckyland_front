import React from 'react';
import TextField from '@mui/material/TextField';

const InputHelper = ({ label, placeholder, value, error, number, register, name, disabled, type = 'text', sx, size = 'medium' }) => {

    return (
        <TextField
            sx={sx}
            size={size}
            fullWidth
            disabled={disabled}
            id={label}
            label={label}
            placeholder={placeholder}
            defaultValue={value}
            error={!!error}
            helperText={error || error?.message}
            InputProps={{
                inputProps: {
                    type: number ? 'number' : type,
                    pattern: number ? "^-?\\d*$" : undefined,
                    onKeyDown: number ? (evt) => {
                        const isInvalidKey = !/^[0-9.-]$/.test(evt.key);
                        if (isInvalidKey) {
                            evt.preventDefault();
                        }
                    } : undefined
                }
            }}
            {...register(name)}
        />
    );
};

export default InputHelper;
