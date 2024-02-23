export const displayRolesAsText = (roles) => {
    if (roles.some(role => role.roleName.toLowerCase() === 'admin')) {
        return 'Admin';
    }

    let text = '';
    const modifiedRoles = roles.map((role, i) => ({
        roleName: role.roleName,
        suffix: roles.length - 2 === i ? ' and ' : roles.length - 1 === i ? ' ' : ', '
    }));
    modifiedRoles.forEach(role => text += role.roleName + role.suffix);
    return text;
}
