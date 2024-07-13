import React, { useContext, useEffect, useRef, useState } from "react";
import { LogoFunction } from "../components/Header";
import vector1 from '../assets/Vector (3).png'
import vector2 from '../assets/Frame 18.png'
import phone from '../assets/Calling 1.png'
import google from '../assets/icons8-google 1.png'
import { AiFillMail, AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlineUser, AiTwotonePhone } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Usercontext } from "../context/userContext";
import logo2 from '../assets/DiaraDove Logo (1).png';
const Signup = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const { verifyEmail, setVerifyEmail, handleVerifyEmail } = useContext(Usercontext)
    const navigate = useNavigate();
    const formRef = useRef(null); // Ref to target the form element

    const tl = gsap.timeline();


    tl.to('.logo2', { x: 10, duration: 0.2, yoyo: true, repeat: 2 })
        .to('.logo2', { rotation: 360, duration: 1 })
        .to('.logo2', { scale: 1, rotation: 360, duration: 1 })
        .to('.left-sm', { x: 2, opacity: 0, width: 0, rotation: 0, duration: .8 });

    useEffect(() => {
        gsap.to('.form', {
            opacity: 1,
            x: 0,
        });

        gsap.from('.left-md', {
            opacity: 1,
            width: 60,
            x: -200,
            delay: 1
        });
        gsap.to('.left-md', {
            opacity: 1,
            x: 0,
            width: 660,
            delay: 1
        });


        gsap.to('.loader ', {
            opacity: 1,
            x: 0,

            delay: 1
        });

        gsap.from('.right', {
            opacity: 0,
            x: -6000,
            delay: .1
        });
        gsap.to('.right', {
            opacity: 1,
            x: 0,
            delay: .1
        });

        gsap.to('.bar', {
            opacity: 0,
            delay: .5,
            width: 0,
            x: 300,
        });

        gsap.to('.bar', {
            opacity: 0,
            delay: .5,
            width: 0,
            x: 0,
        });




    }, []);




    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const formData = { fullname: fullName, username: userName, email, phonenumber: phoneNumber, password };
            const response = await axios.post("/api/users/signup", formData);
            console.log("Response:", response);
            console.log("Response data:", response.data);
            if (response.status === 200 && email.length > 3) {
                handleVerifyEmail(email)
                toast.success(response.data.message);
                setEmail('')
                setFullName('')
                setUserName('')
                setPhoneNumber('')
                setPassword('')
                navigate('/verify');
            }

        } catch (error) {
            console.log("Error:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log(error.response.data.errors[0]);
                toast.error(error.response.data.errors[0])
            } else {
                console.log(error.response);
                console.log(["An unexpected error occurred"]);
                toast.error(error.response.data.message)
            }
        }
    };

    return (
        <div className=" w-full relative h-[125vh] flex">
            <div className=" bg-gradient-to-b hidden relative left-sm left-md  from-[#DA9658] to-[#91643B] h-[101vh] w-[100vw]">
                <div className=" bg-[#ffffff37] rounded-bl-full h-[55px] w-[100%] left-[315px] absolute top-0" />
                <div className=" bg-[#ffffff37] rounded-tr-full h-[55px] w-[100%] right-[315px] absolute bottom-0" />
                <button className=" shadow-md bg-[#ffffff] rounded-2xl float-start mx-auto mt-[48px] p-3 ">
                    <LogoFunction />
                </button>

                <img src={vector1} className=" absolute top-[249px] left-[44.1px]" alt="" />
                <img src={vector1} className=" absolute bottom-[85px] right-[44.1px]" alt="" />
                <div className=" mt-[350px] text-white mx-auto">
                    <h1 className=" font-[600] text-[56px]">Hello Friend!</h1>
                    <p className=" w-[283px] mx-auto mt-[24px]">Enter your personal details and start journey with us</p>
                    {/* <button className=" mt-[94px] border border-white rounded-[8px] w-[380px] p-[16px]">Sign Up</button> */}
                </div>
            </div>

            <div className=" fixed left-sm  z-[20] top-0 left-0 w-full from-[#DA9658] to-[#91643B]  h-[100vh] ">
                <div className=" relative flex justify-center items-center bg-gradient-to-b w-full h-full">
                    <img src={vector1} className="absolute w-[5rem] left-[56px] bottom-[85px]" alt="" />
                    <img src={vector1} className="absolute  w-[5rem] right-[56px] top-[85px]" alt="" />
                    <img src={logo2} className="my-auto logo2  size-[117px] " alt="" />
                </div>
            </div>

            {/* Right */}
            <div className="right ease-in h-full my-auto transition-all delay-300 mx-auto w-[342px] md:w-[780px] flex flex-col items-center justify-center pt-[20px]">
                <div className=' bg-[#E0A7741A] flex gap-[4px] w-fit px-[4px]'>
                    <button onClick={() => navigate('/login')} className={`transition - all duration-300 ease-out ${isNewUser && 'bg-[white]'} w-[148px] justify-center px-[16px] py-[8px] gap-[8px]  rounded-lg flex my-[4px] items-center`}>

                        Existing User
                    </button>
                    <button onClick={() => navigate('/sign-up')} className={`  transition-all duration-300 ease-out ${!isNewUser && 'bg-[white]'} w-[148px] justify-center px-[16px] py-[8px] gap-[8px]  rounded-lg flex my-[4px] items-center`}>

                        New User
                    </button>
                </div>
                <h1 className=" font-[600] text-[32px]">
                    {!isNewUser ? 'Create Account' : 'Log in to your Account'}
                </h1>
                <form ref={formRef} onSubmit={(e) => handleSignup(e)} className="form opacity-0 w-[342px] md:w-[412px]  ease-in transition-all delay-300 mx-auto flex flex-col gap-[16px]">
                    {!isNewUser &&
                        <label className=" w-full items-start justify-start flex gap-[8px] flex-col" htmlFor="">
                            Full Name
                            <div className=" w-full border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                                <AiOutlineUser className=" text-[#bfc5d0d3]" /><input required={true} type="text" className=" outline-none w-full" placeholder="Steven Ade***" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </div>
                        </label>
                    }

                    <label className=" w-full items-start justify-start flex gap-[8px] flex-col" htmlFor="">
                        User Name
                        <div className=" w-full border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                            <AiOutlineUser className=" text-[#bfc5d0d3]" /><input required={true} type="text" className="outline-none w-full" placeholder="Steven Ade***" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                    </label>

                    {!isNewUser &&
                        <label className=" w-full items-start justify-start flex gap-[8px] flex-col" htmlFor="">
                            Email
                            <div className=" w-full  border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                                <AiOutlineMail className=" text-[#bfc5d0d3]" /><input required={true} type="email" className=" outline-none w-full" placeholder="Steven***@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </label>
                    }
                    {!isNewUser &&
                        <label className=" w-full items-start justify-start flex gap-[8px] flex-col" htmlFor="">
                            Phone Number
                            <div className=" w-full border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                                <img src={phone} className=" text-[#bfc5d0d3] size-[16px]" alt="Phone" /><input minLength={11}
                                    maxLength={11}
                                    type="text"
                                    pattern="[0-9]*" className=" outline-none w-[412px]" max={11} placeholder="0803 212 1414" value={phoneNumber} onChange={(e) => {
                                        const input = e.target.value;
                                        // Remove all non-numeric characters from input
                                        const sanitizedInput = input.replace(/\D/g, '');
                                        // Check if sanitized input is 11 digits long
                                        if (sanitizedInput.length <= 11) {
                                            setPhoneNumber(sanitizedInput);
                                        }
                                    }} />
                            </div>
                            <span className=" text-[12px] mt-[8px]">
                                WhatsApp Number
                            </span>
                        </label>
                    }

                    <label className=" w-full items-start justify-start flex gap-[8px] flex-col" htmlFor="">
                        Password
                        <div className=" border-[#bfc5d0d3] w-full  p-4 rounded-lg border gap-[8px] flex items-center">
                            <AiOutlineLock className="text-[#bfc5d0d3]" size={20} /><input required={true} type="password" className=" outline-none w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {isNewUser &&
                            <span className=" font-[500] text-[14px] text-[#DA9658]">
                                Reset Password
                            </span>
                        }
                    </label>

                    <button type="submit" className=" text-white bg-[#DA9658] mt-[8px] w-full py-[24px] rounded-lg" >
                        {!isNewUser ? 'Sign Up' : 'Login'}
                    </button>
                    <div className=" text-[#8F96A3] grid grid-cols-3 items-center">
                        <hr className=" text-[#d7d7d7] border-[#d8d8d9] border" />
                        <p>Or sign up with</p>
                        <hr className=" text-[#d7d7d7] border-[#d8d8d9] border" />
                    </div>
                    <div className=" shadow-md mt-[24px] gap-[8px] text-[18px] font-[400] border-[#F1F2F3] border p-[8px] w-full text-center rounded-lg items-center flex justify-center mx-auto">
                        <img src={google} className=" text-[#bfc5d0d3] size-[24px]" alt="Google" /> Google
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Signup;
