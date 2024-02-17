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
            case 'Read-Only':
                return 'info';
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
