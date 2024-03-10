import { Box, Button, DialogContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaUserLock, FaUser } from "react-icons/fa6";
import ButtonIconText from '../../../utility_components/ButtonIconText';
import ViewInfo from '../../../utility_components/ViewInfo';
import Modal from '../../../utility_components/modal/Modal';
import Add_Employee_Modal from './Add_Employee_Modal';
import Add_RegularEmployee_Modal from './Add_RegularEmployee_Modal';

function Employee_Role_Modal({ addEmployee, addRegularEmployee }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    const button = <ButtonIconText
        Icon={<FaPlus />}
        text='Add Employee'
        color="success"
    />

    return (
        <Modal
            size='lg'
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title={
                <Box display='flex' gap={1} >
                    Select Employee Type
                    <ViewInfo
                        content={
                            <Typography variant="body2" width='200px'>
                                <b>Regular Employee</b> are simply records in the system and do not have any access or functionality.
                                They exist for administrative purposes only.
                                <br /> <br />
                                <b>With Role/s Employee</b> have the ability to log in and access specific functionalities
                                based on their roles within the system.
                            </Typography>

                        }
                    />
                </Box>
            }
            children={
                <>
                    <DialogContent dividers>
                        <Box display='flex' gap={2}>

                            <Add_RegularEmployee_Modal
                                handleAdd={addRegularEmployee}
                                parentClose={handleClose}
                                button={
                                    <Button
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            p: 2,
                                            boxShadow: 1,
                                            textTransform: 'none',
                                            ":hover": { boxShadow: 2, transition: 'ease 200ms', }
                                        }}>
                                        <Box sx={{ fontSize: '2rem', mb: 2, display: 'flex', justifyContent: 'center', width: 'fit-content', bgcolor: grey[300], p: 2, borderRadius: '999px' }}>
                                            <FaUser color={grey[900]} />
                                        </Box>
                                        <Typography variant='h6' color={grey[900]}>Regular Employee</Typography>
                                    </Button>
                                }
                            />

                            <Add_Employee_Modal
                                handleAdd={addEmployee}
                                parentClose={handleClose}
                                button={
                                    <Button
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            p: 2,
                                            boxShadow: 1,
                                            textTransform: 'none',
                                            ":hover": { boxShadow: 2, transition: 'ease 200ms', }
                                        }}>
                                        <Box sx={{ fontSize: '2rem', mb: 2, display: 'flex', justifyContent: 'center', width: 'fit-content', bgcolor: grey[300], p: 2, borderRadius: '999px' }}>
                                            <FaUserLock color={grey[900]} />
                                        </Box>
                                        <Typography variant='h6' color={grey[900]}>With Role/s Employee</Typography>
                                    </Button>
                                }
                            />
                        </Box>
                    </DialogContent>

                </>

            }
        />
    );
}

export default Employee_Role_Modal;
