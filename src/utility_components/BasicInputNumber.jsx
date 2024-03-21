import { TextField } from '@mui/material';
import React from 'react'

const BasicInputNumber = ({ defaultValue, sx, onChange, fullWidth = false }) => {
    return (
        <TextField
            sx={sx}
            size='small'
            fullWidth={fullWidth}
            type="number"
            onChange={onChange}
            defaultValue={defaultValue}
            InputProps={{
                inputProps: {
                    type: 'number',
                    pattern: "^-?\\d*$",
                    onKeyDown: (evt) => {
                        const isInvalidKey = !/^[0-9.-]$/.test(evt.key);
                        if (isInvalidKey) {
                            evt.preventDefault();
                        }
                    }
                }
            }}
        />
    )
}

export default BasicInputNumber