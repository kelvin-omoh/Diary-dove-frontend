import React, { useState } from 'react'
import { Layout } from '../components/_Settings/Layout'
import { BsKey, BsPerson } from 'react-icons/bs'
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate()
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});



    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (validate()) {
            const res = await axios.post('api/users/newpassword', {
                // email: verifyEmail,
                password: newPassword

            })
            toast.success(res.data.message)
            navigate('/login')
        }

    }

    const validate = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!newPassword) {
            errors.newPassword = 'New password is required.';
        } else if (!passwordRegex.test(newPassword)) {
            errors.newPassword = 'Password must be at least 8 characters long, contain at least one letter and one number.';
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm password is required.';
        } else if (newPassword !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    return (
        <Layout>
            <div>
                <div className=' flex items-center    gap-[24px]'>
                    <p>Update profile picture</p>
                    <button className=' py-[8px] w-[100px] rounded-[8px] text-white bg-[#DA9658] px-[24px] leading-[24px] '>Upload</button>
                    <button className=' py-[8px] w-[100px]  rounded-[8px] border border-[#e3e3e3]   bg-[#ffffff] px-[24px] leading-[24px] '>Remove</button>
                </div>
                <form className=' w-[832px] flex flex-col justify-center gap-[32px] text-start mt-[60px] py-[24px]' action="">
                    <label htmlFor="">
                        <p className=' text-[#8F96A3] mb-[24px] text-[18px] leading-[27px]'>Personal Information</p>

                        <div className=' flex items-center gap-[32px]'>
                            <div>
                                <h1 className=' text-[16px] leading-[24px] '>Full Name</h1>
                                <div className=' flex h-[56px] w-[400px] px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[2px] rounded-[8px] '>
                                    <BsPerson className=' text-[#B4B9C2]' />
                                    <input className=' border-none outline-none ' type="text" placeholder='Steven Ade***' />
                                </div>
                            </div>

                            <div>
                                <h1 className=' text-[16px] leading-[24px] '>User Name</h1>
                                <div className=' flex h-[56px] w-[400px] px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[2px] rounded-[8px] '>
                                    <BsPerson className=' text-[#B4B9C2]' />
                                    <input className=' border-none outline-none ' type="text" placeholder='Steven Ade***' />
                                </div>
                            </div>
                        </div>
                    </label>
                    <label htmlFor="">
                        <div className=' mb-[24px]   border-b-[3px] border-[#F1F2F3] flex items-center gap-[32px]'>
                            <div>
                                <h1 className=' text-[16px] leading-[24px] '>Email address</h1>
                                <div className=' flex h-[56px] w-[400px] justify-between items-center gap-[8px] rounded-[8px] '>
                                    <p className='text-[#8F96A3]'>Your email address is Steven***@gmail.com</p>
                                    <button onClick={() => navigate('/change-email')} className=' text-[#DA9658] '>Change</button>
                                </div>
                            </div>
                            <div>
                                <h1 className=' text-[16px] leading-[24px] '>Phone Number</h1>
                                <div className=' flex h-[56px] w-[400px] justify-between items-center gap-[8px] rounded-[8px] '>
                                    <p className='text-[#8F96A3]'>090 555 ****</p>
                                    <button className=' text-[#DA9658] '>Change</button>
                                </div>
                            </div>
                        </div>

                        <div className=' mt-[24px]'>
                            <p className=' text-[#8F96A3] mt-[24px] text-[18px] leading-[27px]'>Security and Privacy</p>

                            <div className=' flex  items-center gap-[32px]'>
                                <div className=' w-[400px] '>
                                    <h1 className=' text-[16px] leading-[24px] '>Current password</h1>
                                    <div className={`${errors.confirmPassword ? 'border-red-500' : ''} flex  h-[56px] relative w-full px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[2px] rounded-[8px] `}>
                                        <FaKey className=' text-[#B4B9C2]' />
                                        <input
                                            type={confirmPasswordVisible ? 'text' : 'password'}
                                            placeholder='Enter password'
                                            className={` outline-none w-full`}
                                            id="confirm-password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                                        >
                                            {!confirmPasswordVisible ? <FaEyeSlash className='text-[#8F96A3]' /> : <FaEye className='text-[#8F96A3]' />}
                                        </button>
                                    </div>
                                </div>

                                <div className=' w-[400px] '>
                                    <h1 className=' text-[16px] leading-[24px] '>New password</h1>
                                    <div className={`${errors.confirmPassword ? 'border-red-500' : ''} flex  h-[56px] relative w-full px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[2px] rounded-[8px] `}>
                                        <FaKey className=' text-[#B4B9C2]' />
                                        <input
                                            type={newPasswordVisible ? 'text' : 'password'}
                                            placeholder='Enter password'
                                            className={` outline-none w-full`}
                                            id="confirm-password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleNewPasswordVisibility}
                                            className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                                        >
                                            {!newPasswordVisible ? <FaEyeSlash className='text-[#8F96A3]' /> : <FaEye className='text-[#8F96A3]' />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>

                    <button className="bg-[#DA9658] mt-[142px] w-[359px] h-[60px] rounded-[8px] text-center text-white">Save changes</button>



                </form>

            </div>
        </Layout>
    )
}

export default Settings
