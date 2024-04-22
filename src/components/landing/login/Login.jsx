import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Avatar } from '@mui/material';
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


export default function Login({ button }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [remember, setRemember] = useState(false);
    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters')
    });

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema)
    });

    const nav = useNavigate();
    const { setUser } = useUser();
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        const isOpen = localStorage.getItem('openLoginPopup');
        if (isOpen === 'yes') {
            setOpen(true);
            localStorage.removeItem('openLoginPopup');
        }
    }, []);

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
                setLoading: setLoggingIn,
                onSuccess: () => {
                    basicGetCall({
                        endpoint: '/api/user', setResponse: setUser,
                        onSuccess: () => nav('/dashboard')
                    });
                }
            });
        } catch (error) {
            setError('email', {
                type: 'manual',
                message: 'Invalid email or password',
            });
        }
    };

    return (
        <Modal
            maxWidth='xs'
            open={open}
            hasCloseIcon={false}
            handleOpen={handleOpen}
            handleClose={handleOpen}
            transition
            sx={{
                '& .MuiDialog-paper': {
                    marginTop: '-2%', // Adjust as needed
                    borderRadius: '5px', // Adding border radius for a card-like appearance
                },
            }}
            button={button}
            children={
                <Grid container justifyContent="center" component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            mt: 3,
                            mb: 5,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar src='/logo/logo1.png' sx={{ width: '80px', height: '80px', backgroundColor: '#f0f0f0', color: '#757575' }} /> {/* Updated Avatar to match formal theme */}
                        <Typography component="h1" variant="h5" mt={3} mb={2} color="text.primary"> {/* Using formal font color */}
                            Sign in to LuckyLand Resort
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
                            <InputIcon
                                sx={{ mb: 2 }}
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
                            <ButtonWithLoading fullWidth color='primary' type='submit' disabled={!isValid} loading={loggingIn} loadingText='Signing In...' sx={{ mt: 3 }}>
                                Sign In
                            </ButtonWithLoading>

                        </Box>
                        <Box width='100%'>
                            <ForgotPassword />
                        </Box>
                    </Box>
                </Grid>
            }
        />
    );
}
