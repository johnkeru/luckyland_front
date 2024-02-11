// logIcon.js
import React from 'react';

import { CiEdit } from 'react-icons/ci';
import { FaArrowDown, FaArrowUp, FaInfo, FaPlus } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { LuArchiveRestore } from 'react-icons/lu';

const LogIcon = ({ type }) => {
    switch (type) {
        case 'borrow':
            return <FaArrowUp className='text-lg' />;
        case 'return':
            return <FaArrowDown className='text-lg' />;
        case 'add':
            return <FaPlus className='text-lg' />;
        case 'update':
            return <CiEdit className='text-lg' />;
        case 'delete':
            return <IoMdTrash className='text-lg' />;
        case 'restore':
            return <LuArchiveRestore className='text-lg' />;
        default:
            return <FaInfo className='text-lg' />;
    }
};

export default LogIcon;
