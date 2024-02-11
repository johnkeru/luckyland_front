export const statusColor = (status) => {
    if (status === 'Out of Stock') return 'text-red-500';
    if (status === 'In Stock') return 'text-green-500'
    if (status === 'Low Stock') return 'text-orange-500'
    return 'text-gray-500'
}

export const roleColor = (status) => {
    if (status === 'Inventory') return 'text-blue-500';
    if (status === 'Front Desk') return 'text-green-500'
    if (status === 'Read-Only') return 'text-orange-500'
    return 'text-gray-500'
}