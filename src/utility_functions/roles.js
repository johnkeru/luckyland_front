export const isAdmin = (roles) => {
    return roles.find(role => role.roleName === 'Admin');
}

export const isInventory = (roles) => {
    return roles.find(role => role.roleName === 'Inventory');
}

export const isFrontDesk = (roles) => {
    return roles.find(role => role.roleName === 'Front Desk');
}