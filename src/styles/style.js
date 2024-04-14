import { createTheme, responsiveFontSizes } from '@mui/material';
import {
    grey,
    orange, // primary
    pink,
    lightGreen, // secondary
    green,
    deepOrange, // error
    yellow, // warning
} from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            lighter: orange[100],
            light: orange[300],
            main: orange[500],
            dark: orange[700],
            contrastText: '#fff',
        },
        secondary: {
            light: lightGreen[300],
            main: lightGreen[500],
            dark: lightGreen[700],
            contrastText: '#000',
        },
        success: {
            light: green[300],
            main: green[500],
            dark: green[700],
            contrastText: '#fff',
        },
        error: {
            light: deepOrange[300],
            main: deepOrange[500],
            dark: deepOrange[700],
            contrastText: '#fff',
        },
        warning: {
            light: yellow[300],
            main: yellow[500],
            dark: yellow[700],
            contrastText: '#000',
        },
        custom: {
            white: 'white',
            light: grey[300],
            main: grey[500],
            dark: grey[700],
            contrastText: '#000',
        },
        // Additional color overrides
        text: {
            primary: '#4d4d4d', // Change primary text color
            secondary: '#666', // Change secondary text color
        },
        background: {
            white: '#fff', // Change default background color
            paper: grey[50], // Change paper background color
            paper2: grey[200], // Change paper background color
        },
        // Add more color overrides as needed
    },
    typography: {
        fontFamily: 'cursive', // Set default font family to 'cursive'
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff', // Set background color to white
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    backgroundColor: '#fff', // Set background color to white
                },
            },
        },
    },
});

export default responsiveFontSizes(theme);
