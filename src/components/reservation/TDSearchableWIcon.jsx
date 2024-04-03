import { Box, TableCell, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

const TDSearchableWIcon = ({ icon, column, searchValue, column2, icon2 }) => {
    return (<TableCell>
        {column ? <Box display='flex' alignItems='center' gap={1}>
            {icon}

            <Typography sx={{ ml: '8px', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
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
        </Box> : undefined}

        {column2 ? <Box display='flex' alignItems='center' gap={1}>
            {icon2}

            <Typography sx={{ ml: '8px', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                {column2.toLowerCase().includes(searchValue) ? (
                    <span>
                        {column2.split(new RegExp(`(${searchValue})`, 'i')).map((part, index) => (
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
                    column2
                )}
            </Typography>
        </Box> : undefined}
    </TableCell>
    )
}

export default TDSearchableWIcon