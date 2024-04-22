import { TableCell } from '@mui/material';
import React from 'react';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

const TD_Blank = ({ border, withChevron = false, isUp }) => {

    return (
        <TableCell sx={{ border: border ? '1px solid #ddd' : undefined }}>
            {withChevron ? <>
                {
                    isUp ? <FaChevronDown /> : <FaChevronUp />
                }
            </> : ''}
        </TableCell>
    )
}

export default TD_Blank