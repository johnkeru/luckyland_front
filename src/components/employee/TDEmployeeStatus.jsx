import { Chip } from '@mui/material';
import React from 'react';

const getStatusChip = (status) => {
    switch (status.toLowerCase()) {
        case 'active':
            return {
                value: status,
                color: 'success',
            };
        default:
            return {
                value: status,
                color: 'warning',
            };
    }
};

const TDEmployeeStatus = ({ status }) => {
    const { value, color } = getStatusChip(status);

    return (
        <Chip label={value} variant="outlined" color={color} size='small' />
    );
};

export default TDEmployeeStatus;
