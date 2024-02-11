import React from 'react'
import useSearchStore from '../../hooks/useSearchStore';

const TD_S_Phone_JobTitle = ({ column }) => {
    const { searchEmployee } = useSearchStore();

    return (
        <td className='whitespace-nowrap text-gray-600 border border-gray-300'>
            <span className='flex items-center pl-2' >
                {
                    column.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                        <span>
                            {column.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
                                part.toLowerCase() === searchEmployee.toLowerCase() ? (
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
                    )
                }
            </span >
        </td>
    )
}

export default TD_S_Phone_JobTitle


