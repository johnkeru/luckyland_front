import { TableCell, TextField, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';
import useSearchStore from '../../../hooks/useSearchStore';
import ButtonIcon from '../../../utility_components/ButtonIcon';
import InputNumeric from '../../../utility_components/InputNumeric';

const TD_SE = ({ column, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, isAllow, searchValue, isNumeric }) => {
    const { search } = useSearchStore();
    const searchVal = searchValue || search;
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
                    <Typography sx={{ ml: '8px', display: 'flex', alignItems: 'center' }}>
                        {column.toLowerCase().includes(searchVal) ? (
                            <span>
                                {column.split(new RegExp(`(${searchVal})`, 'i')).map((part, index) => (
                                    part.toLowerCase() === searchVal ? (
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
