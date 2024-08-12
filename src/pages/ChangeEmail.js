import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Usercontext } from '../context/userContext'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'
import axiosInstance from '../Utils/axiosInstance'

const ChangeEmail = () => {
    const { userInfo, handleVerifyEmail } = useContext(Usercontext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.post('/api/users/personalinfo/changeemail', {
                email
            }, {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : '',
                    'Content-Type': 'application/json'
                }
            });

            toast.success(res.data.message);
            handleVerifyEmail(email)
            navigate("/change/email/verify")
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to change the password. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full flex justify-center items-center h-[100vh] bg-[#FDFAF7]'>
            <div className='text-start w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[80px] md:w-[570px] py-[24px] md:py-[48px]  flex justify-center flex-col m-0 bg-[#ffffff]'>
                <h1 className='font-[600] text-[20px] md:text-[32px] '>Change email address</h1>

                <p className='text-[#8F96A3] mt-[16px] mb-[24px] md:mb-[48px]'>Input your new email address below to get your reset code (OTP)</p>

                <form className='flex flex-col gap-[16px]' onSubmit={handleSendOtp}>
                    <label className='flex flex-col text-[14px] md:text-[16px]' htmlFor="new-password">
                        Email
                        <div className='relative'>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Steven***@gmail.com'
                                className={`mt-[8px] p-[16px] border border-[#B4B9C2] rounded-[8px] w-full`}
                                id="new-password"

                            />
                        </div>

                    </label>
                    <button type="submit" className='mt-[16px] py-[12px] md:p-y[16px] bg-[#DA9658] text-white rounded-[8px]'>


                        {loading ? (
                            <div className=" text-white items-center gap-3 justify-center flex w-full h-full">
                                Sending...  <CircularProgress size={24} style={{ color: 'white' }} />
                            </div>


                        ) : (
                            'Send OTP'
                        )}
                    </button>
                </form>

            </div>
        </div >
    )
}

export default ChangeEmail
