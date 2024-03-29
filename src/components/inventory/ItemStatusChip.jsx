
import { Chip } from '@mui/material';
import React from 'react';

const getStatusChip = (status) => {
    switch (status.toLowerCase()) {
        case 'in stock':
            return {
                value: 'In Stock',
                color: 'success',
            };
        case 'low stock':
            return {
                value: 'Low Stock',
                color: 'warning', // You can adjust the color based on your design
            };
        case 'out of stock':
            return {
                value: 'Out of Stock',
                color: 'error',
            };
        default:
            return {
                value: status,
                color: 'default',
            };
    }
};

const ItemStatusChip = ({ status, size = 'small' }) => {
    const { value, color } = getStatusChip(status);

    return (
        <Chip label={value} color={color} size={size} />
    );
};

export default ItemStatusChip;
