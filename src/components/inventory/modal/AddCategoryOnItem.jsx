import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import useCategories from '../../../hooks/inventory/useCategories';
import { Checkbox, FormHelperText, ListItemText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function AddCategoryOnItem({
    sx,
    categoryName,
    setCategoryName,
    error,
    setCategoryChange
}) {

    const handleChange = (event) => {
        const { target: { value }, } = event;
        setCategoryName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setCategoryChange ? setCategoryChange(true) : undefined;
    };
    const { categories } = useCategories();

    return (
        <div>
            <FormControl fullWidth error={!!error} sx={sx}>
                <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={categoryName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {categories.map((category) => (
                        <MenuItem
                            key={category.name}
                            value={category.name}
                        >
                            <Checkbox checked={categoryName.indexOf(category.name) > -1} />
                            <ListItemText primary={category.name} />
                        </MenuItem>
                    ))}
                </Select>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </div>
    );
}
