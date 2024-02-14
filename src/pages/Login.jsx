import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOff } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import ReusableHero from '../components/landing/ReusableHero';
import useUser from '../hooks/useUser';
import InputIcon from '../utility_components/modal/employee_modals/add_emp_form/InputIcon';
import axiosCall, { csrf } from '../utility_functions/axiosCall';
import ButtonWithLoading from '../utility_components/ButtonWithLoading';

const Login = () => {
    const [remember, setRemember] = useState(false);
    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password number is required').min(4, 'At least 4 characters')
    });

    const { register, handleSubmit, setError, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const nav = useNavigate();
    const { user, setUser } = useUser();
    const [logingIn, setLogginIn] = useState(false);

    const w = watch();
    const isReadyToLogin = !!w.email && !!w.password;

    useEffect(() => {
        if (user) {
            nav('/dashboard/profile');
        }
    }, [user])

    const onSubmit = async (data) => {
        const dataToSend = Object.assign(data, { remember });
        try {
            csrf();
            axiosCall({
                setError,
                method: 'post',
                endpoint: '/login',
                hasToaster: true,
                body: dataToSend,
                setLoading: setLogginIn,
                onSuccess: () => {
                    axiosCall({ endpoint: '/api/user', hasToaster: true, setResponse: setUser, handleClose: () => nav('/dashboard') });
                }
            })
        } catch (error) {
            // Handle specific errors or display a general error message
            // For example, set an error message for the email field
            setError('email', {
                type: 'manual',
                message: 'Invalid email or password',
            });
        }
    };


    return (
        <ReusableHero
            noSlide
            children={<form onSubmit={handleSubmit(onSubmit)} className="bg-white w-1/3  shadow-lg px-10 py-12 mt-20 border-2 rounded-md">
                <img src="/logo/logo1.png" width='150px' alt="" className='m-auto -mt-28 bg-white rounded-full' />
                {/* Email Input */}
                <InputIcon
                    sx={{ mb: 3 }}
                    Icon={MdOutlineEmail}
                    label='Email'
                    name='email'
                    register={register}
                    errors={errors}
                    placeholder='Enter your email'
                />
                {/* Password Input */}
                <InputIcon
                    type='password'
                    isView
                    Icon={IoEyeOff}
                    label='Password'
                    name='password'
                    register={register}
                    errors={errors}
                    placeholder='Enter your password'
                />

                {/* Forgot Password Link */}
                <a href="/forgot-password" className="text-blue-500 block text-sm mt-2 mb-4">Forgot Password?</a>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="remember" className="text-sm text-gray-600">
                        <input
                            onChange={e => setRemember(e.target.checked)}
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="mr-2 leading-tight"
                        />
                        Remember Me
                    </label>
                </div>

                {/* Submit Button */}
                <ButtonWithLoading fullWidth color='success' type='submit' disabled={!isReadyToLogin} loading={logingIn} loadingText='Signing In...'>
                    Sign In
                </ButtonWithLoading>
            </form>
            }
        />
    );
};

export default Login;


