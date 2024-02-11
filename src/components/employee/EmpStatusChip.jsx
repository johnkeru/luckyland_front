import { Chip } from '@material-tailwind/react';
import React from 'react';

const getStatusChip = (status) => {
    switch (status.toLowerCase()) {
        case 'active':
            return {
                value: status,
                color: 'green',
            };
        default:
            return {
                value: status,
                color: 'yellow', // You can adjust the color based on your design
            };
    }
};

const EmpStatusChip = ({ status }) => {
    const { value, color } = getStatusChip(status);

    return (
        <Chip
            variant="ghost"
            size="sm"
            className='w-fit ml-2'
            value={value}
            color={color}
        />
    );
};

export default EmpStatusChip;
