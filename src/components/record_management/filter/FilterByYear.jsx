import * as React from 'react';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';

// Theme.ts
const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiAutocomplete: {
                defaultProps: {
                    renderOption: (props, option, state, ownerState) => (
                        <Box
                            sx={{
                                borderRadius: '8px',
                                margin: '5px',
                                [`&.${autocompleteClasses.option}`]: {
                                    padding: '8px',
                                },
                            }}
                            component="li"
                            {...props}
                        >
                            {ownerState.getOptionLabel(option)}
                        </Box>
                    ),
                },
            },
        },
    });

export default function FilterByYear({ handleToggle }) {
    // useTheme is used to determine the dark or light mode of the docs to maintain the Autocomplete component default styles.
    const outerTheme = useTheme();

    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            <Stack spacing={5} sx={{ width: 250 }}>
                <YearSelect handleToggle={handleToggle} />
            </Stack>
        </ThemeProvider>
    );
}

function YearSelect({ handleToggle }) {
    // Generate year options starting from 2023
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = 2023; year <= currentYear; year++) {
        years.push(year.toString());
    }
    const [localValue, setLocalValue] = React.useState('');
    const handleYearChange = (event, value) => {
        handleToggle(`year=${value}&`);
        setLocalValue(value);
    }
    const handleClear = () => {
        handleToggle('year=&')
        setLocalValue('');
    }

    return (
        <Autocomplete
            size='small'
            id="year-customized-option-demo"
            onChange={handleYearChange}
            options={years}
            onInputChange={() => localValue ? handleClear() : undefined}
            renderInput={(params) => <TextField {...params} label="Filter by year" />}
        />
    );
}
