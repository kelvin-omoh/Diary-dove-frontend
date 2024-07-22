import axios from 'axios';
import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import { Usercontext } from '../context/userContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const CreateNewPassword = () => {
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { verifyEmail } = useContext(Usercontext)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (validate()) {
                const res = await axios.post('api/users/newpassword', {
                    email: verifyEmail,
                    password: newPassword,
                    confirmPassword: confirmPassword
                })
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
        return Object.keys(errors)?.length === 0;
    };

    return (
        <div className='w-full flex justify-center items-center h-[100vh] bg-[#FDFAF7]'>
            <div className='text-start w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[80px] md:w-[570px] py-[24px] md:py-[48px]  flex justify-center flex-col m-0 bg-[#ffffff]'>
                <h1 className='font-[600] text-[20px] md:text-[32px] '>Create a new password</h1>
                <p className='text-[#8F96A3] mt-[16px] mb-[24px] md:mb-[48px]'>The new password should not be the same as the previous one</p>
                <form className='flex flex-col gap-[16px]' onSubmit={(e) => handleResetPassword(e)}>
                    <label className='flex flex-col text-[14px] md:text-[16px]' htmlFor="new-password">
                        New Password
                        <div className='relative'>
                            <input
                                type={newPasswordVisible ? 'text' : 'password'}
                                placeholder='Enter password'
                                className={`mt-[8px] p-[16px] border ${errors.newPassword ? 'border-red-500' : 'border-[#B4B9C2]'} rounded-[8px] w-full`}
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={toggleNewPasswordVisibility}
                                className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                            >
                                {!newPasswordVisible ? <FaEyeSlash className='text-[#8F96A3]' /> : <FaEye className='text-[#8F96A3]' />}
                            </button>
                        </div>
                        {errors.newPassword && <span className='text-red-500'>{errors.newPassword}</span>}
                    </label>
                    <label className='flex flex-col text-[14px] md:text-[16px]' htmlFor="confirm-password">
                        Confirm Password
                        <div className='relative'>
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                placeholder='Enter password'
                                className={`mt-[8px] p-[16px] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#B4B9C2]'} rounded-[8px] w-full`}
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
                        {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword}</span>}
                    </label>
                    <button type="submit" className='mt-[16px] py-[12px] md:p-y[16px] bg-[#DA9658] text-white rounded-[8px]'>

                        {loading ? (
                            <div className=" text-white items-center gap-3 justify-center flex w-full h-full">
                                Submitting...  <CircularProgress size={24} style={{ color: 'white' }} />
                            </div>


                        ) : (
                            'Submit'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewPassword
