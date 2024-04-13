import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    DialogContent,
    Step,
    StepLabel,
    Stepper
} from "@mui/material";
import React, { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaInfo } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import * as yup from 'yup';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import Step1 from './add_emp_form/Step1';
import Step2 from './add_emp_form/Step2';
import phoneInputRegex from '../../../utility_functions/phoneInputRegex';

const steps = [
    {
        label: 'Personal Info',
        icon: <FaInfo style={{ width: '100%' }} />
    },
    {
        label: 'Account Info',
        icon: <RiAccountCircleFill style={{ width: '100%' }} />
    },
]

const Add_Employee_Modal = forwardRef(({ parentClose, isEmp, isProfile, user, button, handleAdd, handleUpdate, }, ref) => {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const isLast = activeStep === steps.length - 1;

    const buildSchema = (isEditMode) => {
        const baseSchema = {
            firstName: yup.string().required('First Name is required').min(2, 'At least 2 characters'),
            middleName: yup.string(),
            lastName: yup.string().required('Last Name is required').min(2, 'At least 2 characters'),
            email: yup.string().email('Invalid email').required('Email is required'),
            phoneNumber: yup.string()
                .nullable()
                .test('is-valid-phone', 'Phone number is not valid', function (value) {
                    // If value is null or empty, return true
                    if (!value) return true;
                    // Otherwise, check if it matches the phone number regex
                    return phoneInputRegex.test(value);
                }),
            province: yup.string().required('Province is required').min(2, 'At least 2 characters'),
            city: yup.string().required('City/Municipality is required').min(2, 'At least 2 characters'),
            barangay: yup.string().required('Barangay is required').min(2, 'At least 2 characters'),
            zip_code: yup.string(),
            // graduated_at: yup.string(),
            description: yup.string(),
            // facebook: yup.string(),
            // instagram: yup.string(),
            // twitter: yup.string(),
        };

        // Add password validation only if not in edit mode
        if (!isEditMode) {
            baseSchema.password = yup.string().required('Password number is required').min(5, 'At least 5 characters');
        }

        return yup.object().shape(baseSchema);
    };

    const { register, handleSubmit, setError, watch, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(buildSchema(isEmp || isProfile)),
    });
    console.log(errors)
    const step1Error = Object.keys(errors).length > 0;
    const [step2Error, setStep2Error] = useState('');

    const [selectedRoleIds, setSelectedRoleIds] = useState((user && user?.roles && isEmp) ? user.roles.map(r => r.id) : []);


    const checkError2 = () => {
        if ((!isProfile) && selectedRoleIds.length === 0) {
            setStep2Error('Must select role/s for employee.');
        }
    }

    const onSubmit = (data) => {
        // this line will tell if the step 1 is done and proceed.
        if (activeStep === 0) {
            handleNext();
            return;
        };
        // this will exclude the unique fields, so that when it didn't change it won't look to the unique constraint of the db.
        if (isEmp || isProfile) {
            const origEmail = user.email;
            if (data.email === origEmail) delete data.email;
        }
        // Conditionally add https:// to fb, ig, twitter fields
        // const formattedData = {
        //     ...data,
        //     facebook: data.facebook ? data.facebook.startsWith('http') ? data.facebook : `https://fb.com/${data.facebook}` : undefined,
        //     instagram: data.instagram ? data.instagram.startsWith('http') ? data.instagram : `https://instagram.com/${data.instagram}` : undefined,
        //     twitter: data.twitter ? data.twitter.startsWith('http') ? data.twitter : `https://twitter.com/${data.twitter}` : undefined,
        // };

        const hasRoles = !isProfile ? { roles: selectedRoleIds } : {};
        const body = Object.assign(data, hasRoles);

        const handleClearState = () => {
            reset();
            setSelectedRoleIds([]);
            setActiveStep(0);
            handleClose();
            parentClose && parentClose();
        };

        if (!user) {
            if (step2Error) return; // we won't allow to request to the server if step2Error(role) has error.
            handleAdd(body, setLoading, handleClearState, setError);
            return;
        } else {
            if (isEmp && step2Error) return; // we won't allow to request to the server if step2Error(role) has error.
            handleUpdate(user.id, body, setLoading, handleClose, setError)
            return;
        }
    };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setActiveStep(0);
        setOpen(false);
    };

    const handleNext = () => setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
    const handlePrev = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // const handleStep = (step) => () => setActiveStep(step);
    // const handleLast = () => setActiveStep(steps.length - 1);

    return (

        <Modal
            size='lg'
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            loading={loading}
            title={!user ? 'Add Employee' : 'Edit ' + user.firstName}
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers sx={{ width: '800px' }}>
                        <Stepper
                            sx={{ mb: 3 }}
                            activeStep={activeStep}
                            nonLinear
                        >
                            {steps.map((step, index) => (
                                // STEP 1
                                index === 0 ? <Step key={index} completed={index === 1}
                                >
                                    <StepLabel error={step1Error}>
                                        {step.label}
                                    </StepLabel>
                                </Step> :
                                    index === 1 ?
                                        // STEP 2
                                        <Step key={index} completed={index === 2}>
                                            <StepLabel error={!!step2Error}>
                                                {step.label}
                                            </StepLabel>
                                        </Step> :
                                        undefined
                                // STEP 3
                                // <Step key={index} onClick={() => setActiveStep(index)}>
                                //     <StepButton color="inherit" onClick={handleStep(index)}>
                                //         <StepLabel>
                                //             {step.label}
                                //         </StepLabel>
                                //     </StepButton>
                                // </Step>
                            ))}
                        </Stepper>

                        {activeStep === 0 && (
                            <Step1 errors={errors} register={register} user={user} setValue={setValue} />
                        )}
                        {activeStep === 1 && (
                            <Step2 user={user} isProfile={isProfile} register={register} selectedRoleIds={selectedRoleIds} setSelectedRoleIds={setSelectedRoleIds} setStep2Error={setStep2Error} step2Error={step2Error} />
                        )}
                        {/* for social */}
                        {/* {activeStep === 2 && (
                            <Step3 user={user} register={register} watch={watch} inAdd={inAdd} />
                        )} */}
                    </DialogContent>
                    <CommonFooter>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                            <Button size='large'
                                color="primary"
                                variant='outlined'
                                disabled={activeStep === 0}
                                onClick={handlePrev}
                            >
                                Back
                            </Button>

                            {!isLast ? <Button type="submit" variant='contained'>Next</Button> : <ButtonWithLoading
                                color='success'
                                type='submit'
                                loading={loading}
                                loadingText='Submitting...'
                                onClick={checkError2}
                            >
                                Submit
                            </ButtonWithLoading>}
                        </Box>
                    </CommonFooter>
                </form>
            }
        />
    );
});

export default Add_Employee_Modal;




