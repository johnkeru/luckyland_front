import { DialogBody } from '@material-tailwind/react';
import React, { useState } from 'react';
import Profile from '../../../components/profile/Profile';
import Modal from '../Modal';

const Details_Employee_Modal = ({ button, empDetails }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            size='lg'
            button={button}
            handleClose={handleOpen}
            handleOpen={handleOpen}
            open={open}
            title={`${empDetails.firstName}'s Info`}
            children={
                <DialogBody className={(empDetails.description && empDetails.description.length >= 40) ? `overflow-y-scroll h-[78vh]` : undefined}>
                    <Profile empDetails={empDetails} />
                </DialogBody>
            }
        />

    )
}

export default Details_Employee_Modal