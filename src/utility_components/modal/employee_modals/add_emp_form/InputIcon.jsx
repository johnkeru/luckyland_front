import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const InputIcon = ({
    label = '',
    name = '',
    Icon,
    register,
    errors,
    placeholder = '',
    type = 'text',
    defaultValue = '',
    isView,
    sx
}) => {
    const [viewPassword, setViewPassword] = useState(false);

    const handleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    const isError = errors && errors[name];

    return (
        <TextField
            sx={sx}
            label={label}
            size='medium'
            defaultValue={defaultValue}
            type={viewPassword ? 'text' : type}
            id={name}
            {...register(name)}
            error={!!isError}
            helperText={isError ? errors[name]?.message : undefined}
            className='w-full px-2 border-none focus:outline-none focus:border-gray-500'
            placeholder={placeholder}
            InputProps={!Icon ? undefined : {
                startAdornment: (
                    <InputAdornment position="start">
                        {isView ? (
                            viewPassword ? <IoEye
                                className='mr-2'
                                onClick={handleViewPassword}
                            /> :
                                <IoEyeOff
                                    className='mr-2'
                                    onClick={handleViewPassword}
                                />
                        ) : (
                            Icon && <Icon className='mr-2' />
                        )}
                    </InputAdornment>
                ),
            }}
            onPaste={(e) =>
                type === 'password' ? e.preventDefault() : undefined
            }
        />
    );
};

export default InputIcon;
