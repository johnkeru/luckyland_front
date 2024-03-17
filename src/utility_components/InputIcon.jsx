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
    sx,
    size = 'medium',
    fullWidth = true
}) => {

    const isError = errors && errors[name];

    return (
        <TextField
            sx={sx}
            label={label}
            size={size}
            defaultValue={defaultValue}
            type={type}
            id={name}
            {...register(name)}
            error={!!isError}
            helperText={isError ? errors[name]?.message : undefined}
            fullWidth={fullWidth}
            placeholder={placeholder}
            InputProps={{
                inputProps: type === 'number' ? {
                    type: 'number',
                    pattern: "^-?\\d*$",
                    onKeyDown: (evt) => {
                        const isInvalidKey = !/^[0-9.-]$/.test(evt.key);
                        if (isInvalidKey) {
                            evt.preventDefault();
                        }
                    }
                } : undefined,
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
