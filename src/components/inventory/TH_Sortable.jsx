import { Box, IconButton, TableCell } from '@mui/material'
import { LuChevronsUpDown, LuChevronDown, LuChevronUp } from "react-icons/lu";
import React, { useState } from 'react'
import { grey } from '@mui/material/colors';

const TH_Sortable = ({ handleToggle, label, query }) => {
    const [order, setOrder] = useState('');

    const handleSort = () => {
        if (order === '') {
            handleToggle(`${query}=asc&`);
            setOrder('asc');
        } else if (order === 'asc') {
            handleToggle(`${query}=desc&`);
            setOrder('desc');
        } else {
            handleToggle(`${query}=&`);
            setOrder('');
        }
    }



    return (
        <TableCell sx={{
            py: 2,
            cursor: 'pointer',
            bgcolor: order ? grey[100] : undefined,
            fontWeight: 600,
        }} onClick={handleSort}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }}>
                {label}
                <IconButton size='small'>
                    {
                        order === 'asc' ? <LuChevronUp /> : order === 'desc' ? <LuChevronDown /> : <LuChevronsUpDown color={grey[400]} />
                    }
                </IconButton>
            </Box>

        </TableCell>
    )
}

export default TH_Sortable