import { TableCell, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';

const TD_Searchable = ({ id = '', column, border, searchValue }) => {

    return (
        <TableCell id={id} sx={border ? { border: '1px solid #ddd' } : undefined}>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
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
