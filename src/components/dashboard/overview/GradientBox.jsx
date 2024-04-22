import { Box } from '@mui/material';
import React from 'react'

const GradientBox = ({ children, color1, color2 }) => (
    <Box
        sx={{
            width: '100%',
            color: 'white',
            backgroundImage: `linear-gradient(135deg, ${color1}, ${color2})`,
            borderRadius: 1,
            padding: 1,
        }}
    >
        {children}
    </Box>
);


export default GradientBox