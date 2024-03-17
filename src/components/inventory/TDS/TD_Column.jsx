import { TableCell } from '@mui/material'
import React from 'react'

const TD_Column = ({ column, border, py = 0 }) => {
    return (
        <TableCell component="th" sx={{ border: border ? '1px solid #ddd' : undefined, py }}>{column}</TableCell>
    )
}

export default TD_Column