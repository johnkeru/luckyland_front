import { TableCell, Typography, useTheme } from '@mui/material';
import React from 'react';
import useSearchStore from '../../../hooks/useSearchStore';

const TD_Searchable_Quantity = ({ data }) => {
    const theme = useTheme();
    const colorText = theme.palette.primary.main;
    const { search } = useSearchStore();

    return (
        <TableCell>

            <Typography display='flex'>
                {`${data.currentQuantity}/${data.maxQuantity}`.split('/').map((part, index) => (
                    index === 0 && search ? (
                        <span key={index}>
                            {part.split(new RegExp(`(${search})`, 'i')).map((subPart, subIndex) => (
                                subPart.toLowerCase() === search.toLowerCase() ? (
                                    <span key={subIndex} style={{ background: colorText, color: 'white' }}>
                                        {subPart}
                                    </span>
                                ) : (
                                    <span key={subIndex}>{subPart}</span>
                                )
                            ))}
                        </span>
                    ) : (
                        <span key={index}>{index === 0 ? part : `/${part}`}</span>
                    )
                ))}
            </Typography>
        </TableCell>
    )
}

export default TD_Searchable_Quantity

