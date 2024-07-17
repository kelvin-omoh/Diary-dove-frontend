import React, { useContext, useState } from 'react';
import logo from '../assets/DiaraDove Logo.png';
import { Stepper, Step, StepLabel, StepConnector, } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

import Step2 from '../components/_settingUp/Step2';
import Step1 from '../components/_settingUp/Step1'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Usercontext } from '../context/userContext';


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
    const { userInfo } = useContext(Usercontext)
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate()




    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <div className="w-full  overflow-x-hidden flex flex-col text-start mx-auto items-center">
            <div>
                <img className="mt-[40px] flex md:mt-20 h-12 w-44" src={logo} alt="DiaryDove Logo" />
            </div>
            <div className=' text-start items-start'>
                <h5 className="mt-12 text-[20px] items-start  md:text-[40px] font-semibold">Let's set up a journal for your work</h5>
                <p className="mt-5 mb-7  items-start flex text-start text-[#8F96A3] text-base">Select reminder preferences below</p>

            </div>


            {activeStep === 0 && <Step1 activeStep={activeStep} handleNext={handleNext} />}
            {activeStep === 1 && <Step2 activeStep={activeStep} handleNext={handleNext} />}





            {/* <button
                className="mt-[72px] mb-[5rem]  w-[300px]  md:w-[400px] py-[16px]  bg-[#DA9658]  bg-primary text-white rounded"
                onClick={activeStep === 1 ? (

                ) => {

                    toast.success('setting up completed!')
                    navigate('/')
                } : handleNext}
            >
                {activeStep === 1 ? 'Done' : 'Continue'}
            </button> */}



        </div>
    );
};

export default SetUp;
