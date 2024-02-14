import React from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function TooltipIcon({ children, title = 'title' }) {
    return (
        <Tooltip title={title}>
            {children}
        </Tooltip>
    );
}
