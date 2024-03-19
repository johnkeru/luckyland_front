import { blue, green } from "@mui/material/colors";

export const statusColor = (status) => {
    // Inventory status
    if (status === 'Out of Stock' || status === 'Cancelled') return 'red';
    if (status === 'In Stock') return 'green';
    if (status === 'Low Stock') return 'orange';

    // Employee roles
    if (status === 'Inventory') return 'secondary';
    if (status === 'Front Desk') return 'orange';

    // Delivery status
    if (status === 'Arrived') return 'skyblue';

    // Other statuses
    if (status === 'Pending') return 'orange'; // Pending
    if (status === 'Approved') return blue[400]; // Successful
    if (status === 'Depart') return 'gray'; // Depart
    if (status === 'In Resort') return green[400]; // In Resort

    return 'gray'; // Default color
}
export const roleColor = (status) => {
    if (status === 'Inventory') return 'blue';
    if (status === 'Front Desk') return 'green'
    if (status === 'Read-Only') return 'orange'
    return 'gray'
}

export const empStatusColor = (status) => {
    if (status.toLowerCase() === 'active') {
        return 'success';
    }
    return 'warning';
};

export const deliveryStatusColor = (status) => {
    if (status.toLowerCase() === 'pending') {
        return 'warning';
    } if (status.toLowerCase() === 'cancelled') {
        return 'error';
    }
    return 'info';
}

export const reservationStatusColor = (status) => {
    if (status === 'Pending') {
        return 'warning';
    }
    if (status === 'Cancelled') {
        return 'error';
    }
    if (status === 'Approved') {
        return 'info';
    }
    if (status === 'In Resort') {
        return 'success';
    }

    return 'default';
}