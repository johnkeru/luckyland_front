import { InputAdornment, TextField, FormHelperText } from '@mui/material';
import React from 'react';

const BasicInputNumber = ({ defaultValue, value, sx, onChange, fullWidth = false, Icon, error }) => {
    return (
        <div>
            <TextField
                sx={sx}
                size='small'
                fullWidth={fullWidth}
                type="number"
                onChange={onChange}
                value={value}
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
                    },
                    startAdornment: !Icon ? undefined : (
                        <InputAdornment position="start">
                            <Icon />
                        </InputAdornment>
                    ),
                }}
                error={!!error} // Set error prop to true if error is present
            />
            {error && (
                <FormHelperText error>
                    {error}
                </FormHelperText>
            )}
        </div>
    );
};

export default BasicInputNumber;
