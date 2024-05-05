import React from 'react';
import { Chip } from '@mui/material';

const RoleChip = ({ role, sx, size = 'medium' }) => {
    const getColor = (role) => {
        switch (role) {
            case 'Admin':
                return 'success';
            case 'Inventory':
                return 'secondary';
            case 'Front Desk':
                return 'warning';
            case 'House Keeping':
                return 'info';
            case 'Friends/Couples':
                return 'secondary';
            case 'Family':
                return 'info';
            case 'Big Cottages':
                return 'warning';
            case 'Small Cottages':
                return 'success'
            default:
                return 'default';
        }
    };

    return (
        <Chip
            sx={sx}
            label={role}
            variant="filled"
            color={getColor(role)}
            size={size}
            key={role}
        />
    );
};

export default RoleChip;
