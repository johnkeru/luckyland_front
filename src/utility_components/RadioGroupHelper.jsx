import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

export default function RadioGroupHelper({ label, children, defaultValue, setValue }) {
    return (
        <FormControl fullWidth sx={{
            // display: 'flex',
            // alignItems: 'center'
        }}>
            <FormLabel id="demo-customized-radios">{label}</FormLabel>
            <RadioGroup
                value={defaultValue}
                sx={{ display: 'flex', flexDirection: 'row' }}
                onChange={e => setValue(e.target.value)}
            >
                {children}
            </RadioGroup>
        </FormControl>
    );
}