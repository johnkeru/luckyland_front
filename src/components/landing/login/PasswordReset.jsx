import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIconPassword from '../../../utility_components/InputIconPassword';
import authValidationForgotCall from '../../../utility_functions/axiosCalls/authValidationForgotCall';

const schema = yup.object().shape({
    password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const PasswordReset = () => {
    // Extract token from URL path
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema)
    });

    const handleResetPassword = (data) => {
        const newData = Object.assign(data, { email, token });
        authValidationForgotCall({
            method: 'post',
            endpoint: '/reset-password',
            body: newData,
            setLoading,
            hasToaster: true,
            handleClose: () => nav('/'),
            setError,
            serverRes: true
        })
    };

    return (
        <Container maxWidth="sm">

            <Box mt={8} textAlign="center">
                <Typography variant="h5" gutterBottom>
                    Password Reset
                </Typography>
                <form onSubmit={handleSubmit(handleResetPassword)}>
                    <InputIconPassword
                        allowCopyPaste
                        label='New Password'
                        name='password'
                        placeholder='Enter a new password'
                        register={register}
                        errors={errors}
                        helperText={errors.password?.message}
                        sx={{ mb: 3 }}
                    />
                    <InputIconPassword
                        allowCopyPaste
                        label='Confirm New Password'
                        placeholder='Confirmation password'
                        name='password_confirmation'
                        register={register}
                        errors={errors}
                        helperText={errors.password_confirmation?.message}
                    />

                    <ButtonWithLoading
                        fullWidth
                        color='success'
                        disabled={!watch('password_confirmation') && !watch('password')}
                        type='submit'
                        loading={loading}
                        loadingText='Resetting Password...'
                        sx={{ mt: 3 }}>
                        Reset Password
                    </ButtonWithLoading>
                </form>
            </Box>
        </Container>
    );
};

export default PasswordReset;
