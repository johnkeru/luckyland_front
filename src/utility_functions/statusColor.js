export const statusColor = (status) => {
    if (status === 'Out of Stock') return 'red';
    if (status === 'In Stock') return 'green'
    if (status === 'Low Stock') return 'orange'
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