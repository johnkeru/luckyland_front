import { Box, TableCell } from '@mui/material'
import React from 'react'
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";


const TD_Blank = ({ border, withChevron = false, isUp }) => {

    return (
        <TableCell sx={{ border: border ? '1px solid #ddd' : undefined }}>
            <Box textAlign='right'>
                {withChevron ? <>
                    {
                        isUp ? <IoChevronDownSharp /> : <IoChevronUpSharp />
                    }
                </> : ''}
            </Box>
        </TableCell>
    )
}

export default TD_Blank