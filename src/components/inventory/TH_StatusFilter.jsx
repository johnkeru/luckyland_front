import { FunnelIcon } from '@heroicons/react/24/solid';
import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { GoDotFill } from 'react-icons/go';

const TH_StatusFilter = ({ statusColor, label, handleToggle, options, query = 'status', hasData }) => {
    const [selected, setSelected] = useState('');

    const handleOptionClick = (option) => {
        setSelected(option);
        handleToggle(`${query}=${option === 'All' ? '' : option}&`)
        // Perform any additional actions based on the selected option
    };

    // optional Design only

    return (
        <>
            <Menu placement="right-start" allowHover >
                <MenuHandler>
                    <th
                        className={`${hasData ? 'cursor-pointer' : undefined} border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50`}
                    >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                            {label}{" "}
                            {hasData ? <FunnelIcon strokeWidth={2} className={`h-5 w-5 ${statusColor(selected)}`} title={'filter ' + label.toLowerCase()} /> : undefined}
                        </Typography>
                    </th>
                </MenuHandler>
                {hasData ? <MenuList className='shadow-inner border-2'>
                    {options.map((option, i) => (
                        <MenuItem
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className={`font-normal cursor-pointer mb-1 hover:bg-gray-100 flex items-center ${selected === option ? 'bg-gray-200' : ''}`}
                        >
                            <GoDotFill strokeWidth={2} className={`h-5 w-5 text-lg mr-2 ${statusColor(option === 'All' ? '' : option)}`} />
                            {option}
                        </MenuItem>
                    ))}
                </MenuList> : undefined}
            </Menu>

        </>
    );
};

export default TH_StatusFilter;




// {/* <th
//     className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
//     onMouseEnter={handleMouseEnter}
//     onMouseLeave={handleMouseLeave}
// >
//     <Typography
//         variant="small"
//         color="blue-gray"
//         className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
//     >
//         {label}{" "}
//     </Typography>
//     {isOptionsVisible && (
//         <div className="absolute top-0 -right-12 bg-white border border-gray-300 mt-1 rounded shadow z-10">
//             {/* arrow */}
//             <div className={`absolute -left-[7px] top-3 p-[5px] ${hoverFirst ? 'bg-gray-100' : selected === options[0] ? 'bg-gray-200' : 'bg-white'} border-b-2 border-l-2 rotate-45 rounded-tr-xl`} />

//             {options.map((option, i) => (
//                 <p
//                     key={option}
//                     onMouseEnter={() => i === 0 ? setHoverFirst(true) : undefined}
//                     onMouseLeave={() => i === 0 ? setHoverFirst(false) : undefined}
//                     onClick={() => handleOptionClick(option)}
//                     className={`font-normal cursor-pointer hover:bg-gray-100 px-3 py-2.5 flex items-center ${selected === option ? 'bg-gray-200' : ''}`}
//                 >
//                     <GoDotFill strokeWidth={2} className={`h-5 w-5 text-lg ${statusColor(option === 'All' ? '' : option)}`} />
//                     {option}
//                 </p>
//             ))}
//         </div>
//     )}
// </th> */}
