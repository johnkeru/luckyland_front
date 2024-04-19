import { useTheme } from '@emotion/react';
import { TableCell, Typography } from '@mui/material';
import React from 'react';
import useSearchStore from '../../hooks/useSearchStore';

const TDEmployee = ({ column }) => {

    const { searchEmployee } = useSearchStore();

    const theme = useTheme();
    const colorText = theme.palette.primary.main;

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
                                    <span key={index} style={{ background: colorText, color: 'white' }}>
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


