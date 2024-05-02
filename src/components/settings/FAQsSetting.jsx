import { Avatar, Box, Card, Divider, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ButtonWithLoading from '../../utility_components/ButtonWithLoading';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AvatarColor from '../../utility_components/AvatarColor';

const FAQ = ({ faq, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const schema = yup.object().shape({
        display: yup.boolean(),
        answer: yup.string().required('Answer is required!')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        commonValidationCall({
            endpoint: `api/settings/faqs/${faq.id}/answer`,
            body: data,
            setLoading,
            hasToaster: true,
            method: 'post',
            onSuccess
        })
    }

    return <Box mb={2}>
        <Box display='flex' gap={2}>
            <AvatarColor text={faq.email} />
            <Typography variant="h6">{faq.question}</Typography>
        </Box>
        <TextField
            label="Answer"
            defaultValue={faq.answer || ''}
            {...register('answer')}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            error={Boolean(errors.answer?.message)}
            helperText={errors.answer?.message}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display='flex' justifyContent='space-between'>
                <FormControlLabel
                    {...register('display')}
                    control={<Switch />}
                    label="Display on Landing Page"
                />
                <ButtonWithLoading
                    variant="contained"
                    color="info"
                    type='submit'
                    loadingText='Submitting...'
                    loading={loading} // Set loading state here if needed
                >
                    Submit
                </ButtonWithLoading>
            </Box>
        </form>
    </Box>
}

const FAQsSetting = () => {
    const [loading, setLoading] = useState(true);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        getAllFAQs(true);
    }, []);

    const getAllFAQs = (withLoading) => {
        basicGetCall({
            endpoint: 'api/settings/faqs',
            setLoading: withLoading ? setLoading : undefined,
            setDataDirectly: setFaqs
        });
    }

    return (
        <Card elevation={2} sx={{ p: 2, mb: 1.5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>FAQ Settings</Typography>
            <Divider />
            <Box mt={2}>
                {loading ? 'Loading FAQs...' : (
                    faqs.map((faq, index) => (
                        <FAQ faq={faq} key={index} onSuccess={() => getAllFAQs()} />
                    ))
                )}
            </Box>
        </Card>
    )
}

export default FAQsSetting