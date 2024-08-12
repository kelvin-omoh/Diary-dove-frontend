import React, { useContext, useEffect, useState } from 'react'
import { Usercontext } from '../../../context/userContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Inputs from '../Inputs';
import tick from '../../../assets/Tick Circle.png'
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import axiosInstance from '../../../Utils/axiosInstance';


const Verification = () => {

    const navigate = useNavigate()
    const { verifyEmail, logOut } = useContext(Usercontext)
    const [timer, setTimer] = useState(() => {
        const savedTimer = localStorage.getItem('timer');
        return savedTimer !== null ? parseInt(savedTimer, 10) : 360;
    });
    const [canResend, setCanResend] = useState(false);
    const [message, setMessage] = useState("");
    const [otpValues, setOtpValues] = useState(Array(6).fill(''));
    const [otp, setOtp] = useState('');
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Store the timer value in localStorage whenever it changes
        localStorage.setItem('timer', timer);
    }, [timer]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const maskEmail = (email) => {
        const [name, domain] = email.split("@");
        const maskedName = name.length > 2 ? name[0] + "***" + name[name.length - 1] : name;
        return `${maskedName}@${domain}`;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        console.log(verifyEmail);
        if (verifyEmail.length < 0) {
            toast.error("email verification is required ?")
        }
    }, [verifyEmail])




    const verifyOTP = async () => {
        if (!isSuccess) {
            setLoading(true);
            try {

                if (otp.length === 6) {
                    const response = await axiosInstance.post("/api/users/verifyOTP", {
                        email: verifyEmail,
                        otp
                    })

                    localStorage.removeItem('verifyEmail')
                    toast.success(response.data.message)
                    navigate("/new-password")
                } else {
                    toast.error('otp verification is incorrect')
                }

            } catch (error) {
                console.log(error.response.data.message);
                toast.error(error.response.data.message)
            } finally {
                setLoading(false);
            }
        } else {
            logOut()
            navigate("/")
        }


    }

    const handleResendOfCode = async () => {

        try {
            const res = await axiosInstance.post('/api/users/resendOTPCode', {
                email: verifyEmail
            })
            console.log(res);
            toast.success(res.data.message)
            setTimer(360)
        } catch (error) {
            toast.error('');
            toast.error(
                error.response.data.message
            );
        }

    }

    useEffect(() => {
        if (timer === 0) {
            handleResendOfCode()
        }
    }, [timer])



    return (
        <div className=' w-full flex justify-center items-center h-[100vh] bg-[#FDFAF7]'>
            <div className=' w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[24px]  md:w-[508px] h-[467px] flex justify-center items-center flex-col bg-[#Fff]'>
                {isSuccess && <img src={tick} alt={'tick'} className=' mb-[40px] size-[125px]' />}
                <div className={` mb-[20px] md:mb-[40px] ${isSuccess ? 'h-[77px]  ' : ''}  `}>
                    <h1 className={` font-[600] text-[20px] md:text-[32px] ${isSuccess ? 'mb-[12px]' : 'mb-[16px]'}  text-center`}>
                        {isSuccess ? "Verification Success" : "Verify your email address"}
                    </h1>
                    {
                        !isSuccess &&
                        <>

                            <p className=' text-[#8F96A3] text-[14px] md:text-[18px]  w-full leading-[27px] '>A verification email has been sent to your email<span className=' text-[#DA9658]'>  {verifyEmail?.email?.replace(/(.{4})[^@]+(?=@)/, '$1****')}</span>, copy the code provided in the email to complete your account verification.
                            </p>
                            <Inputs otp={otp} setOtp={setOtp} otpValues={otpValues} setOtpValues={setOtpValues} />

                        </>

                    }
                    <button className={`${isSuccess ? 'mt-[12px]' : 'mt-[20px]'} text-[14px] md:text-[18px]`}>
                        {!isSuccess && (
                            <>

                                <span onClick={() => { timer === 0 && handleResendOfCode() }} className={`${timer === 0 ? 'text-[#DA9658]' : ''}`}>
                                    Send code again
                                </span>
                                <span style={{ marginLeft: '20px' }}></span>

                            </>
                        )}

                        <span className='text-[#8F96A3]'>
                            {!isSuccess ? <>
                                {timer !== 0 &&
                                    formatTime(timer)
                                }
                            </>
                                : 'You have successfully verified your account'}
                        </span>

                    </button>
                </div>


                <button type='submit' onClick={() => { verifyOTP() }}

                    className={` w-full font-[500] rounded-[8px]  py-[16px] bg-[#DA9658] text-center text-white ${isSuccess ? 'w-[192px]' : 'w-full'}`}>

                    {loading ? (
                        <div className=" text-white items-center gap-3 justify-center flex w-full h-full">
                            Verifying...  <CircularProgress size={24} style={{ color: 'white' }} />
                        </div>


                    ) : (
                        <>  {isSuccess ? 'Continue to Login' : 'Verify'} </>
                    )}
                </button>


            </div>
        </div>
    )
}

export default Verification
