export const displayRolesAsText = (roles) => {
    let text = '';
    const modifiedRoles = roles.map((role, i) => ({
        roleName: role.roleName,
        suffix: roles.length - 2 === i ? ' and ' : roles.length - 1 === i ? ' ' : ', '
    }));
    modifiedRoles.forEach(role => text += role.roleName + role.suffix);
    return text;
}