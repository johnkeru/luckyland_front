import { Avatar } from '@material-tailwind/react'
import React from 'react'
import { NO_USER_IMAGE } from '../../utility_functions/cloudinaryUrl'
import useSearchStore from '../../hooks/useSearchStore';

const TD_S_EmpName = ({ emp }) => {
  const { searchEmployee } = useSearchStore();
  return (
    <td className='py-2 flex gap-1 items-center'>
      <div className="flex items-center pl-2">
        <Avatar src={emp.image || NO_USER_IMAGE} />

        <div className="ml-2.5">
          <div className="font-medium text-gray-900 flex gap-1 items-center">

            <span className='flex items-center'>
              {emp.firstName.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                <span>
                  {emp.firstName.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
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
                emp.firstName
              )}
            </span>

            {emp.middleName && <span className='flex items-center'>
              {emp.middleName.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                <span>
                  {emp.middleName.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
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
                emp.middleName
              )}
            </span>}

            <span className='flex items-center'>
              {emp.lastName.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                <span>
                  {emp.lastName.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
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
                emp.lastName
              )}
            </span>

          </div>
          <div className="text-sm text-gray-600">
            <span className='flex items-center'>
              {emp.email.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                <span>
                  {emp.email.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
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
                emp.email
              )}
            </span>
          </div>
        </div>

      </div>
    </td>
  )
}

export default TD_S_EmpName