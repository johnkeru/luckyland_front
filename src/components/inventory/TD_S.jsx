import React from 'react';
import useSearchStore from '../../hooks/useSearchStore';

const TD_S = ({ column, className }) => {
    const { search } = useSearchStore();

    return (
        <td className={'flex items-center ' + className}>
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
        </td>
    )
}

export default TD_S
