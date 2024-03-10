import {
    DialogContent
} from "@mui/material";
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import Step1 from "./add_emp_form/Step1";
import Step2 from "./add_emp_form/Step2";



const Add_RegularEmployee_Modal = ({ parentClose, isEmp, user, button, handleAdd, handleUpdate, }) => {
    const [loading, setLoading] = useState(false);

    const buildSchema = () => {
        const baseSchema = {
            firstName: yup.string().required('First Name is required').min(2, 'At least 2 characters'),
            middleName: yup.string(),
            lastName: yup.string().required('Last Name is required').min(2, 'At least 2 characters'),
            email: yup.string().email('Invalid email').required('Email is required'),
            phone: yup.string().required('Phone number is required').min(10, 'At least 10 characters'),
            street: yup.string().required('Street is required').min(2, 'At least 2 characters'),
            state: yup.string().required('State is required').min(2, 'At least 2 characters'),
            city: yup.string().required('City is required').min(2, 'At least 2 characters'),
            zip_code: yup.string(),
            graduated_at: yup.string(),
            description: yup.string(),
        };
        return yup.object().shape(baseSchema);
    };

    const { register, handleSubmit, setError, watch, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(buildSchema()),
    });

    const onSubmit = (data) => {
        if (isEmp) {
            const origEmail = user.email;
            const origPhone = user.phone;
            if (data.email === origEmail) delete data.email;
            if (data.phone === origPhone) delete data.phone;
        }
        if (!user) {
            handleAdd(data, setLoading, handleClearState, setError);
        } else {
            handleUpdate(user.id, data, setLoading, handleClose, setError)
        }
    };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClearState = () => {
        reset();
        handleClose();
        parentClose && parentClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            size='lg'
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            loading={loading}
            title={!user ? 'Add Regular Employee' : 'Edit ' + user.firstName}
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers sx={{ width: '800px' }}>
                        <Step1 errors={errors} register={register} user={user} setValue={setValue} isRegular />
                        <Step2 user={user} register={register} isRegular />
                    </DialogContent>
                    <CommonFooter>
                        <ButtonWithLoading
                            color='success'
                            type='submit'
                            loading={loading}
                            loadingText='Submitting...'
                        >
                            Submit
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
};

export default Add_RegularEmployee_Modal;




