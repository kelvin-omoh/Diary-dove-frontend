import React, { useContext, useEffect, useState } from 'react'
import Inputs from '../components/_Verification/Inputs'
import { useNavigate } from 'react-router-dom'
import { Usercontext } from '../context/userContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const VerifyEmail = () => {

    const navigate = useNavigate()
    const { verifyEmail, setVerifyEmail } = useContext(Usercontext)
    const [timer, setTimer] = useState(360); // 6 minutes countdown
    const [otpValues, setOtpValues] = useState(Array(6).fill(''));
    const [otp, setOtp] = useState('');
    const [canResend, setCanResend] = useState


        (false);
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

    const handleVerifyEmail = async () => {
        try {
            if (otp.length === 6) {
                const response = await axios.post("/api/users/verifyOTP", {
                    email: verifyEmail,
                    otp
                })
                toast.success(response.data.message)
                navigate('/new-password');

            } else {
                toast.error('otp verification is incorrect')
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while verifying email, please try again later.....')
        }
    }


    return (
        <div className=' w-full flex justify-center items-center h-[100vh] bg-[#FDFAF7]'>
            <div className=' w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[80px]  md:w-[570px] md:py-[48px] h-[467px] flex justify-center flex-col bg-[#Fff]'>

                <h1 className={` font-[600] text-[20px] md:text-[32px] mb-[16px] text-center md:text-start`}>
                    Please check your email
                </h1>
                <p className='text-[14px] md:text-[18px] mb-[24px] text-start text-[#8F96A3]'> We have sent the OTP code to your email</p>
                <Inputs otp={otp} setOtp={setOtp} otpValues={otpValues} setOtpValues={setOtpValues} />
                <button className={`my-[24px] text-[14px] md:text-[18px]`}>
                    <>

                        <span onClick={() => { timer === 0 && handleResendOfCode() }} className={`${timer === 0 ? 'text-[#DA9658]' : ''}`}>
                            Send code again
                        </span>
                        <span style={{ marginLeft: '20px' }}></span>

                    </>


                    <span className='text-[#8F96A3]'>
                        {!canResend && <>
                            {timer !== 0 &&
                                formatTime(timer)
                            }
                        </>
                        }
                    </span>

                </button>

                <button type='submit' onClick={() => {
                    handleVerifyEmail()

                }}

                    className={` w-full font-[500] rounded-[8px]  py-[16px] bg-[#DA9658] text-center text-white  `}>
                    Verify
                </button>





            </div>

        </div>
    )
}

export default VerifyEmail
