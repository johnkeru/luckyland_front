import { DialogContent } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIconPassword from '../../../utility_components/InputIconPassword';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';

import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';

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
        commonValidationCall({
            endpoint: 'api/changePassword/' + userId,
            body: { current_password: data.current_password, new_password: data.new_password },
            method: 'put',
            hasToaster: true,
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

                        <InputIconPassword
                            label='Current Current Password'
                            name='current_password'
                            register={register}
                            errors={errors}
                            placeholder='Enter Password'
                            sx={{ mb: 3 }}
                        />
                        <InputIconPassword
                            label='New Password'
                            name='new_password'
                            register={register}
                            errors={errors}
                            placeholder='Enter New Password'
                            sx={{ mb: 3 }}
                        />

                        <InputIconPassword
                            label='Confirm Password'
                            name='confirm_password'
                            register={register}
                            errors={errors}
                            placeholder='Enter Confirm Password'
                            sx={{ mb: 3 }}
                        />
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

