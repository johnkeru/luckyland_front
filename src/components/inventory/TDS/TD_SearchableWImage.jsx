import { Box, TableCell, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { NO_IMAGE, resizeInventoryPic } from '../../../utility_functions/cloudinaryUrl';

const TD_SearchableWImage = ({ column, border, image, searchValue }) => {

    return (
        <TableCell sx={border ? { border: '1px solid #ddd' } : undefined}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={image ? resizeInventoryPic(image, 50, 35, 'c_thumb') : resizeInventoryPic(NO_IMAGE, 50, 35, 'c_thumb')} style={{ marginRight: '10px' }} />

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
            </Box>
        </TableCell>
    )
}

export default TD_SearchableWImage
