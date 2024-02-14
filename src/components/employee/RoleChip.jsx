import React from 'react';
import { Chip } from '@mui/material';

const RoleChip = ({ role }) => {
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
            label={role}
            variant="filled"
            color={getColor(role)}
            key={role}
        />
    );
};

export default RoleChip;
