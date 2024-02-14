import React, { useState } from 'react';
import Profile from '../../../components/profile/Profile';
import Modal from '../Modal';
import { DialogContent } from '@mui/material';

const Details_Employee_Modal = ({ button, empDetails }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            button={button}
            handleClose={handleOpen}
            handleOpen={handleOpen}
            open={open}
            maxWidth='md'
            title={`${empDetails.firstName}'s Info`}
            children={
                <DialogContent sx={{
                    width: '800px',
                    overflowY: (empDetails.description && empDetails.description.length >= 2018) ? 'scroll' : undefined,
                    height: (empDetails.description && empDetails.description.length >= 2018) ? '78vh' : undefined,
                }}>
                    <Profile empDetails={empDetails} />
                </DialogContent>
            }
        />

    )
}

export default Details_Employee_Modal