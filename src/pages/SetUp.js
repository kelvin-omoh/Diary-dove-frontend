import React, { useState } from 'react';
import logo from '../assets/DiaraDove Logo.png';
import { Stepper, Step, StepLabel, StepConnector, } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

import Step2 from '../components/_settingUp/Step2';
import Step1 from '../components/_settingUp/Step1';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Create a theme to customize the active step label color
const theme = createTheme({
    components: {
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    '&.Mui-active': {
                        color: 'white', // Set the active step label color to white
                    },
                },
            },
        },
    },
});

// Custom connector to show line between steps with a specific width
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    alternativeLabel: {
        top: 22,
        left: 'calc(0% + 0px)', // Center the connector line
        right: 'calc(0% + 50px)',
    },
    active: {
        '& .MuiStepConnector-line': {
            borderColor: 'white',
        },
    },
    completed: {
        '& .MuiStepConnector-line': {
            borderColor: 'grey',
        },
    },
    line: {
        borderColor: 'grey',
        borderTopWidth: 2,
        borderRadius: 1,
        width: '300px',
    },
}));

const SetUp = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate()




    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <img className="mt-[40px] md:mt-20 h-12 w-44" src={logo} alt="DiaryDove Logo" />

            <div className="mt-[32px] md:mt-[64px]">
                <ThemeProvider theme={theme}>
                    <div className="mx-auto" style={{ width: '200px' }}>
                        <Stepper activeStep={activeStep} connector={<CustomStepConnector />}>
                            <Step>
                                <StepLabel
                                    StepIconComponent={() => (
                                        <div
                                            className={`w-10 h-10 bg-[#DA9658] text-white  flex justify-center items-center rounded-full ${activeStep > 0 ? 'bg-[#DA9658]' : ''
                                                }`}

                                        >
                                            1
                                        </div>
                                    )}
                                />
                            </Step>
                            <Step>
                                <StepLabel
                                    StepIconComponent={() => (
                                        <div
                                            className={`w-10 h-10 flex justify-center items-center rounded-full ${activeStep === 1 ? 'bg-[#DA9658]  text-white ' : 'bg-[#F1F2F3] text-[gray] '
                                                }`}

                                        >
                                            {activeStep > 1 ? '✓' : '2'}
                                        </div>
                                    )}
                                />
                            </Step>
                        </Stepper>
                    </div>
                </ThemeProvider>
            </div>

            <h5 className="mt-12 text-[20px] md:text-[40px] font-semibold">Let's set up a journal for your work</h5>
            <p className="mt-5 mb-7 text-[#8F96A3] text-base">Select reminder preferences below</p>

            {activeStep === 0 && <Step1 />}
            {activeStep === 1 && <Step2 />}

            <button
                className="mt-[72px] mb-[5rem]  w-[300px]  md:w-[400px] py-[16px]  bg-[#DA9658]  bg-primary text-white rounded"
                onClick={activeStep === 1 ? (

                ) => {

                    toast.success('setting up completed!')
                    navigate('/')
                } : handleNext}
            >
                {activeStep === 1 ? 'Done' : 'Continue'}
            </button>



        </div>
    );
};

export default SetUp;
