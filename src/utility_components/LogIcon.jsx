// logIcon.js
import React from 'react';

import { CgUnavailable } from 'react-icons/cg';
import { CiEdit } from 'react-icons/ci';
import { FaArrowUp, FaInfo, FaPlus } from 'react-icons/fa';
import { GrDeliver } from 'react-icons/gr';
import { ImCancelCircle } from "react-icons/im";
import { IoIosReturnLeft, IoMdTrash } from 'react-icons/io';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdManageAccounts, MdOutlineMoveUp } from "react-icons/md";
import { TbMoneybag } from 'react-icons/tb';

const LogIcon = ({ type }) => {
    switch (type) {
        // for inventory logs icons
        case 'borrow':
            return <FaArrowUp />;
        case 'return':
            return <IoIosReturnLeft />;
        case 'add':
            return <FaPlus />;
        case 'update':
            return <CiEdit />;
        case 'delete':
            return <IoMdTrash />;
        case 'restore':
            return <LuArchiveRestore />;
        case 'delivery':
            return <GrDeliver />;
        case 'waste':
            return <TbMoneybag />;
        case 'unavailable':
            return <CgUnavailable />;
        case 'move':
            return <MdOutlineMoveUp />;
        case 'cancel':
            return <ImCancelCircle />;
        case 'manage':
            return <MdManageAccounts />;

        default:
            return <FaInfo />;
    }
};

export default LogIcon;
