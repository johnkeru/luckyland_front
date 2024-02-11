import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useSearchStore from '../../hooks/useSearchStore';
import TooltipIcon from '../../utility_components/TooltipIcon';
import { MdClear } from 'react-icons/md';

// SEARCHABLE, EDITABLE lable has ml-2
const TD_SE = ({ column, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, isAllow }) => {
    const { search } = useSearchStore();
    const [hoverLabel, setHoverLabel] = useState('');
    return (
        <td
            className={`relative border-2 ${isAllow && !labelToExclude.includes(objKey) ? 'hover:bg-blue-gray-100' : ''}`} // Add this class for positioning
            onMouseEnter={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel(objKey) : undefined)}
            onMouseLeave={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel('') : undefined)}
        >
            {
                labelToExclude.includes(objKey) ? <input
                    className='shadow appearance-none border rounded w-full py-2 pl-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                    defaultValue={column}
                    onChange={e => setEditData(prev => ({ ...prev, [objKey]: e.target.value }))}
                /> :
                    <span className='ml-2 flex items-center'>
                        {column.toLowerCase().includes(search.toLowerCase()) ? (
                            <span>
                                {column.split(new RegExp(`(${search})`, 'i')).map((part, index) => (
                                    part.toLowerCase() === search.toLowerCase() ? (
                                        <span key={index} className="text-white bg-blue-500">
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
                    </span>
            }
            {hoverLabel === objKey && !labelToExclude.includes(objKey) && (
                <TooltipIcon title={'edit ' + column.toLowerCase()}>
                    <button className={`absolute right-0 top-0.5 cursor-pointer`}
                        onClick={() => {
                            handleEditingState(objKey)
                            setHoverLabel('');
                        }}>
                        <CiEdit className='w-5 h-5' />
                    </button>
                </TooltipIcon>
            )}

            {hoverLabel !== objKey && labelToExclude.includes(objKey) && (
                <TooltipIcon title={'cancel edit'}>
                    <button className={`absolute right-0 top-0.5 cursor-pointer`}
                        onClick={() => tdCancelEdit(objKey)}>
                        <MdClear className='w-5 h-5' />
                    </button>
                </TooltipIcon>
            )}
        </td>
    )
}

export default TD_SE
