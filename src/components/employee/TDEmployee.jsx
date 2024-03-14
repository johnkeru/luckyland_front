import React from 'react'
import useSearchStore from '../../hooks/useSearchStore';
import { TableCell, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const TDEmployee = ({ column }) => {
    const { searchEmployee } = useSearchStore();

    return (
        <TableCell
            sx={{
                position: 'relative',
            }}
        >
            <Typography display='flex' alignItems='center' >
                {
                    column.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                        <span>
                            {column.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
                                part.toLowerCase() === searchEmployee.toLowerCase() ? (
                                    <span key={index} style={{ background: blue[500], color: 'white' }}>
                                        {part}
                                    </span>
                                ) : (
                                    <span key={index}>{part}</span>
                                )
                            ))}
                        </span>
                    ) : (
                        column
                    )
                }
            </Typography >
        </TableCell>
    )
}

export default TDEmployee


