import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Md10Mp } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';
import * as yup from 'yup';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../utility_components/InputIcon';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';

const schema = yup.object().shape({
    gCashRefNumber: yup.string().required('GCash reference number is required'),
});

const GcashPaymentLink = () => {
    const [loading, setLoading] = useState(false);

    const { token } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const reservation = searchParams.get('reservation');

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const body = Object.assign(data, { reservation, email, token });
        commonValidationCall({
            endpoint: 'api/reservation/checkGCashRefNumber',
            setError,
            body,
            hasToaster: true,
            toasterDelay: 5000,
            method: 'post',
            setLoading,
            setResponse: e => {
                console.log(e)
            }
        })
    };

    return (
        <Container maxWidth="sm">
            <Box mt={8} textAlign="center">
                <Typography variant="h5" gutterBottom>
                    GCash Reference Payment
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputIcon
                        Icon={Md10Mp}
                        label='GCash Reference Number'
                        name='gCashRefNumber'
                        register={register}
                        errors={errors}
                        placeholder='Enter Reference Number'
                    />
                    <ButtonWithLoading
                        fullWidth
                        color='success'
                        disabled={!watch('gCashRefNumber')}
                        type='submit'
                        loading={loading}
                        loadingText='Sending...'
                        sx={{ mt: 3 }}>
                        Confirm Initial Payment
                    </ButtonWithLoading>
                    <Button>
                        Re-send another email
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default GcashPaymentLink;
