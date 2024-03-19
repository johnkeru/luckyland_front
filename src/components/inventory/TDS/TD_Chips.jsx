import { Chip, TableCell } from '@mui/material'
import React from 'react'
import { reservationStatusColor } from '../../../utility_functions/statusColor'

const TD_Chips = ({ column, border, size = 'small' }) => {
    return (
        <TableCell
            sx={{ border: border ? '1px solid #ddd' : undefined }}>
            <Chip
                label={column}
                variant="filled"
                color={reservationStatusColor(column)}
                size={size} />
        </TableCell>
    )
}

export default TD_Chips