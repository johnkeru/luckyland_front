import React from 'react';
import { Chip } from '@material-tailwind/react';

const getRoleChip = (roleName) => {
    switch (roleName.toLowerCase()) {
        case 'admin':
            return {
                value: 'Admin',
                color: 'red',
            };
        case 'inventory':
            return {
                value: 'Inventory',
                color: 'blue',
            };
        case 'front desk':
            return {
                value: 'Front Desk',
                color: 'green',
            };
        default:
            return {
                value: roleName,
                color: 'blue-gray',
            };
    }
};

const RoleChip = ({ roleName }) => {
    const { value, color } = getRoleChip(roleName);

    return (
        <Chip
            variant="ghost"
            size="sm"
            className='w-fit py-2.5'
            value={value}
            color={color}
        />
    );
};

export default RoleChip;
