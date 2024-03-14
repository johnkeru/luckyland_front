import { TableCell } from '@mui/material'
import React from 'react'

const TD_Conditional = ({ contionsValue, leftValue = 'Products', rightValue = 'Product', border }) => {
    return (
        <TableCell
            sx={{ borderLeft: border ? '1px solid #ddd' : undefined }}
        >
            {contionsValue} {' '}
            {contionsValue > 1 ? leftValue : rightValue}
        </TableCell>
    )
}

export default TD_Conditional