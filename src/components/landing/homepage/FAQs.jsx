import { MdOutlineExpandLess } from "react-icons/md";

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { primary } from '../../../styles/globalStyle';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AvatarColor from '../../../utility_components/AvatarColor';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    question: yup.string().required('Required'),
});

export default function ControlledAccordions() {
    const [loading, setLoading] = React.useState(true);
    const [sending, setSending] = React.useState(false);
    const [faqs, setFaqs] = React.useState([]);
    const [hideFormAfter, setHideFormAfter] = React.useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema) // Apply yup resolver
    });

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getAllFAQs = (withLoading) => {
        basicGetCall({
            endpoint: 'api/faqs',
            setLoading: withLoading ? setLoading : undefined,
            setDataDirectly: setFaqs
        });
    }

    const onSubmit = (data) => {
        // Server-side validation to prevent spam and ensure data integrity
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
        })
    };

    React.useEffect(() => {
        getAllFAQs(true);
    }, []);

    return (
        <Box id='FAQs' bgcolor={primary.contrastText} px={2} py={5}>
            <Box maxWidth="800px" mx="auto">
                <Typography variant="h2" color='primary' fontWeight='bold' textAlign='center' mb={5}>
                    FAQs
                </Typography>
                <div>
                    {
                        loading ? 'Loading FAQs' :
                            faqs.length !== 0 ? faqs.map((faq, i) => (
                                <Accordion key={i} expanded={expanded === i} onChange={handleChange(i)}>
                                    <AccordionSummary
                                        expandIcon={<MdOutlineExpandLess />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <AvatarColor text={faq.email} />
                                        <Typography sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', ml: 2 }}>{faq.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )) : 'No FAQs.'
                    }
                </div>


                {/* Form Section */}
                {!hideFormAfter ? <Box mt={5}>
                    <Typography variant="h4" color='primary' fontWeight='bold' mb={2}>Have a question?</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            margin="normal"
                            {...register("email")} // Register email field
                            error={errors.email ? true : false} // Check for errors
                            helperText={errors.email?.message} // Display error message
                        />
                        <TextField
                            label="Your Question"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("question")} // Register question field
                            error={errors.question ? true : false} // Check for errors
                            helperText={errors.question?.message} // Display error message
                            sx={{ mb: 2 }}
                        />
                        <ButtonWithLoading type='submit' color='primary' size='large' sx={{ ml: 'auto' }} loading={sending} loadingText='Submitting...'>
                            Submit
                        </ButtonWithLoading>
                    </form>
                </Box> : undefined}
            </Box>
        </Box>
    );
}

