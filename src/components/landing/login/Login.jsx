import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineEmail } from 'react-icons/md';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import useUser from '../../../hooks/useUser';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../utility_components/InputIcon';
import InputIconPassword from '../../../utility_components/InputIconPassword';
import Modal from '../../../utility_components/modal/Modal';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import { csrf } from '../../../utility_functions/axiosCalls/config';
import ForgotPassword from './ForgotPassword';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:5000">
                LuckyLand Resort
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function SignInSide() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        const isOpen = localStorage.getItem('openLoginPopup');
        if (isOpen === 'yes') {
            setOpen(true);
            localStorage.removeItem('openLoginPopup');
        }
        if (user) {
            nav('/dashboard');
        }
    }, [user])

    const onSubmit = async (data) => {
        const dataToSend = Object.assign(data, { remember });
        try {
            csrf();
            commonValidationCall({
                setError,
                method: 'post',
                endpoint: '/login',
                hasToaster: true,
                body: dataToSend,
                setLoading: setLogginIn,
                onSuccess: () => {
                    basicGetCall({ endpoint: '/api/user', setResponse: setUser, handleClose: () => nav('/dashboard') });
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

    const button = <Button variant='contained'>Login</Button>

    return (
        <Modal
            maxWidth='xs'
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            transition
            sx={{
                '& .MuiDialog-paper': {
                    marginTop: '-10%', // Adjust as needed
                },
            }}
            button={button}
            children={
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 3,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ width: '100px', height: '100px' }} src='/logo/logo1.png' />
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
                            <InputIconPassword
                                allowCopyPaste
                                label='Password'
                                name='password'
                                register={register}
                                errors={errors}
                                placeholder='Enter your password'
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" onChange={e => setRemember(e.target.checked)} />}
                                label="Remember me"
                            />
                            <ButtonWithLoading fullWidth color='success' type='submit' disabled={!isReadyToLogin} loading={logingIn} loadingText='Signing In...' sx={{ mt: 3 }}>
                                Sign In
                            </ButtonWithLoading>

                        </Box>
                        <Box width='100%'>
                            <ForgotPassword />
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            }
        />
    );
}


