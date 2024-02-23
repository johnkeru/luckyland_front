import React, { useState } from 'react';
import Modal from '../../../utility_components/modal/Modal';
import { Box, Button, DialogActions, DialogContent } from '@mui/material';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../utility_components/InputIcon';
import { MdOutlineEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { blue } from '@mui/material/colors';
import axiosCall from '../../../utility_functions/axiosCall';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        axiosCall({
            method: 'post',
            endpoint: '/forgot-password',
            body: data,
            setLoading,
            hasToaster: true,
            setError,
            handleClose,
            serverRes: true
        });
    };

    const button = < Button
        color="inherit"
        sx={{
            p: 0,
            boxShadow: 'none',
            bgcolor: 'transparent',
            color: blue[500],
            fontSize: '13px',
            textTransform: 'capitalize',
            ":hover": {
                bgcolor: 'transparent',
                textDecoration: 'underline'
            }
        }
        }> Forgot password?</Button >

    return (
        <Modal
            maxWidth='xs'
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            transition
            sx={{
                '& .MuiDialog-paper': {
                    marginTop: '-20%', // Adjust as needed
                },
            }}
            button={button}
            title="Forgot Password"
            children={
                <Box p={3}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputIcon
                            Icon={MdOutlineEmail}
                            label='Email'
                            name='email'
                            register={register}
                            errors={errors}
                            placeholder='Enter your email'
                        />
                        <ButtonWithLoading fullWidth color='success' disabled={!watch('email')} type='submit' loading={loading} loadingText='Resetting Password...' sx={{ mt: 3 }}>
                            Reset Password
                        </ButtonWithLoading>
                    </form>
                </Box>
            }
        />
    );
};

export default ForgotPassword;
