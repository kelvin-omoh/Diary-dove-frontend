import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../components/_Settings/Layout';
import { BsPerson } from 'react-icons/bs';
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../context/userContext';
import ChangePasswordDialog from '../components/_Settings/ChangePasswordDialog';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const Settings = () => {
    const navigate = useNavigate();
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { userInfo, setAuthInfo } = useContext(Usercontext);
    const [selectedFile, setSelectedFile] = useState(null);



    const [userData, setUserData] = useState({
        fullname: '',
        username: '',
        email: '',
        phonenumber: '',
        verified: false
    });

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
                password: newPassword
            });
            toast.success(res.data.message);
            navigate('/login');
        }
    };

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


    const getUserData = async () => {
        try {
            const response = await axios.get('api/users/personalinfo', {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : '',
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);

            // Convert array to object
            const newData = response.data.data
            const updatedData = { ...userInfo };

            newData.forEach(item => {
                const [key] = Object.keys(item);
                const [value] = Object.values(item);
                if (!(key in updatedData)) {
                    updatedData[key] = value;
                }
            });
            setAuthInfo(updatedData)


            const userDataArray = response.data.data;
            const userDataObject = userDataArray.reduce((acc, item) => {
                const entries = Object.entries(item);
                if (entries.length > 0) {
                    const [key, value] = entries[0];
                    acc[key] = value;
                }
                return acc;
            }, {});

            setUserData(userDataObject);
        } catch (error) {
            toast.error('Error while getting user information');
            console.log(error);
        }
    };


    useEffect(() => {
        getUserData();
    }, [userInfo]);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault()

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadProfilePicture = async () => {
        if (!selectedFile) {
            toast.error('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        try {
            const response = await axios.post('/api/users/uploadProfilePicture', formData, {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : '',
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            toast.success('Uploaded profile picture successfully');
            getUserData()
        } catch (error) {
            toast.error('Error while uploading profile picture');
            console.log(error);
        }
    };

    return (
        <Layout>
            <div>
                <div className="flex items-center  gap-[24px]">
                    <p>Update profile picture</p>
                    <div className=''>
                        <input
                            type="file"
                            id="file-input"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        {!selectedFile ? <label htmlFor="file-input">
                            <span
                                className="py-2 px-4 mt-4 bg-[#DA9658] text-white rounded-lg cursor-pointer"
                            >
                                Select File
                            </span>
                        </label>
                            :
                            <button
                                type="button"
                                className="py-2 px-4 mt-4 bg-[#DA9658] text-white rounded-lg"
                                onClick={uploadProfilePicture}
                            >
                                Upload
                            </button>
                        }


                    </div>

                </div>
                <form className="w-[832px] flex flex-col justify-center gap-[32px] text-start mt-[60px] py-[24px]" action="">
                    <label>
                        <p className="text-[#8F96A3] mb-[24px] text-[18px] leading-[27px]">Personal Information</p>

                        <div className="flex items-center gap-[32px]">
                            <div>
                                <h1 className="text-[16px] leading-[24px]">Full Name</h1>
                                <div className="flex h-[56px] w-[400px] px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[2px] rounded-[8px]">
                                    <BsPerson className="text-[#B4B9C2]" />
                                    <input
                                        value={userData.fullname}
                                        disabled
                                        onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
                                        className="border-none text-[#8F96A3] bg-none outline-none"
                                        type="text"
                                        placeholder="Steven Ade***"
                                    />
                                </div>
                            </div>

                            <div>
                                <h1 className="text-[16px] leading-[24px]">User Name</h1>
                                <div className="flex h-[56px] w-[400px] px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[2px] rounded-[8px]">
                                    <BsPerson className="text-[#B4B9C2]" />
                                    <input
                                        value={userData.username}
                                        disabled
                                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                        className="border-none bg-none text-[#8F96A3] outline-none"
                                        type="text"
                                        placeholder="Steven Ade***"
                                    />
                                </div>
                            </div>
                        </div>
                    </label>
                    <label>
                        <div className="mb-[24px] border-b-[3px] border-[#F1F2F3] flex items-center gap-[32px]">
                            <div>
                                <h1 className="text-[16px] leading-[24px]">Email address</h1>
                                <div className="flex h-[56px] w-[400px] justify-between items-center gap-[8px] rounded-[8px]">
                                    <p className="text-[#8F96A3]">{userData.email.replace(/.{4}(?=@)/, '****')}</p>
                                    <button onClick={() => navigate('/change-email')} className="text-[#DA9658] cursor-pointer ">Change</button>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-[16px] leading-[24px]">Phone Number</h1>
                                <div className="flex h-[56px] w-[400px] justify-between items-center gap-[8px] rounded-[8px]">
                                    <p className="text-[#8F96A3]">
                                        {userData.phonenumber.slice(0, -4) + '****'}
                                    </p>
                                    {/* <button className="text-[#DA9658]">Change</button> */}
                                </div>
                            </div>
                        </div>

                        <div className="mt-[24px]">
                            <p className="text-[#8F96A3] mt-[24px] text-[18px] leading-[27px]">Security and Privacy</p>

                            <div className=' flex justify-between items-center gap-3 mt-[24px]'>
                                <h4>Password</h4>
                                <button onClick={handleClickOpen} className=' text-[#DA9658]'>Change password?</button>
                            </div>


                        </div>
                    </label>

                    <button onClick={(e) => {
                        e.preventDefault()
                        handleClickOpen(e)
                    }} className="bg-[#DA9658] mt-[142px] w-[359px] h-[60px] rounded-[8px] text-center text-white">Save changes</button>
                    <ChangePasswordDialog
                        handleClose={handleClose}
                        open={open}
                        onClose={onclose}
                    />


                </form>
            </div>
        </Layout>
    );
};

export default Settings;
