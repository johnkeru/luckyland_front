import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from 'react';


const StatusToggle = ({ status, handleChange, isEdit }) => {
    return (
        <FormControl component="fieldset" size='small'>
            <RadioGroup
                row
                aria-label="status"
                name="status"
                value={status}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="Arrived"
                    control={<Radio size='small' sx={{
                        color: '#1976D2', // Blue color
                        '&.Mui-checked': {
                            color: '#1565C0', // Darker shade of blue for checked state
                        },
                    }} />}
                    label="Arrived"
                />
                <FormControlLabel
                    value="Pending"
                    control={<Radio size='small' sx={{
                        color: '#FF9800', // Orange color
                        '&.Mui-checked': {
                            color: '#EF6C00', // Darker shade of orange for checked state
                        },
                    }} />}
                    label="Pending"
                />
                {isEdit ? <FormControlLabel
                    value="Cancelled"
                    control={<Radio size='small' sx={{
                        color: '#ee0000', // Orange color
                        '&.Mui-checked': {
                            color: '#ee0000', // Darker shade of orange for checked state
                        },
                    }} />}
                    label="Cancelled"
                /> : undefined}
            </RadioGroup>
        </FormControl>
    )
}

export default StatusToggle