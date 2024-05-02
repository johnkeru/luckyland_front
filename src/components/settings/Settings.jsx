import { Box } from '@mui/material';
import React from 'react';
import CloseOpen from './CloseOpen';
import FAQsSetting from './FAQsSetting';

const Settings = () => {

    return (
        <Box>
            {/* Section: Resort Status */}
            <CloseOpen />

            {/* Section: FAQ Settings */}
            <FAQsSetting />

            {/* Add more sections as needed */}
        </Box>
    );
}

export default Settings;
