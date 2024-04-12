import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const TextArea = ({ label, placeholder, defaultValue, value, error, register, name, height = '150px', mb = 2 }) => {
    // Calculate the number of rows based on the default height
    // const defaultRows = Math.ceil(parseFloat(height) / 24); // Assuming 24px is the default row height

    return (
        <FormControl fullWidth error={!!error}>
            <TextareaAutosize
                id={name}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                {...register(name)}
                aria-label={label}
                style={{
                    fontSize: '16px',
                    minHeight: height, // Set the minimum height based on the prop value
                    padding: '10px', // Add padding for better appearance
                    resize: 'vertical', // Allow vertical resizing
                    marginBottom: mb - 1 + 'rem'
                }}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};

export default TextArea;
