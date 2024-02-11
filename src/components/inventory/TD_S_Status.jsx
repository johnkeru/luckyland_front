import React from 'react';
import InventoryStatusChip from './InventoryStatusChip';

const TD_S_Status = ({ column }) => {

    return (
        <td>
            <InventoryStatusChip status={column} />
        </td>
    )
}

export default TD_S_Status




// {
//     column.toLowerCase().includes(search.toLowerCase()) ? (
//         <span>
//             {column.split(new RegExp(`(${search})`, 'i')).map((part, index) => (
//                 part.toLowerCase() === search.toLowerCase() ? (
//                     <span key={index} className="text-white bg-blue-500">
//                         {part}
//                     </span>
//                 ) : (
//                     <span key={index}>{part}</span>
//                 )
//             ))}
//         </span>
//     ) : (
//     column
// )
// }