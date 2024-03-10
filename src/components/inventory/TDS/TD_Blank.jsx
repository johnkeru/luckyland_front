import { TableCell } from '@mui/material'
import React from 'react'

const TD_Blank = ({ border }) => {
    return (
        <TableCell sx={{ border: border ? '1px solid #ddd' : undefined }}></TableCell>
    )
}

export default TD_Blank