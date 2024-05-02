import { Avatar } from '@mui/material';
import React from 'react'


function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

const AvatarColor = ({ text = '' }) => {
    return (
        <Avatar sx={{ bgcolor: stringToColor(text) }}>{text.substring(0, 1).toUpperCase()}</Avatar>
    )
}

export default AvatarColor
