import React, { useContext, useEffect, useMemo, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/userContext";
import ChangePasswordDialog from "../components/_Settings/ChangePasswordDialog";
import { CircularProgress } from "@mui/material";
import { Layout } from "../components/_Settings/Layout";
import call from "../assets/calling.png";
import vector from "../assets/Vector (5).png";
import { ToggleContext } from "../context/toggleContext";
import axiosInstance from "../Utils/axiosInstance";

const Settings = () => {
    const navigate = useNavigate();
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { userInfo, setAuthInfo } = useContext(Usercontext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { toggle, handleToggle } = useContext(ToggleContext);

    const [userData, setUserData] = useState({
        fullname: "",
        username: "",
        email: "",
        phonenumber: "",
        profilePicture: "",
        verified: false,
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
            const res = await axiosInstance.post("api/users/newpassword", {
                password: newPassword,
            });
            toast.success(res.data.message);
            navigate("/login");
        }
    };

    const validate = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!newPassword) {
            errors.newPassword = "New password is required.";
        } else if (!passwordRegex.test(newPassword)) {
            errors.newPassword =
                "Password must be at least 8 characters long, contain at least one letter and one number.";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Confirm password is required.";
        } else if (newPassword !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        setErrors(errors);
        return Object.keys(errors)?.length === 0;
    };

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get("api/users/personalinfo", {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                    "Content-Type": "application/json",
                },
            });

            const newData = response.data.data;
            const updatedData = { ...userInfo };

            newData.forEach((item) => {
                const [key] = Object.keys(item);
                const [value] = Object.values(item);
                if (!(key in updatedData)) {
                    updatedData[key] = value;
                }
            });
            setAuthInfo(updatedData);

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
            toast.error("Error while getting user information");
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const memoizedUserData = useMemo(() => userData, [userData]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
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
            toast.error("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("profilePicture", selectedFile);

        try {
            setLoading(true);
            const response = await axiosInstance.post(
                "/api/users/uploadProfilePicture",
                formData,
                {
                    headers: {
                        Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Uploaded profile picture successfully");

            if (
                response.data &&
                response.data.data &&
                response.data.data.profilePicture
            ) {
                const profilePictureUrl = response.data.data.profilePicture;
                const newdata = { ...userInfo, profilePicture: profilePictureUrl };
                setAuthInfo(newdata);
                setUserData(newdata);
            } else {
                console.error("Unexpected response data:", response.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Error while uploading profile picture");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const removeProfilePicture = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.delete("/api/users/profilePicture", {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                    "Content-Type": "application/json",
                },
            });
            toast.success("Removed profile picture successfully");

            const updatedData = { ...userInfo, profilePicture: "" };
            setAuthInfo(updatedData);
            setSelectedFile(false)
            setUserData(updatedData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Error while removing profile picture");
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedFile) {
            uploadProfilePicture()
        }
    }, [selectedFile])

    const handleChangeProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { fullname, username, phonenumber } = userData
            const newData = {
                fullname,
                username,
                phonenumber: phonenumber
            }
            console.log(newData);
            const response = await axios.post('api/users/personalinfo', newData, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            if (response.data.status === 'success') {
                toast.success(response.data.message);
            } else {
                toast.error('Failed to update profile.');
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            console.error('Error updating profile:', error);
            alert('An error occurred while updating profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className=" bg-white mb-width-full overflow-x-hidden   h-full">
                <button
                    onClick={() => handleToggle(!toggle)}
                    className="  flex md:hidden justify-start w-full mb-[31.25px]"
                >
                    <FaBars className="size-[15px]" />
                </button>
                <div className="flex items-center gap-[24px]">
                    <p>
                        {selectedFile ? "Upload profile picture" : "Update profile picture"}
                    </p>
                    <div className="">
                        <input
                            type="file"
                            id="file-input"
                            className="hidden bg-none"
                            accept=".png,.jpg,.jpeg,.JPG,.PNG,.GIF,.BMP,.TIFF,.ICO,,.EPS,.PSD,.SVG,.WebP,.JXR,.WDP"
                            onChange={handleFileChange}
                        />

                        <label className=" flex gap-[8px] items-center " htmlFor="file-input">
                            <span className="py-2 px-4 mt-4 flex items-center bg-[#DA9658] text-white rounded-lg cursor-pointer">
                                {userInfo.profilePicture ?
                                    <>
                                        {loading ?
                                            <div className=" flex gap-2 items-center  ">
                                                Changing
                                                <CircularProgress
                                                    size={20}
                                                    sx={{ color: "white" }}
                                                    className=" text-white ml-[.5rem]"
                                                />

                                            </div>
                                            : "change"}
                                    </> :
                                    <>

                                        {loading ?
                                            <div className=" flex gap-2 items-center  ">
                                                updating
                                                <CircularProgress
                                                    size={20}
                                                    sx={{ color: "white" }}
                                                    className=" text-white ml-[.5rem]"
                                                />

                                            </div>
                                            : "select an Image"}
                                    </>
                                }
                            </span>

                            {userInfo.profilePicture &&
                                <button
                                    type="button"
                                    className="py-2 px-4 mt-4 border  bg-[#ffffff] text-[black] rounded-lg"
                                    onClick={removeProfilePicture}
                                >
                                    Remove
                                </button>}
                        </label>




                    </div>
                </div>
                <form
                    className="w-[342px] md:w-[832px] overflow-x-hidden flex flex-col justify-center gap-[16px] md:gap-[32px] text-start mt-[32px] md:mt-[60px] py-[24px]"
                    action=""
                >
                    <label className=" border-b-0 md:border-b-[2px] pb-0 md:pb-[48px] border-[#F1F2F3]">
                        <p className="text-[#8F96A3]  mb-[16px] md:mb-[24px] text-[18px] leading-[27px]">
                            Personal Information
                        </p>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-[16px] md:gap-[32px]">
                            <div>
                                <h1 className="text-[16px] mb-[8px] leading-[24px]">
                                    Full Name
                                </h1>
                                <div className="flex  h-[56px] w-[311px] md:w-[400px] px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[1px] rounded-[8px]">
                                    <BsPerson className="text-[#B4B9C2]" />
                                    <input
                                        value={memoizedUserData.fullname}
                                        onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}

                                        className="border-none  disabled:bg-[#ffffff00]  text-[#252525] bg-none outline-none"
                                        type="text"
                                        placeholder="Steven Ade***"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-[16px] mb-[8px] leading-[24px]">
                                    User Name
                                </h1>
                                <div className="flex  h-[56px] w-[311px] md:w-[400px] px-[16px] items-center gap-[8px] border-[#F1F2F3] border-[1px] rounded-[8px]">
                                    <BsPerson className="text-[#B4B9C2]" />
                                    <input
                                        value={memoizedUserData.username}
                                        onChange={(e) =>
                                            setUserData({ ...userData, username: e.target.value })
                                        }


                                        className="border-none   disabled:bg-[#ffffff00] bg-none text-[#2b2c2c] outline-none"
                                        type="text"
                                        placeholder="Steven Ade***"
                                    />
                                </div>
                            </div>
                        </div>
                    </label>
                    <div>
                        <div className="pb-[48px] md:flex-row flex-col  border-b-[2px] md:border-b-[2px] md:border-[#F1F2F3] flex items-start md:items-center gap-[32px]">
                            <div>
                                <h1 className="text-[16px] mb-[8px] leading-[24px]">
                                    Email address
                                </h1>
                                <div className="flex md:bg-[#fdfaf70a] bg-[#FDFAF7] md:h-auto md:px-0 px-[16px] h-[53px] w-[311px] md:w-[400px] justify-between items-center gap-[8px] rounded-[8px]">
                                    <p className="flex flex-col items-start gap-[4px] font-[400] leading-[24px] text-[#8F96A3] break-all">
                                        <span className="hidden md:block">
                                            Your email address is  


                                           <span> {`${memoizedUserData.email.replace(/.{4}(?=@)/, "****")}`}</span>
                                        </span>
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/change-email")}
                                        className="text-[#DA9658] cursor-pointer"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-[16px] mb-[8px] leading-[24px]">
                                    Phone Number
                                </h1>
                                <div className={`flex justify-between h-[56px] w-[311px] md:w-[400px] px-[16px] items-center gap-[8px] md:bg-[#fdfaf70a] bg-[#FDFAF7] 
                                 ${isEditing ? 'border-[#da9758c3]' : ' border-[#f1f2f300] md:border-[#F1F2F3] '} 
                                
                                border-[#f1f2f300] border-[1px] rounded-[8px]`}>
                                    <div className="items-center flex gap-[8px]">
                                        <img
                                            src={call}
                                            alt="phone"
                                            className="size-[20px] text-[#B4B9C2]"
                                        />
                                        <input
                                            value={memoizedUserData.phonenumber}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Allow only numeric characters and limit length to 11
                                                if (/^\d{0,11}$/.test(value)) {
                                                    setUserData({ ...memoizedUserData, phonenumber: value });
                                                }
                                            }}
                                            className={`border-none outline-0 bg-[#ff000000] cursor-${isEditing ? 'text  text-[#1a1b1d]' : 'no-drop text-gray-500'}  bg-none outline-none`}
                                            type="text" // Use type="text" for custom validation
                                            maxLength={11} // Limits the input to 11 characters
                                            placeholder="Enter phone number"
                                            disabled={!isEditing} // Disable input when not in editing mode
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleEditClick();

                                        }}
                                        className="text-[#DA9658] cursor-pointer"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[40px] md:mt-[24px]">
                            <p className="text-[#8F96A3] font-[400] mt-[24px] text-[18px] leading-[27px]">
                                Security and Privacy
                            </p>
                            <div className=" flex items-center gap-[100px] md:gap-[344px] mt-[24px]">
                                <h4 className=" text-[18px]  ">Password</h4>
                                <button
                                    onClick={handleClickOpen}
                                    type="button"
                                    className="font-[500] text-[18px] outline-none text-[#DA9658]"
                                >
                                    Change password?
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-between w-full  items-end">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                handleChangeProfile(e);
                            }}
                            className="bg-[#DA9658] font-[500] mt-[72px] md:mt-[128px] w-[359px] h-[60px] rounded-[8px] mb-[92px] md:mb-0 text-center text-white"

                        >
                            {loading ?
                                <div className="flex w-fit mx-auto justify-center gap-4 items-center">
                                    Saving
                                    <CircularProgress
                                        size={20}
                                        sx={{ color: "white" }}
                                        className=" text-white ml-[.5rem]"
                                    />

                                </div>
                                :
                                ' Save changes'
                            }

                        </button>
                        <img
                            src={vector}
                            alt="phone"
                            className="  hidden md:block h-[89px] mb-[80px] pl-[48px] absolute bottom-[0px] right-[80px] text-[#B4B9C2]"
                        />
                    </div>
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
