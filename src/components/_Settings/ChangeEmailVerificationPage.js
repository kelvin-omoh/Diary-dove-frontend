import React, { useContext, useEffect, useState } from 'react';
import Inputs from '../../components/_Verification/Inputs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { Usercontext } from '../../context/userContext';
import axiosInstance from '../../Utils/axiosInstance';
import tick from '../../assets/Tick Circle.png'; // Ensure you import your tick image

const ChangeEmailVerificationPage = () => {
    const navigate = useNavigate();
    const { verifyEmail, logOut, setAuthInfo, setVerifyEmail, userInfo } = useContext(Usercontext);
    const [timer, setTimer] = useState(360); // 6 minutes countdown
    const [otpValues, setOtpValues] = useState(Array(6).fill(''));
    const [otp, setOtp] = useState('');
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // Initially false

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
        const [name, domain] = email.split('@');
        const maskedName = name?.length > 2 ? name[0] + '***' + name[name.length - 1] : name;
        return `${maskedName}@${domain}`;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const fetchUserInfo = async (token) => {
        try {
            const response = await axiosInstance.get('/api/users/personalinfo', {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : '',
                    'Content-Type': 'application/json',
                },
            });

            const newData = response.data.data;
            const updatedData = { ...userInfo, phonenumber: newData.filter((data) => data.phonenumber)[0].phonenumber };
            setAuthInfo(updatedData);
        } catch (error) {
            console.log(error);
            throw new Error('Error while getting user information');
        }
    };

    const handleVerifyEmail = async () => {
        setLoading(true);
        try {
            if (otp.length === 6) {
                const response = await axiosInstance.post(
                    '/api/users/personalinfo/changeemail/verify',
                    { otp },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                await fetchUserInfo(userInfo.token);
                toast.success(response.data.message);
                setIsSuccess(true); // Set success to true
            } else {
                toast.error('OTP verification is incorrect');
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while verifying the email, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center items-center h-[100vh] bg-[#FDFAF7]">
            {isSuccess ? (
                <div className="w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[24px] md:w-[508px] h-[467px] flex justify-center items-center flex-col bg-[#FFF]">
                    <img src={tick} alt="tick" className="mb-[40px] size-[125px]" />
                    <div className="mb-[20px] md:mb-[40px] h-[77px]">
                        <h1 className="font-[600] text-[20px] md:text-[32px] mb-[12px] text-center">
                            Verification Success
                        </h1>
                        <button className="mt-[12px] text-[14px] md:text-[18px]">
                            <span className="text-[#8F96A3]">
                                You have successfully verified your account
                            </span>
                        </button>
                    </div>
                    <button
                        type="submit"
                        onClick={() => {
                            logOut()
                            navigate('/login')
                        }
                        }
                        className="w-full font-[500] rounded-[8px] py-[16px] bg-[#DA9658] text-center text-white"
                    >
                        {loading ? (
                            <div className="text-white items-center gap-3 justify-center flex w-full h-full">
                                Verifying... <CircularProgress size={24} style={{ color: 'white' }} />
                            </div>
                        ) : (
                            'Continue to Login'
                        )}
                    </button>
                </div>
            ) : (
                <div className="w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[80px] md:w-[570px] md:py-[48px] h-[467px] flex justify-center flex-col bg-[#FFF]">
                    <h1 className="font-[600] text-[20px] md:text-[32px] mb-[16px] text-center md:text-start">
                        Verify your email address
                    </h1>
                    <p className="text-[#8F96A3] text-[14px] md:text-[18px] w-full leading-[27px]">
                        A verification email has been sent to your email{' '}
                        <span className="text-[#DA9658]">
                            {verifyEmail?.email?.replace(/(.{4})[^@]+(?=@)/, '$1****')}
                        </span>
                        , copy the code provided in the email to complete your account verification.
                    </p>
                    <Inputs otp={otp} setOtp={setOtp} otpValues={otpValues} setOtpValues={setOtpValues} />
                    <button
                        className="my-[24px] text-[14px] md:text-[18px]"
                        onClick={() => { if (timer === 0) handleVerifyEmail(); }}
                    >
                        <span className={`${timer === 0 ? 'text-[#DA9658]' : ''}`}>
                            Send code again
                        </span>
                        <span className="ml-[20px] text-[#8F96A3]">
                            {!canResend && timer !== 0 && formatTime(timer)}
                        </span>
                    </button>
                    <button
                        type="submit"
                        onClick={handleVerifyEmail}
                        className="w-full font-[500] rounded-[8px] py-[16px] bg-[#DA9658] text-center text-white"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="text-white items-center gap-3 justify-center flex w-full h-full">
                                Verifying... <CircularProgress size={24} style={{ color: 'white' }} />
                            </div>
                        ) : (
                            'Verify'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChangeEmailVerificationPage;
