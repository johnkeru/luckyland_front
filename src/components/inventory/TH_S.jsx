import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const TH_S = ({ label, handleToggle, query, hasData }) => {

    const [toggle, setToggle] = useState('none'); // none | up | down

    const handleClick = () => {
        if (toggle === 'none') {
            setToggle('up');
            handleToggle(`${query}=asc&`);
        } else if (toggle === 'up') {
            setToggle('down');
            handleToggle(`${query}=desc&`);
        } else {
            setToggle('none');
            handleToggle(`${query}=&`);
        }
    };

    return (
        <th
            className={`${hasData ? 'cursor-pointer' : undefined} border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50`}
            onClick={hasData ? handleClick : undefined}
        >
            <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
                {label}{" "}
                {hasData ? <>
                    {toggle === 'up' ? <ChevronUpIcon strokeWidth={2} className="h-5 w-5" title={'sort ' + label.toLowerCase()} /> :
                        toggle === 'down' ? <ChevronDownIcon strokeWidth={2} className="h-5 w-5" title={'sort ' + label.toLowerCase()} /> :
                            <>
                                <ChevronUpDownIcon strokeWidth={2} className="h-5 w-5" title={'sort ' + label.toLowerCase()} />
                            </>}
                </> : undefined}
            </Typography>
        </th>
    )
}

export default TH_S