import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const TextArea = ({ label, placeholder, value, error, register, name, height = '150px' }) => {
    // Calculate the number of rows based on the default height
    // const defaultRows = Math.ceil(parseFloat(height) / 24); // Assuming 24px is the default row height

    return (
        <FormControl fullWidth error={!!error}>
            <TextareaAutosize
                id={name}
                placeholder={placeholder}
                value={value}
                {...register(name)}
                aria-label={label}
                style={{
                    fontFamily: 'sans-serif',
                    fontSize: '16px',
                    minHeight: height, // Set the minimum height based on the prop value
                    padding: '8px', // Add padding for better appearance
                    resize: 'vertical', // Allow vertical resizing
                    border: error ? '1px solid red' : '1px solid #ccc', // Border color based on error
                }}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};

export default TextArea;
