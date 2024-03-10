import { TableCell, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';

const TD_Searchable = ({ column, border, searchValue }) => {

    return (
        <TableCell sx={border ? { border: '1px solid #ddd' } : undefined}>
            <Typography sx={{ ml: '8px', display: 'flex', alignItems: 'center' }}>
                {column.toLowerCase().includes(searchValue) ? (
                    <span>
                        {column.split(new RegExp(`(${searchValue})`, 'i')).map((part, index) => (
                            part.toLowerCase() === searchValue ? (
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
                )}
            </Typography>
        </TableCell>
    )
}

export default TD_Searchable
