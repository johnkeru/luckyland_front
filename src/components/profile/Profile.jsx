import { Chip, IconButton, Menu, MenuItem, MenuList } from '@mui/material';
import React from 'react';
import useUser from '../../hooks/useUser';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookSquare, FaGraduationCap } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Upload_Profile_Modal from '../../utility_components/modal/profile_modals/Upload_Profile_Modal';
import { useRef } from 'react';
import Add_Employee_Modal from '../../utility_components/modal/employee_modals/Add_Employee_Modal';
import axiosCall from '../../utility_functions/axiosCall';
import Change_Password_Modal from '../../utility_components/modal/profile_modals/Change_Password_Modal';
import { displayRolesAsText } from '../../utility_functions/displayRoesAsText';

const Profile = ({ empDetails }) => {

    const { user, setUser } = useUser();
    const uploadProfileModalRef = useRef();
    const editrofileModalRef = useRef();
    const changePassModalRef = useRef();

    let data = empDetails || user;

    const handleUpdateProfile = (id, body, setLoading, handleClose, setError) => {
        axiosCall({
            endpoint: 'api/employees/updateEmployee/' + id,
            method: 'patch',
            body,
            hasToaster: true,
            setError,
            setLoading,
            handleClose,
            onSuccess: setUser
        });
    }


    return (
        <div className={`p-8 bg-white shadow-md ${empDetails ? 'mt-16' : 'mt-24'} border`}>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                    {(data.facebook || data.instagram || data.twitter) && <div className="flex item-center gap-2">
                        <p className="font-bold text-gray-600 text-xl">Socials: </p>
                        <div className="flex item-center gap-2">
                            {data.facebook ? <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                                <FaFacebookSquare className='text-3xl' style={{ color: '#1877f2' }} />
                            </a> : undefined}
                            {data.instagram ? <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className='text-3xl' style={{ color: '#e4405f' }} />
                            </a> : undefined}
                            {data.twitter ? <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaSquareXTwitter className='text-3xl' style={{ color: '#1da1f2' }} />
                            </a> : undefined}
                        </div>
                    </div>}
                </div>
                <div className="relative mb-10">
                    <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        {data.image ? <img src={data.image} alt="" className='w-full h-full rounded-full' /> : <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>}
                    </div>
                </div>
                {!empDetails && <div className="ml-auto md:mt-0 md:justify-center">
                    <Menu placement="left-end">
                        <IconButton className='shadow-none' color='white'>
                            <FiEdit className='text-2xl' title='edit profile' />
                        </IconButton>
                        <MenuList>
                            <Upload_Profile_Modal
                                button={
                                    <MenuItem>Edit Image</MenuItem>}
                                ref={uploadProfileModalRef}
                            />
                            <Add_Employee_Modal
                                isProfile
                                handleUpdate={handleUpdateProfile}
                                button={<MenuItem>Edit Profile</MenuItem>}
                                ref={editrofileModalRef}
                                user={data}
                            />
                            <Change_Password_Modal
                                ref={changePassModalRef}
                                userId={data.id}
                                button={
                                    <MenuItem>Change Password</MenuItem>
                                }
                            />
                        </MenuList>
                    </Menu>
                </div>}
            </div>

            <div className={`mt-24 text-center border-b ${empDetails ? 'pb-6' : 'pb-12'}`}>
                <h1 className="text-4xl font-medium text-gray-700">
                    {data.firstName} {data.middleName} {data.lastName}
                </h1>
                <div className="flex items-center gap-2 mt-3 justify-center">
                    <FaLocationDot color='red' />
                    <p className="font-light text-gray-600">{`${data.address.street}, ${data.address.state}, ${data.address.city} ${data.address.zip_code || ''}`}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 justify-center">
                    <MdOutlineEmail />
                    {data.email ? <p className="font-light text-gray-600">{data.email}</p> : undefined}
                </div>

                {data.roles.length !== 0 ? <div className="flex items-center gap-2 justify-center mt-5">
                    {data.roles.map(role => (
                        <Chip key={role.id} label={role.roleName} variant="outlined" />
                    ))}
                </div> : undefined}
                <p className="mt-5 text-gray-500">{displayRolesAsText(data.roles)} of LuckyLand Resort.</p>
                {data.graduated_at ? <p className="mt-2 text-gray-500 flex items-center gap-2 justify-center"><FaGraduationCap /> {data.graduated_at}</p> : undefined}
            </div>
            {data.description ? <div className={`${empDetails ? 'mt-6' : 'mt-12'} flex flex-col justify-center`}>
                <p className="text-gray-600 text-center font-light lg:px-16">
                    {data.description}
                </p>
            </div> : undefined}
        </div>
    );
};

export default Profile;
