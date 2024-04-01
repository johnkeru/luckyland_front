import { Box, Grid, IconButton, MenuItem, MenuList, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { FaFacebookSquare, FaGraduationCap, FaInstagram } from "react-icons/fa";
import { FaLocationDot, FaSquareXTwitter } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import useUser from '../../hooks/useUser';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';
import { displayRolesAsText } from '../../utility_functions/displayRoesAsText';
import RoleChip from '../employee/RoleChip';
import Add_Employee_Modal from '../employee/modal/Add_Employee_Modal';
import ProfileSettings from './ProfileSettings';
import ViewProfileImage from './ViewProfileImage';
import Change_Password_Modal from './modal/Change_Password_Modal';
import Upload_Profile_Modal from './modal/Upload_Profile_Modal';

const Profile = ({ empDetails }) => {
    const { user, setUser } = useUser();
    const uploadProfileModalRef = useRef();
    const editrofileModalRef = useRef();
    const changePassModalRef = useRef();

    let data = empDetails || user;

    const handleUpdateProfile = (id, body, setLoading, handleClose, setError) => {
        commonValidationCall({
            endpoint: 'api/employees/update-employee/' + id,
            method: 'patch',
            body,
            hasToaster: true,
            setError,
            setLoading,
            handleClose,
            setDataDirectly: setUser
        });
    }

    return (
        <Grid container>
            <Grid item xs={12} sx={{
                position: 'relative',
                backgroundImage: 'url(/resort/bg.jpg)',
                backgroundSize: 'cover',
                minHeight: '50vh',
            }}>
                <Grid
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(180deg, rgba(0, 74, 159, 0.4) 0%, rgba(0, 74, 159, 0.6) 100%)",
                    }}
                />
                <Grid sx={{
                    color: 'white',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                        <Box
                            sx={{
                                p: .2,
                                borderRadius: '999px',
                                bgcolor: 'white',
                                mb: 2,
                            }}
                        >
                            <ViewProfileImage data={data} />
                        </Box>
                        <Typography variant='h4' fontWeight={500} sx={{ mb: 1 }}>{data.firstName} {data?.middleName} {data.lastName}</Typography>

                        <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <MdOutlineEmail />
                            <Typography>{data.email}</Typography>
                        </Grid>

                        {data?.roles && data.roles.length !== 0 ? <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            {data.roles.map(role => (
                                <RoleChip key={role.id} role={role.roleName} />
                            ))}
                        </Grid> : undefined}

                        <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FaLocationDot color='red' />
                            <Typography >{`${data.address.street}, ${data.address.state}, ${data.address.city} ${data.address.zip_code || ''}`}</Typography>
                        </Grid>

                        {data.graduated_at ? <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FaGraduationCap />
                            <Typography >{data.graduated_at}</Typography>
                        </Grid> : undefined}
                    </Box>
                </Grid>

                {
                    (data.facebook || data.instagram || data.twitter) && <Grid sx={{ position: 'absolute', bottom: -20, left: 0, right: 0, mx: 'auto', width: 'fit-content', }}>
                        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            {data.facebook ? <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                                <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' }, boxShadow: 1 }}>
                                    <FaFacebookSquare style={{ width: '100%', color: '#1877f2' }} />
                                </IconButton>
                            </a> : undefined}
                            {data.instagram ? <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' }, boxShadow: 1 }}>
                                    <FaInstagram style={{ width: '100%', color: '#e4405f' }} />
                                </IconButton>
                            </a> : undefined}
                            {data.twitter ? <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' }, boxShadow: 1 }}>
                                    <FaSquareXTwitter style={{ width: '100%', color: '#000' }} />
                                </IconButton>
                            </a> : undefined}
                        </Grid>
                    </Grid >
                }

                {
                    empDetails ? undefined : <ProfileSettings
                        sx={{
                            position: 'absolute',
                            right: 10
                        }}
                        button={<IconButton sx={{
                            color: 'white', fontSize: '1.5rem',
                            lineHeight: '1.5'
                        }}>
                            <FiEdit title='edit profile' />
                        </IconButton>}
                        MenuItems={<MenuList>
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
                        </MenuList>}
                    />
                }

            </Grid >

            <Box textAlign='center' width={empDetails ? '70%' : '50%'} m='auto' mt={5} mb={empDetails ? 3 : 2}>
                <Typography variant='h5' fontWeight={700}>About {data.firstName}</Typography>
                {data?.roles && data.roles.length !== 0 ? <Typography variant='body1' mb={empDetails ? 2 : 5}>{displayRolesAsText(data.roles)} of LuckyLand Resort.</Typography> : undefined}
                <Typography variant='body1' color='gray'>{data.description ? data.description : 'No Description.'}</Typography>
            </Box>

        </Grid >
    );
};

export default Profile;







