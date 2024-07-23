import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Usercontext } from '../../context/userContext';

const ChangePasswordDialog = ({ handleClose, open, onClose }) => {
    const navigate = useNavigate();
    const { userInfo } = useContext(Usercontext);
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const toggleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisible(!currentPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const res = await axios.post('/api/users/personalinfo/changepassword', {
                    oldpassword: currentPassword,
                    password: newPassword,
                    confirmPassword: confirmPassword
                }, {
                    headers: {
                        Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : '',
                        'Content-Type': 'application/json'
                    }
                });
                toast.success(res.data.message);
                handleClose()
                setConfirmPassword("")
                setCurrentPassword("")
                setNewPassword("")
                navigate('/settings');
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || 'Failed to change the password. Please try again.');
            }
        }
    };
    const validate = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!currentPassword) {
            errors.currentPassword = 'Current password is required.';
        }

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
        <div className=' overflow-x-hidden shadow-2xl'>
            <Dialog
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className=' shadow-2xl overflow-x-hidden rounded-[30px]'
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0px 4px 8px 0px white', // Adjust the color to achieve the shadow effect
                        borderRadius: '30px',
                        // Ensure the corners are rounded

                    }
                }}
            >
                <DialogContent
                    sx={{
                        boxShadow: '0px 4px 8px 0px #FFFFFF',
                        bgcolor: '#FFFFFF',
                    }}
                    className=' mt-[24px] overflow-hidden md:mt-[48px] shadow-red-600 shadow-2xl  mx-[24px] md:mx-[80px]'
                >
                    <h1 className='text-[20px]  md:text-[32px] mb-[16px] font-[600] leading-[38px]'>Change password</h1>
                    <p className='text-[#8F96A3] text-[14px] md:text-[16px] font-[400]'>The new password should not be the same as the previous one</p>
                    <form onSubmit={handleResetPassword} className=" overflow-x-hidden w-full md:w-[400px]">
                        <div className='flex flex-col w-full items-center gap-[16px]'>
                            <div className=' mt-[32px] md:mt-[48px] w-full md:w-[412px]'>
                                <h1 className=' text-[14px] md:text-[16px] leading-[24px] '>Current password</h1>
                                <div className={`${errors.currentPassword ? 'border-red-500' : ''} flex h-[56px] relative w-full px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[1px] rounded-[8px]`}>
                                    <FaKey className='text-[#B4B9C2]' />
                                    <input
                                        type={currentPasswordVisible ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        className=' text-[14px] md:text-[16px]outline-none w-full'
                                        id="current-password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleCurrentPasswordVisibility}
                                        className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                                    >
                                        {!currentPasswordVisible ? <FaEyeSlash className='text-[#8F96A3]' /> : <FaEye className='text-[#8F96A3]' />}
                                    </button>
                                </div>
                            </div>

                            <div className='w-full'>
                                <h1 className=' text-[14px] md:text-[16px] leading-[24px] '>New password</h1>
                                <div className={`${errors.newPassword ? 'border-red-500' : ''} flex h-[56px] relative w-full px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[1px] rounded-[8px]`}>
                                    <FaKey className='text-[#B4B9C2]' />
                                    <input
                                        type={newPasswordVisible ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        className=' text-[14px] md:text-[16px]outline-none w-full'
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
                            </div>

                            <div className='w-full'>
                                <h1 className=' text-[14px] md:text-[16px] leading-[24px] '>Confirm New Password</h1>
                                <div className={`${errors.confirmPassword ? 'border-red-500' : ''} flex h-[56px] relative w-full px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[1px] rounded-[8px]`}>
                                    <FaKey className='text-[#B4B9C2]' />
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        className=' text-[14px] md:text-[16px]outline-none w-full'
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

                            <button
                                type="submit"
                                className='bg-[#DA9658] text-center mt-[8px] rounded-lg h-[59px] w-full justify-center flex items-center text-white'
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChangePasswordDialog;
