import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Usercontext } from '../context/userContext';
import PhoneInput from 'react-phone-input-2'; // Assuming this is the library you are using
import 'react-phone-input-2/lib/style.css'; // Ensure styles are imported
import axiosInstance from '../Utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const stripCountryCode = (number, country) => {
    const countryCode = `+${country.dialCode}`;
    return number.startsWith(countryCode) ? number.replace(countryCode, '') : number;
};


const ChangePhoneNumber = () => {
    const [timer, setTimer] = useState(() => {
        const savedTimer = localStorage.getItem('timer');
        return savedTimer !== null ? parseInt(savedTimer, 10) : 360;
    });
    const [canResend, setCanResend] = useState(false);
    const [number, setNumber] = useState('');

    const [otp, setOtp] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const { setAuthInfo, userInfo, resetTimer, whatsappNumber, handleVerifyWhatsapp, setWhatsappNumber } = useContext(Usercontext);


    const navigate = useNavigate()


    useEffect(() => {
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


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };




    const handlePhoneNumberChange = (value) => {
        setNumber(value);
    };

    const validatePhoneNumber = (value, country, countries, hiddenAreaCodes) => {
        const strippedNumber = stripCountryCode(value, country);
        const isValidLength = strippedNumber.length === 13;
        if (isValidLength) {
            setError('');
            return true;
        } else {
            setError('Invalid phone number: Must be exactly 10 digits after the country code');
            return false;
        }
    };

    useEffect(() => {
        if (userInfo.phonenumber < 9) {
            setNumber(userInfo.phonenumber)
        }
    }, [userInfo])

    const stripCountryCode = (number, country) => {
        const countryCode = `+${country.dialCode}`;
        return number.startsWith(countryCode) ? number.replace(countryCode, '') : number;
    };




    const handleVerify = async () => {
        try {
            setLoading(true);
            const formattedNumber = `+${number}`;

            const res = await axiosInstance.post("/api/users/personalinfo/changephonenumber", {
                phonenumber: formattedNumber,
            }, {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                    "Content-Type": "application/json",
                }
            });
            setLoading(false);
            toast.success(res.data.message);
            setTimer(360);
            resetTimer()
            handleVerifyWhatsapp(number)
            navigate("/change/phoneNumber/verify")
        } catch (error) {
            setLoading(false);
            console.log(error.response.data.message);
            toast.error(
                error?.response?.data?.message
            );
        }
    };





    return (
        <div className='w-full flex text-center justify-center items-center h-[100vh] bg-[#FDFAF7]'>
            <div className='w-[342px] mx-auto text-center shadow-sm rounded-[8px] px-[22px] md:px-[48px] md:w-[570px] md:py-[48px] h-[400px] md:h-auto flex justify-center flex-col bg-[#Fff]'>
                <h1 className='font-[600] text-[20px] md:text-[32px] mb-[16px] text-center '>
                    Verify your whatsapp number
                </h1>
                <p className='text-[14px]  md:text-[18px] mb-[24px] md:text-center text-center text-[#8F96A3]'>
                    Enter  your new phone number.
                </p>
                <div className=" flex w-[219px]  mb-[24px] mx-auto flex-col md:text-center items-start gap-3">
                    <PhoneInput
                        country={'ng'}
                        placeholder="Enter phone number"
                        value={number}
                        onChange={handlePhoneNumberChange}
                        isValid={validatePhoneNumber}
                        className="text-[#262728] ease-in delay-75 transition-all my-[8px] mt-[1rem] outline-none rounded-[8px]"
                    />
                    {error && (
                        <p className="error-message text-red-500">{error}</p>
                    )}
                </div>

                <button
                    type='submit'
                    onClick={handleVerify}
                    className='w-full font-[500] rounded-[8px] py-[16px] bg-[#DA9658] text-center text-white'
                    disabled={loading}
                >
                    {loading ? (
                        <div className='text-white items-center gap-3 justify-center flex w-full h-full'>
                            Verifying... <CircularProgress size={24} style={{ color: 'white' }} />
                        </div>
                    ) : (
                        'Verify'
                    )}
                </button>
            </div>
        </div>
    )
}

export default ChangePhoneNumber