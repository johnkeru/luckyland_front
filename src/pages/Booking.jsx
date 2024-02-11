import {
    Button,
    Step,
    Stepper,
    Typography
} from "@material-tailwind/react";
import React, { useState } from 'react';
import { FaBed, FaCalendarAlt, FaCheckCircle, FaUser } from "react-icons/fa";
import BookingCalendar2 from '../components/booking/BookingCalendar2'
import ReusableHero from "../components/landing/ReusableHero";

const steps = [
    {
        label: 'Select Dates',
        icon: <FaCalendarAlt className="h-full w-full" />
    },
    {
        label: 'Services & Rooms',
        icon: <FaBed className="h-full w-full" />
    },
    {
        label: 'Guest Information',
        icon: <FaUser className="h-full w-full" />
    },
    {
        label: 'Confirm Booking',
        icon: <FaCheckCircle className="h-full w-full" />
    }
];


const Booking = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    return (
        <ReusableHero
            noSlide
            children={
                <form className="w-3/4">
                    <div className='px-10 m-auto '>
                        <Stepper
                            activeStep={activeStep}
                            isLastStep={(value) => setIsLastStep(value)}
                            isFirstStep={(value) => setIsFirstStep(value)}
                        >
                            {steps.map((step, index) => (
                                index === 0 ? <Step key={index} className="p-1 h-6 w-6" onClick={() => setActiveStep(index)}
                                    activeClassName="bg-green-400"
                                    completedClassName="bg-green-400"
                                >
                                    {step.icon}
                                    <div className={`absolute -bottom-[2.3rem] w-max text-center text-xs text-white`}>
                                        <Typography variant="h6" color="inherit">{step.label}</Typography>
                                    </div>
                                </Step> :
                                    index === 1 ?
                                        <Step key={index} className="p-1 h-6 w-6" onClick={() => setActiveStep(index)}
                                            activeClassName="bg-green-400"
                                            completedClassName="bg-green-400"
                                        >
                                            {step.icon}
                                            <div className={`absolute -bottom-[2.3rem] w-max text-center text-xs text-white`}>
                                                <Typography variant="h6" color="inherit">{step.label}</Typography>
                                            </div>
                                        </Step> :
                                        <Step key={index} className="p-1 h-6 w-6" onClick={() => setActiveStep(index)}
                                            activeClassName="bg-green-400"
                                            completedClassName="bg-green-400"
                                        >
                                            {step.icon}
                                            <div className={`absolute -bottom-[2.3rem] w-max text-center text-xs text-white`}>
                                                <Typography variant="h6" color="inherit">{step.label}</Typography>
                                            </div>
                                        </Step>
                            ))}
                        </Stepper>
                    </div>

                    <div className="bg-white py-5 px-10 rounded-2xl mt-20">
                        <div className="bg-red-500 ">
                            {activeStep === 0 && (
                                <BookingCalendar2 />
                            )}
                            {activeStep === 1 && (
                                <h1>step 2</h1>
                            )}
                            {activeStep === 2 && (
                                <h1>step 3</h1>
                            )}
                        </div>

                        <div className="w-full flex justify-between mt-20">
                            <Button onClick={handlePrev} disabled={isFirstStep}>
                                Prev
                            </Button>
                            {
                                isLastStep ? <Button type="submit">Submit</Button> :
                                    <Button type="button" onClick={handleNext}>Next</Button>
                            }
                        </div>
                    </div>
                </form>
            }
        />
    );
};

export default Booking;

