import { TableCell, TextField, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';
import ButtonIcon from '../../../utility_components/ButtonIcon';
import InputNumeric from '../../../utility_components/InputNumeric';

const TD_SE = ({ column, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, isAllow, searchValue, isNumeric }) => {
    const theme = useTheme();
    const colorText = theme.palette.primary.main;

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
                labelToExclude.includes(objKey) ?

                    isNumeric ? <InputNumeric objKey='quantity' defaultValue={column} setData={setEditData} title='quantity' /> :
                        <TextField
                            sx={{ width: isNumeric ? '100px' : '150px' }}
                            size='small'
                            defaultValue={column}
                            onChange={e => setEditData(prev => ({ ...prev, [objKey]: e.target.value }))}
                        /> :
                    // alignItems: center
                    <Typography sx={{ display: 'flex' }}>
                        {column.toLowerCase().includes(searchValue) ? (
                            <span>
                                {column.split(new RegExp(`(${searchValue})`, 'i')).map((part, index) => (
                                    part.toLowerCase() === searchValue ? (
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
                        )}
                    </Typography>
            }

            {hoverLabel === objKey && !labelToExclude.includes(objKey) && (
                <ButtonIcon
                    title={'edit ' + column.toLowerCase()}
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

export default TD_SE
