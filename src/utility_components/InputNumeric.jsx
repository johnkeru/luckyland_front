import { TextField } from '@mui/material';
import React from 'react'

const InputNumeric = ({ defaultValue, setData, objKey, title }) => {
    return (
        <TextField
            sx={{ width: '70px', }}
            size='small'
            type="number"
            defaultValue={defaultValue}
            onChange={(e) => setData(prev => ({ ...prev, [objKey]: parseInt(e.target.value) || 0 }))}
            title={title}
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

export default InputNumeric