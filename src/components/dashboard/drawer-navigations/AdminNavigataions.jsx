import React from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { LuArchiveRestore } from 'react-icons/lu';
import { TbDatabaseSearch } from 'react-icons/tb';
import CustomNavLink from './CustomNavlink';

const adminNavigations = [
    {
        label: 'Employee',
        icon: <BsFillPeopleFill color='inherit' />,
        path: '/employee',
    },
    {
        label: 'Record Management',
        icon: <TbDatabaseSearch color='inherit' />,
        path: 'record-management',
    },
    {
        label: 'Backup',
        icon: <LuArchiveRestore color='inherit' />,
        path: 'backup',
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