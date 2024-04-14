import React from 'react';
import { MdOutlineCottage } from "react-icons/md";


import { BsFillPeopleFill } from 'react-icons/bs';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdOutlineBedroomParent } from "react-icons/md";
import { RiBuilding4Fill } from "react-icons/ri";
import { TbDatabaseSearch } from 'react-icons/tb';
import CustomNavLink from './CustomNavlink';

const adminNavigations = [
    {
        label: 'Employee',
        icon: <BsFillPeopleFill color='inherit' />,
        path: '/employee',
    },
    {
        label: 'Facilities',
        icon: <RiBuilding4Fill color='inherit' />,
        subs: [
            {
                label: 'Room Management',
                icon: <MdOutlineBedroomParent color='inherit' />,
                path: 'facilities/room-management',
            },
            {
                label: 'Cottage Management',
                icon: <MdOutlineCottage color='inherit' />,
                path: 'facilities/cottage-management',
            },
        ]
    },
    {
        label: 'Record Management',
        icon: <TbDatabaseSearch color='inherit' />,
        path: 'record-management',
    },
    {
        label: 'Backup & Restore',
        icon: <LuArchiveRestore color='inherit' />,
        path: 'backup-restore',
    },
]

const AdminNavigataions = ({ subOpen, setSubOpen }) => {
    return (
        <>
            {
                adminNavigations.map(nav => (
                    <CustomNavLink
                        setSubOpen={setSubOpen}
                        subOpen={subOpen}
                        key={nav.label}
                        icon={nav.icon}
                        label={nav.label}
                        to={nav.path}
                        subs={nav.subs}
                    />
                ))
            }
        </>
    )
}

export default AdminNavigataions