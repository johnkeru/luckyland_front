import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import { MdExpandLess } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AvatarColor from '../../../utility_components/AvatarColor';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall'
import commonValidationCall from "../../../utility_functions/commonValidationCall";

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    question: yup.string().required('Question is required'),
});

const ControlledAccordions = () => {
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [faqs, setFaqs] = useState([]);
    const [hideFormAfter, setHideFormAfter] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getAllFAQs = (withLoading) => {
        basicGetCall({
            endpoint: 'api/faqs',
            setLoading: withLoading ? setLoading : undefined,
            setDataDirectly: setFaqs
        });
    };

    const onSubmit = (data) => {
        commonValidationCall({
            endpoint: 'api/faqs',
            method: 'post',
            setLoading: setSending,
            body: data,
            hasToaster: true,
            onSuccess: () => {
                reset();
                getAllFAQs();
                setHideFormAfter(true);
            }
        });
    };

    useEffect(() => {
        getAllFAQs(true);
    }, []);

    return (
        <Box id='FAQs' px={2} py={8}>
            <Box maxWidth="800px" mx="auto">
                <Typography variant="h4" align="center" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {faqs.length !== 0 ? (
                            faqs.map((faq, i) => (
                                <Accordion key={i} expanded={expanded === i} onChange={handleChange(i)}>
                                    <AccordionSummary
                                        expandIcon={<MdExpandLess />}
                                        aria-controls={`panel${i}bh-content`}
                                        id={`panel${i}bh-header`}
                                    >
                                        <AvatarColor text={faq.email} />
                                        <Typography sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', ml: 2 }}>
                                            {faq.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{faq.answer}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <Typography variant="body1" align="center">
                                No FAQs available.
                            </Typography>
                        )}
                    </>
                )}

                {/* Form Section */}
                {!hideFormAfter && (
                    <Box mt={5}>
                        <Typography variant="h5" gutterBottom align="center">
                            Have a question? Ask us!
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TextField
                                label="Your Email"
                                variant="outlined"
                                type="email"
                                fullWidth
                                margin="normal"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                label="Your Question"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...register("question")}
                                error={!!errors.question}
                                helperText={errors.question?.message}
                                sx={{ mb: 2 }}
                            />
                            <ButtonWithLoading type='submit' color='primary' size='large' sx={{ ml: 'auto' }} loading={sending} loadingText='Submitting...'>
                                Submit
                            </ButtonWithLoading>
                        </form>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ControlledAccordions;
