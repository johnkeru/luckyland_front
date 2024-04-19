import { Box, IconButton, TableCell } from '@mui/material';
import React, { useState } from 'react';
import { LuChevronDown, LuChevronUp, LuChevronsUpDown } from "react-icons/lu";

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
            bgcolor: order ? 'background.paper2' : undefined,
            ":hover": {
                bgcolor: 'background.paper2'
            },
            fontWeight: 600,
        }}
            onClick={handleSort}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }}>
                {label}
                <IconButton size='small'>
                    {
                        order === 'asc' ? <LuChevronUp /> : order === 'desc' ? <LuChevronDown /> : <LuChevronsUpDown />
                    }
                </IconButton>
            </Box>

        </TableCell>
    )
}

export default TH_Sortable