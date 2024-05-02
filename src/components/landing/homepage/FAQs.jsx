import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdOutlineExpandLess } from "react-icons/md";
import { Box, TextField, Button } from '@mui/material';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<MdOutlineExpandLess />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// Define your validation schema
const schema = yup.object().shape({
    email: yup.string().email().required(),
    question: yup.string().required(),
});

export default function FAQs() {
    const [hideFormAfter, setHideFormAfter] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [sending, setSending] = React.useState(false);

    const [faqs, setFaqs] = React.useState([]);
    const [expanded, setExpanded] = React.useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema) // Apply yup resolver
    });

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel));
    };

    const isExpanded = (panel) => expanded.includes(panel);

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
    }, [])

    return (
        <Box id='FAQs' bgcolor='white' px={2} py={5}>
            <Box maxWidth="800px" mx="auto">
                <Typography variant="h2" color='primary' fontWeight='bold' textAlign='center' mb={5}>
                    FAQs
                </Typography>

                <Box bgcolor='primary.light' borderRadius={2}>
                    {
                        loading ? 'Loading FAQs' :
                            faqs.length !== 0 ? faqs.map((faq, i) => (
                                <Accordion key={i} expanded={isExpanded(i)} onChange={handleChange(i)}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Typography variant="h6">{faq.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )) : 'No FAQs.'
                    }
                </Box>

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
