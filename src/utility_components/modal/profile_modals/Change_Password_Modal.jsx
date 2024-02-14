import { yupResolver } from '@hookform/resolvers/yup';
import { DialogContent } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOff } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';
import * as yup from 'yup';
import axiosCall from '../../../utility_functions/axiosCall';
import ButtonWithLoading from '../../ButtonWithLoading';
import CommonFooter from '../CommonFooter';
import Modal from '../Modal';
import InputIcon from '../employee_modals/add_emp_form/InputIcon';

const schema = yup.object().shape({
    current_password: yup
        .string()
        .required('Current Password is required'),
    new_password: yup
        .string()
        .required('New Password is required')
        .min(5, 'New Password must be at least 5 characters')
        .notOneOf([yup.ref('current_password'), null], 'New Password must be different from Current Password'),
    confirm_password: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('new_password'), null], 'New Passwords do not match'),
});


const Change_Password_Modal = forwardRef(({ button, userId }, ref) => {
    const [changing, setChanging] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseWreset = () => {
        reset();
        setOpen(false);
    }

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        axiosCall({
            endpoint: 'api/changePassword/' + userId,
            body: { current_password: data.current_password, new_password: data.new_password },
            method: 'put',
            setError,
            setLoading: setChanging,
            handleClose: handleCloseWreset
        })
    };


    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            loading={changing}
            title='Change Password'
            element='form'
            maxWidth='sm'
            handleSubmit={handleSubmit(onSubmit)}
            children={
                <>
                    <DialogContent dividers>
                        <InputIcon sx={{ mb: 3 }} isView Icon={IoEyeOff} label='Current Password' name='current_password' register={register} errors={errors} placeholder='Enter Current Password' type='password' />
                        <InputIcon sx={{ mb: 3 }} isView Icon={IoEyeOff} label='New Password' name='new_password' register={register} errors={errors} placeholder='Enter New Password' type='password' />
                        <InputIcon Icon={RiLockPasswordFill} label='Confirm Password' name='confirm_password' register={register} errors={errors} placeholder='Enter Confirm Password' type='password' />
                    </DialogContent>
                    <CommonFooter>
                        <ButtonWithLoading
                            type="submit"
                            color='info'
                            loading={changing}
                            loadingText='Changing...'
                        >
                            Change
                        </ButtonWithLoading>
                    </CommonFooter>
                </>
            }
        />
    );
});

export default Change_Password_Modal;

