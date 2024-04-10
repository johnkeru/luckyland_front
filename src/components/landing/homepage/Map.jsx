import React from 'react';
import { Box, Typography } from '@mui/material';

const Map = () => {
    return (
        <Box >
            <Box sx={{ textAlign: 'center', mb: 7 }}>
                <Typography variant="h3" mt={3} pb={2} >We're Located At</Typography>
                <Typography>Gabao, San Roque Bacon District Sorsogon City</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <iframe
                    src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=luckyland%20resort+(Title)&amp;ie=UTF8&amp;t=h&amp;z=20&amp;iwloc=B&amp;output=embed"
                    width="600"
                    height="400"
                    style={{ border: '0', width: '100%' }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                ></iframe>
            </Box>
        </Box>
    );
};

export default Map;
