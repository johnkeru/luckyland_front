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

export default function FilterByMonth({ handleToggle }) {
    // useTheme is used to determine the dark or light mode of the docs to maintain the Autocomplete component default styles.
    const outerTheme = useTheme();

    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            <Stack spacing={5} sx={{ width: 250 }}>
                <MonthSelect handleToggle={handleToggle} />
            </Stack>
        </ThemeProvider>
    );
}

function MonthSelect({ handleToggle }) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleMonthChange = (event, value) => {
        handleToggle(`month=${value}&`);
    };

    return (
        <Autocomplete
            size='small'
            id="month-customized-option-demo"
            onChange={handleMonthChange}
            options={months}
            renderInput={(params) => <TextField {...params} label="Filter by month" />}
        />
    );
}
