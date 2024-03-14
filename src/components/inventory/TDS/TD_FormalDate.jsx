import { TableCell } from '@mui/material'
import React from 'react'
import { formalFormatDateToMonth } from '../../../utility_functions/formatTime'

const TD_FormalDate = ({ column, border }) => {
    return (
        <TableCell sx={{ border: border ? '1px solid #ddd' : undefined }}>
            {column ? formalFormatDateToMonth(column) : undefined}
        </TableCell>
    )
}

export default TD_FormalDate