import { TableCell } from '@mui/material'
import React from 'react'

const TD_Column = ({ column, border }) => {
    return (
        <TableCell component="th" sx={{ border: border ? '1px solid #ddd' : undefined }}>{column}</TableCell>
    )
}

export default TD_Column