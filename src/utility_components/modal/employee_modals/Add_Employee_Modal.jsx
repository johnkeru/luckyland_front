import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    DialogBody,
    DialogFooter,
    Step,
    Stepper,
    Typography
} from "@material-tailwind/react";
import React, { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaInfo } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import * as yup from 'yup';
import Modal from '../Modal';
import Step1 from './add_emp_form/Step1';
import Step2 from './add_emp_form/Step2';
import Step3 from './add_emp_form/Step3';

const steps = [
    {
        label: 'Personal Info',
        icon: <FaInfo className="h-full w-full" />
    },
    {
        label: 'Account Info',
        icon: <RiAccountCircleFill className="h-full w-full" />
    },
    {
        label: 'Socials',
        icon: <IoShareSocialSharp className="h-full w-full" />
    },
]

const Add_Employee_Modal = forwardRef(({ isEmp, isProfile, user, button, handleAdd, handleUpdate, }, ref) => {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    const buildSchema = (isEditMode) => {
        const baseSchema = {
            firstName: yup.string().required('First Name is required').min(2, 'At least 2 characters'),
            middleName: yup.string(),
            lastName: yup.string().required('Last Name is required').min(2, 'At least 2 characters'),
            email: yup.string().email('Invalid email').required('Email is required'),
            phone: yup.string().required('Phone number is required').min(10, 'At least 10 characters'),
            street: yup.string().required('Street is required').min(2, 'At least 2 characters'),
            state: yup.string().required('State is required').min(2, 'At least 2 characters'),
            city: yup.string().required('City is required').min(2, 'At least 2 characters'),
            zip_code: yup.string(),
            graduated_at: yup.string(),
            description: yup.string(),
            facebook: yup.string(),
            instagram: yup.string(),
            twitter: yup.string(),
        };

        // Add password validation only if not in edit mode
        if (!isEditMode) {
            baseSchema.password = yup.string().required('Password number is required').min(5, 'At least 5 characters');
        }

        return yup.object().shape(baseSchema);
    };

    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm({
        resolver: yupResolver(buildSchema(isEmp || isProfile)),
    });

    const step1Error = Object.keys(errors).length > 0;
    const [step2Error, setStep2Error] = useState('');

    const [selectedRoleIds, setSelectedRoleIds] = useState((user && user?.roles && isEmp) ? user.roles.map(r => r.id) : []);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const checkError2 = () => {
        if ((!isProfile) && selectedRoleIds.length === 0) {
            setStep2Error('Must select role/s for employee.');
        }
    }

    const onSubmit = (data) => {
        // this will exclude the unique fields, so that when it didn't change it won't look to the unique constraint of the db.
        if (isEmp || isProfile) {
            const origEmail = user.email;
            const origPhone = user.phone;
            if (data.email === origEmail) delete data.email;
            if (data.phone === origPhone) delete data.phone;
        }
        // Conditionally add https:// to fb, ig, twitter fields
        const formattedData = {
            ...data,
            facebook: data.facebook ? data.facebook.startsWith('http') ? data.facebook : `https://fb.com/${data.facebook}` : undefined,
            instagram: data.instagram ? data.instagram.startsWith('http') ? data.instagram : `https://instagram.com/${data.instagram}` : undefined,
            twitter: data.twitter ? data.twitter.startsWith('http') ? data.twitter : `https://twitter.com/${data.twitter}` : undefined,
        };

        const hasRoles = !isProfile ? { roles: selectedRoleIds } : {};
        const body = Object.assign(formattedData, hasRoles);

        const handleClearState = () => {
            reset();
            setSelectedRoleIds([]);
            setActiveStep(0);
            handleClose();
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
        setOpen(false)
    };



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
                    <DialogBody>
                        {activeStep === 0 && (
                            <Step1 errors={errors} register={register} user={user} />
                        )}
                        {activeStep === 1 && (
                            <Step2 user={user} isProfile={isProfile} register={register} selectedRoleIds={selectedRoleIds} setSelectedRoleIds={setSelectedRoleIds} setStep2Error={setStep2Error} step2Error={step2Error} />
                        )}
                        {activeStep === 2 && (
                            <Step3 user={user} register={register} />
                        )}
                        <div className='px-10 m-auto'>
                            <Stepper
                                activeStep={activeStep}
                                isLastStep={(value) => setIsLastStep(value)}
                                isFirstStep={(value) => setIsFirstStep(value)}
                                className='mt-10'
                            >
                                {steps.map((step, index) => (
                                    index === 0 ? <Step key={index} className="p-1 h-6 w-6" onClick={() => setActiveStep(index)}
                                        activeClassName={(step1Error) ? "bg-red-500" : undefined}
                                        completedClassName={(step1Error) ? "bg-red-500" : undefined}
                                    >
                                        {step.icon}
                                        <div className={`absolute -bottom-[2.3rem] w-max text-center text-xs ${(step1Error) ? 'text-red-500' : 'text-gray-700'}`}>
                                            <Typography variant="h6" color="inherit">{step.label}</Typography>
                                        </div>
                                    </Step> :
                                        index === 1 ?
                                            <Step key={index} className="p-1 h-6 w-6" onClick={() => setActiveStep(index)}
                                                activeClassName={(step2Error) ? "bg-red-500" : undefined}
                                                completedClassName={(step2Error) ? "bg-red-500" : undefined}
                                            >
                                                {step.icon}
                                                <div className={`absolute -bottom-[2.3rem] w-max text-center text-xs ${(step2Error) ? 'text-red-500' : 'text-gray-700'}`}>
                                                    <Typography variant="h6" color="inherit">{step.label}</Typography>
                                                </div>
                                            </Step> :
                                            <Step key={index} className="p-1 h-6 w-6" onClick={() => setActiveStep(index)}>
                                                {step.icon}
                                                <div className={`absolute -bottom-[2.3rem] w-max text-center text-xs text-gray-700`}>
                                                    <Typography variant="h6" color="inherit">{step.label}</Typography>
                                                </div>
                                            </Step>
                                ))}
                            </Stepper>
                        </div>
                    </DialogBody>
                    <DialogFooter className='mt-20'>
                        <div className="w-full flex justify-between">
                            <Button onClick={handlePrev} disabled={isFirstStep}>
                                Prev
                            </Button>
                            {
                                isLastStep ? <Button type="submit" loading={loading} onClick={checkError2}>Submit</Button> :
                                    <Button type="button" onClick={handleNext}>Next</Button>
                            }
                        </div>
                    </DialogFooter>
                </form>
            }
        />
    );
});

export default Add_Employee_Modal;

