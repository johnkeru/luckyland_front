import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

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
    sx,
    setValue, // Pass setValue as a prop
}) => {
    const [viewPassword, setViewPassword] = useState(false);

    const handleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    const isError = errors && errors[name];

    const handleGenerateHash = () => {
        let hash = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const hashLength = 8; // Adjust the length as needed

        for (let i = 0; i < hashLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            hash += characters[randomIndex];
        }

        setValue(name, hash);
    };

    useEffect(() => {
        setValue && handleGenerateHash();
    }, [])

    return (
        <>
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
                fullWidth
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
                onPaste={(e) => {
                    // type === 'password' ? e.preventDefault() : undefined

                }
                }
            />
            {/* Button to generate hash */}
            {setValue ? <Button variant="text" sx={{ textTransform: 'capitalize' }} onClick={handleGenerateHash}>
                Generate Password Hash
            </Button> : undefined}
        </>
    );
};

export default InputIcon;
