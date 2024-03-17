import { Chip, TableCell } from '@mui/material'
import React from 'react'
import { deliveryStatusColor } from '../../../utility_functions/statusColor'

const TD_Chips = ({ column, border, size = 'small' }) => {
    return (
        <TableCell
            sx={{ border: border ? '1px solid #ddd' : undefined }}>
            <Chip
                label={column}
                variant="filled"
                color={deliveryStatusColor(column)}
                size={size} />
        </TableCell>
    )
}

export default TD_Chips