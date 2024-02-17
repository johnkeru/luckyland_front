import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOff, IoLockClosedSharp } from "react-icons/io5";
import { MdOutlineEmail } from 'react-icons/md';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import useUser from '../hooks/useUser';
import InputIcon from '../utility_components/modal/employee_modals/add_emp_form/InputIcon';
import axiosCall, { csrf } from '../utility_functions/axiosCall';
import ButtonWithLoading from '../utility_components/ButtonWithLoading';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {


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
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/resort/bg2.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <IoLockClosedSharp />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                            <InputIcon
                                sx={{ my: 3 }}
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <ButtonWithLoading fullWidth color='success' type='submit' disabled={!isReadyToLogin} loading={logingIn} loadingText='Signing In...' sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </ButtonWithLoading>

                            <Grid >
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}


