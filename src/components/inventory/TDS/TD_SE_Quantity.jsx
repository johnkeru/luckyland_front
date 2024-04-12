import { Grid, TableCell, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';
import useSearchStore from '../../../hooks/useSearchStore';
import ButtonIcon from '../../../utility_components/ButtonIcon';
import InputNumeric from '../../../utility_components/InputNumeric';

const TD_SE_Quantity = ({ data, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, isAllow }) => {
    const theme = useTheme();
    const colorText = theme.palette.primary.main;

    const { search } = useSearchStore();
    const [hoverLabel, setHoverLabel] = useState('');

    return (
        <TableCell
            sx={{
                position: 'relative',
                '&:hover': {
                    backgroundColor: isAllow && !labelToExclude.includes(objKey) ? grey['300'] : 'transparent',
                },
            }}

            onMouseEnter={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel(objKey) : undefined)}
            onMouseLeave={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel('') : undefined)}
        >
            {
                labelToExclude.includes(objKey) ? <Grid display='flex' alignItems='center' fontSize='1.5rem'>
                    <InputNumeric objKey={objKey} defaultValue={data.currentQuantity} setData={setEditData} title='current quantity' />
                    /
                    <InputNumeric objKey='maxQuantity' defaultValue={data.maxQuantity} setData={setEditData} title='max quantity' />
                </Grid>
                    :
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
            }

            {hoverLabel === objKey && !labelToExclude.includes(objKey) && (
                <ButtonIcon
                    title={'edit quantity'}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={() => {
                        handleEditingState(objKey)
                        setHoverLabel('');
                    }}>
                    <CiEdit />
                </ButtonIcon>
            )}

            {hoverLabel !== objKey && labelToExclude.includes(objKey) && (
                <ButtonIcon
                    title={'cancel edit'}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={() => tdCancelEdit(objKey)}>
                    <MdClear />
                </ButtonIcon>
            )}
        </TableCell>
    )
}

export default TD_SE_Quantity

