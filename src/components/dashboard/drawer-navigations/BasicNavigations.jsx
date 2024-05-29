import React from 'react';
import { CgUnavailable } from 'react-icons/cg';
import { GrDeliver } from 'react-icons/gr';
import { MdDashboard, MdInventory, MdOutlineOtherHouses } from 'react-icons/md';
import { RiReservedFill } from 'react-icons/ri';
import { TbMoneybag } from 'react-icons/tb';
import CustomNavLink from './CustomNavlink';
import { MdOutlineCottage } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { RiBuilding4Fill } from "react-icons/ri";

const navigations = [
    {
        label: 'Dashboard',
        icon: <MdDashboard color='inherit' />,
        path: '/dashboard',
    },
    {
        label: 'Reservation',
        icon: <RiReservedFill color='inherit' />,
        path: '/reservation',
    },
    {
        label: 'Inventory',
        icon: <MdInventory color='inherit' />,
        path: '/inventory',
        subs: [
            {
                label: 'Delivery',
                icon: <GrDeliver color='inherit' />,
                path: 'inventory/delivery',
            },
            {
                label: 'Waste',
                icon: <TbMoneybag color='inherit' />,
                path: 'inventory/waste',
            },
            {
                label: 'Unavailable',
                icon: <CgUnavailable color='inherit' />,
                path: 'inventory/unavailable',
            }
        ]
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
            {
                label: 'Other Management',
                icon: <MdOutlineOtherHouses color='inherit' />,
                path: 'facilities/other-management',
            },
        ]
    },
];

const BasicNavigations = ({ setSubOpen, subOpen }) => {
    return (
        <>
            {
                navigations.map(nav => (
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

export default BasicNavigations