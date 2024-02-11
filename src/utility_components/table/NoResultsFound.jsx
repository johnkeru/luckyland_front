import React from 'react'

const NoResultsFound = ({ title }) => {
    return (
        <tr>

            <td className='p-4 text-gray-500 font-medium'>No {title} found.</td>

        </tr>
    )
}

export default NoResultsFound