import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useSearchStore from '../../hooks/useSearchStore';
import InputNumeric from '../../utility_components/InputNumeric';
import TooltipIcon from '../../utility_components/TooltipIcon';
import { MdClear } from 'react-icons/md';

const TD_SE_Quantity = ({ data, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, isAllow }) => {
    const { search } = useSearchStore();
    const [hoverLabel, setHoverLabel] = useState('');

    return (
        <td
            className={`relative border-2 ${isAllow && !labelToExclude.includes(objKey) ? 'hover:bg-blue-gray-100' : ''}`} // Add this class for positioning
            onMouseEnter={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel(objKey) : undefined)}
            onMouseLeave={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel('') : undefined)}
        >
            {
                labelToExclude.includes(objKey) ? <span>
                    <InputNumeric objKey={objKey} defaultValue={data.currentQuantity} setData={setEditData} title='current quantity' />
                    /
                    <InputNumeric objKey='maxQuantity' defaultValue={data.maxQuantity} setData={setEditData} title='max quantity' />
                </span>
                    :
                    <span className='ml-2 '>
                        {`${data.currentQuantity}/${data.maxQuantity}`.split('/').map((part, index) => (
                            index === 0 && search ? (
                                <span key={index}>
                                    {part.split(new RegExp(`(${search})`, 'i')).map((subPart, subIndex) => (
                                        subPart.toLowerCase() === search.toLowerCase() ? (
                                            <span key={subIndex} className="text-white bg-blue-500">
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
                    </span>
            }
            {hoverLabel === objKey && !labelToExclude.includes(objKey) && (
                <TooltipIcon title={'edit quantity'}>
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

export default TD_SE_Quantity

