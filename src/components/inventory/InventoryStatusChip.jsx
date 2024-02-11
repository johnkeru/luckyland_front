import { Chip } from '@material-tailwind/react';
import React from 'react';

const getStatusChip = (status) => {
    switch (status.toLowerCase()) {
        case 'in stock':
            return {
                value: 'In Stock',
                color: 'green',
            };
        case 'low stock':
            return {
                value: 'Low Stock',
                color: 'yellow', // You can adjust the color based on your design
            };
        case 'out of stock':
            return {
                value: 'Out of Stock',
                color: 'red',
            };
        default:
            return {
                value: status,
                color: 'blue-gray',
            };
    }
};

const InventoryStatusChip = ({ status }) => {
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

export default InventoryStatusChip;
