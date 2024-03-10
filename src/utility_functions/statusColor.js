export const statusColor = (status) => {
    // this one is for inventory's status
    if (status === 'Out of Stock' || status === 'Cancelled') return 'red';
    if (status === 'In Stock') return 'green'
    if (status === 'Low Stock') return 'orange'
    // this one is for employee's roles
    if (status === 'Inventory') return 'secondary'
    if (status === 'Front Desk') return 'orange'
    // for delivery status
    if (status === 'Arrived') return 'skyblue'
    if (status === 'Pending') return 'orange'
    return 'gray'
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