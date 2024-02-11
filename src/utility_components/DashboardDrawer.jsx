import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemPrefix
} from "@material-tailwind/react";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoChevronDown, IoChevronUp, IoPeople } from "react-icons/io5";
import { MdInventory2, MdSpaceDashboard } from "react-icons/md";
import { RiReservedLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin } from "../utility_functions/roles";
import DashboardNavLink from './DashboardNavLink';

export default function DashboardDrawer({ user }) {
    // const [open, setOpen] = React.useState(false);
    // const openDrawer = () => setOpen(true);
    // const closeDrawer = () => setOpen(false);
    const nav = useNavigate();
    const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);
    const toggleReportsSubMenu = () => {
        setShowReportsSubMenu(!showReportsSubMenu);
    };
    return (
        <React.Fragment>
            <Drawer open={true} transition={{ type: "tween", duration: 0 }} onClose={() => undefined} overlay={false} className="relative border-r-2 shadow-lg rounded-md p-4 z-0">
                <div className="mb-4 flex items-center justify-center">
                    <img
                        onClick={() => nav('/')}
                        width='150px'
                        src='/logo/logo1.png'
                        alt="nature image"
                    />
                </div>
                <List>
                    <NavLink end to='/dashboard' className={({ isActive, isPending }) =>
                        isPending ? "rounded-lg bg-yellow-100" : isActive ? "rounded-lg bg-yellow-100" : ""
                    }>
                        <DashboardNavLink Icon={<MdSpaceDashboard className="text-yellow-500" />} title='Dashboard' />
                    </NavLink>
                    <NavLink to='/dashboard/reservation' className={({ isActive, isPending }) =>
                        isPending ? "rounded-lg bg-green-100" : isActive ? "rounded-lg bg-green-100" : ""
                    }>
                        <DashboardNavLink Icon={<RiReservedLine className="text-green-500" />} title='Reservation' />
                    </NavLink>
                    <NavLink to='/dashboard/inventories' className={({ isActive, isPending }) =>
                        isPending ? "rounded-lg bg-blue-100" : isActive ? "rounded-lg bg-blue-100" : ""
                    }>
                        <DashboardNavLink Icon={<MdInventory2 className="text-blue-500" />} title='Inventories' />
                    </NavLink>

                    {
                        isAdmin(user.roles) ? <>

                            {/* Reports/Analytics */}
                            <ListItem onClick={toggleReportsSubMenu} className="cursor-pointer">
                                <ListItemPrefix>
                                    <TbReportAnalytics className="text-purple-500" />
                                </ListItemPrefix>
                                Reports/Analytics
                                <ListItemPrefix className="ml-auto">
                                    {showReportsSubMenu ? <IoChevronUp className="text-purple-500" /> : <IoChevronDown className="text-purple-500" />}
                                </ListItemPrefix>

                            </ListItem>

                            {/* Submenu for Inventory Reports */}
                            {showReportsSubMenu && (
                                <List className="ml-4 p-0 pb-2">
                                    <NavLink to='/dashboard/reports/inventory' className={({ isActive, isPending }) =>
                                        isPending ? "rounded-lg bg-purple-100" : isActive ? "rounded-lg bg-purple-200" : ""
                                    }>
                                        <DashboardNavLink Icon={<MdInventory2 className="text-purple-500" />} title='Inventory Reports' />
                                    </NavLink>

                                    <NavLink to='/dashboard/reports/reservation' className={({ isActive, isPending }) =>
                                        isPending ? "rounded-lg bg-purple-100" : isActive ? "rounded-lg bg-purple-200" : ""
                                    }>
                                        <DashboardNavLink Icon={<RiReservedLine className="text-purple-500" />} title='Reservation Reports' />
                                    </NavLink>
                                </List>
                            )}

                            <NavLink to='/dashboard/employees' className={({ isActive, isPending }) =>
                                isPending ? "rounded-lg bg-indigo-100" : isActive ? "rounded-lg bg-indigo-100" : ""
                            }>
                                <DashboardNavLink Icon={<IoPeople className="text-indigo-500" />} title='Employee' endpoint='api/logs/employee' />
                            </NavLink>
                        </> : undefined
                    }
                    <NavLink to='/dashboard/profile' className={({ isActive, isPending }) =>
                        isPending ? "rounded-lg bg-pink-100" : isActive ? "rounded-lg bg-pink-100" : ""
                    }>
                        <ListItem>
                            <ListItemPrefix>
                                <CgProfile className="text-pink-500" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                    </NavLink>
                </List>
                <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600" size="sm">
                    Documentation
                </Button>
            </Drawer>
        </React.Fragment>


    );
}