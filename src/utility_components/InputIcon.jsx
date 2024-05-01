import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';

const InputIcon = ({
    label = '',
    name = '',
    Icon,
    register,
    errors,
    placeholder = '',
    type = 'text',
    defaultValue = '',
    value,
    sx,
    size = 'medium',
    fullWidth = true
}) => {

    const isError = errors && errors[name];

    const handleKeyDown = (evt) => {
        if (type === 'number' && !/^[0-9.-]$/.test(evt.key) && !['Backspace', 'ArrowLeft', 'ArrowRight'].includes(evt.key)) {
            // Prevent invalid keys for number input
            evt.preventDefault();
        }
    };

    return (
        <TextField
            sx={sx}
            label={label}
            size={size}
            defaultValue={defaultValue}
            type={type}
            value={value}
            id={name}
            {...register(name)}
            error={!!isError}
            helperText={isError ? errors[name]?.message : undefined}
            fullWidth={fullWidth}
            placeholder={placeholder}
            InputProps={{
                onKeyDown: handleKeyDown,
                startAdornment: !Icon ? undefined : (
                    <InputAdornment position="start">
                        <Icon className='mr-2' />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default InputIcon;
