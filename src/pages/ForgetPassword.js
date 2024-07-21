
import axios from 'axios'
import toast from 'react-hot-toast'
import { Usercontext } from '../context/userContext'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
const ForgetPassword = () => {


    const { handleVerifyEmail } = useContext(Usercontext)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleResendOfCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleVerifyEmail(email);
            const res = await axios.post('/api/users/resendOTPCode', {
                email
            });
            await handleVerifyEmail(email);
            toast.success(res.data.message);
            navigate('/verify-email');
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while resending code, please try again later.....');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className=' w-full flex justify-center items-center h-[100vh] bg-[#FDFAF7]'>
            <div className=' w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[80px]  md:w-[570px] py-[24px] md:py-[48px] h-[467px] flex justify-center flex-col bg-[#Fff]'>
                <h1 className={` font-[600] text-[20px] md:text-[32px] mb-[16px] text-start`}>
                    Forgot Password
                </h1>
                <p className='text-[14px] md:text-[18px] mb-[48px] text-start text-[#8F96A3]'>Input your email address below to get your password reset code (OTP)</p>
                <form className=' text-start' onSubmit={(e) => { handleResendOfCode(e) }} action="">
                    <label className=" text-[14px] md:text-[18px] flex flex-col justify-start w-full text-start" htmlFor="">
                        Email
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='mt-[8px] p-[16px]  border border-[#B4B9C2] rounded-[8px] ' type="text" placeholder='Steven***@gmail.com' name="" id="" />
                    </label>
                    <button type='submit' className='bg-[#DA9658] mt-[24px] mb-[16px] text-white w-full rounded-[8px] h-[59px] flex justify-center items-center'>
                        {loading ? (
                            <div className=" text-white items-center gap-3 justify-center flex w-full h-full">
                                Sending...  <CircularProgress size={24} style={{ color: 'white' }} />
                            </div>


                        ) : (
                            'Send OTP'
                        )}
                    </button>
                    <p className=' mt-[16px] text-[14px] text-start'>Don’t have an account yet? <Link to={'/sign-up'} className=' text-[#DA9658]'>Sign Up</Link> </p>
                </form>

            </div>
        </div>
    )
}

export default ForgetPassword
