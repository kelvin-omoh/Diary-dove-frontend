import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/DiaraDove Logo.png";
import { StepConnector } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";

import Step2 from "../components/_settingUp/Step2";
import Step1 from "../components/_settingUp/Step1";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/userContext";
import axiosInstance from "../Utils/axiosInstance";
import toast from "react-hot-toast";

// Custom connector to show line between steps with a specific width
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    alternativeLabel: {
        top: 22,
        left: "calc(0% + 0px)", // Center the connector line
        right: "calc(0% + 50px)",
    },
    active: {
        "& .MuiStepConnector-line": {
            borderColor: "white",
        },
    },
    completed: {
        "& .MuiStepConnector-line": {
            borderColor: "grey",
        },
    },
    line: {
        borderColor: "grey",
        borderTopWidth: 2,
        borderRadius: 1,
        width: "300px",
    },
}));

const SetUp = () => {
    const { userInfo, setAuthInfo } = useContext(Usercontext)
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // useEffect(() => {
    //     if (userInfo.setup === true) {
    //         navigate("/dashboard")
    //     }
    // }, [userInfo])

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get("api/users/personalinfo", {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                    "Content-Type": "application/json",
                },
            });

            const newData = response.data.data;
            const updatedData = { ...userInfo };

            newData.forEach((item) => {
                const [key] = Object.keys(item);
                const [value] = Object.values(item);
                if (!(key in updatedData)) {
                    updatedData[key] = value;
                }
            });
            setAuthInfo(updatedData);

            const userDataArray = response.data.data;
            const userDataObject = userDataArray.reduce((acc, item) => {
                const entries = Object.entries(item);
                if (entries.length > 0) {
                    const [key, value] = entries[0];
                    acc[key] = value;
                }
                return acc;
            }, {});


        } catch (error) {
            toast.error("Error while getting user information");
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);




    return (
        <div className="w-full ">
            <div className='w-fit  overflow-x-hidden flex flex-col text-start  mx-auto items-center '>
                <div className='w-full'>
                    <img className="mt-[40px] mx-6 items-start   md:mt-20 h-12 w-44" src={logo} alt="DiaryDove Logo" />

                </div>
                <div className=''>
                    <h5 className="mt-12 text-[20px] items-start  md:text-[40px] font-semibold">Let's set up a journal for your work</h5>
                    <p className="mt-5 mb-7  items-start flex text-start text-[#8F96A3] text-base">Select reminder preferences below</p>
                </div>

                {activeStep === 0 && <Step1 activeStep={activeStep} handleNext={handleNext} />}
                {activeStep === 1 && <Step2 activeStep={activeStep} handleNext={handleNext} />}
            </div>






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
