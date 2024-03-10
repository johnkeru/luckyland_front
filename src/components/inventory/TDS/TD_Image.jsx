import { TableCell } from '@mui/material'
import React from 'react'
import { NO_IMAGE, resizeInventoryPic } from '../../../utility_functions/cloudinaryUrl'

const TD_Image = ({ image }) => {
    return (
        <TableCell>
            <img src={resizeInventoryPic(image || NO_IMAGE, 50, 35, 'c_thumb')} style={{ margin: 'auto' }} />
        </TableCell>
    )
}

export default TD_Image