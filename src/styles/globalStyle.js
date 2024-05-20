import { createTheme, responsiveFontSizes, } from '@mui/material';
import { grey, orange, lightGreen, green, deepOrange, yellow } from '@mui/material/colors';

export const primaryLightColors = {
    primary50: orange[50],
    primary100: orange[100],
    primary200: orange[200],
    contrastText: grey[700],
}
export const primaryDarkColors = {
    primary50: orange[800],
    primary100: orange[900],
    primary200: orange[200],
    contrastText: '#fff',
}

export const primary = {
    light: orange[300],
    main: orange[500],
    dark: orange[700],
    contrastText: '#fff',
}

// Create a base theme for the dashboard
const dashboardTheme = createTheme({
    palette: {
        primary,
        secondary: {
            light: lightGreen[300],
            main: lightGreen[500],
            dark: lightGreen[700],
            contrastText: '#000',
        },
        success: {
            light: green[300],
            main: green[600],
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
        text: {
            primary: '#4d4d4d', // Change primary text color
            secondary: '#666', // Change secondary text color
        },
        background: {
            white: '#fff', // Change default background color
            paper: '#fff', // Change paper background color
            paper2: grey[200], // Change paper background color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Set default font family to 'Roboto' or any preferred sans-serif font
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

// Make the dashboard theme responsive
const theme = responsiveFontSizes(dashboardTheme);

export default theme;