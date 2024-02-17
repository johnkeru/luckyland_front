import { TableCell, TextField, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';
import useSearchStore from '../../hooks/useSearchStore';
import ButtonIcon from '../../utility_components/ButtonIcon';

const TD_SE = ({ column, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, isAllow }) => {
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
                labelToExclude.includes(objKey) ? <TextField
                    size='small'
                    defaultValue={column}
                    onChange={e => setEditData(prev => ({ ...prev, [objKey]: e.target.value }))}
                /> :
                    <Typography sx={{ ml: '8px', display: 'flex', alignItems: 'center' }}>
                        {column.toLowerCase().includes(search.toLowerCase()) ? (
                            <span>
                                {column.split(new RegExp(`(${search})`, 'i')).map((part, index) => (
                                    part.toLowerCase() === search.toLowerCase() ? (
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
