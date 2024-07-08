import React, { useEffect, useRef, useState } from "react";
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

const Signup = () => {

    const [isNewUser, setIsNewUser] = useState(false)
    const navigate = useNavigate()
    // const[isExistingUser,setisExistingUser]=useState()
    const formRef = useRef(null); // Ref to target the form element

    useEffect(() => {


        gsap.to('.form', {
            opacity: 1,
            x: 0,
        });


        gsap.from('.left', {
            opacity: 1,
            x: -200,

        });
        gsap.to('.left', {
            opacity: 1,
            x: 0,
            width: 660,
            delay: 1

        });


        gsap.from('.right', {
            opacity: 0,
            x: -6000,
        });
        gsap.to('.right', {
            opacity: 1,
            x: 0,
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




    return (
        <div className=" w-full h-[120vh] flex">
            <div className=" bg-gradient-to-b relative left   from-[#DA9658] to-[#91643B] h-full  w-[100vw]">

                <div className=" bg-[#ffffff37] rounded-bl-full h-[55px] w-[100%] left-[315px] absolute top-0" />
                <div className=" bg-[#ffffff37] rounded-tr-full h-[55px] w-[100%] right-[315px] absolute bottom-0" />
                <button className=" shadow-md bg-[#ffffff] rounded-2xl float-start mx-auto mt-[48px] p-3 ">
                    <LogoFunction />
                </button>

                <img src={vector1} className=" absolute top-[249px] left-[44.1px] " alt="" />
                <img src={vector1} className=" absolute bottom-[85px] right-[44.1px] " alt="" />
                <div className=" mt-[350px] text-white mx-auto ">
                    {/* <div className=" bar border border-white bg-[#f2f2f2ac] w-[73.1vw] top-[18rem] h-[50vh] left-0  absolute "></div> */}

                    <h1 className=" font-[600] text-[56px]  ">Hello Friend!</h1>
                    <p className=" w-[283px] mx-auto mt-[24px] ">Enter your personal details and start journey with us</p>
                    <button className=" mt-[94px] border border-white rounded-[8px] w-[380px] p-[16px]">Sign Up</button>
                </div>


            </div>










            {/* Right */}
            <div className=" right ease-in transition-all delay-300  mx-auto w-[780px]  flex flex-col items-center justify-center pt-[20px] ">
                <div className=' bg-[#E0A7741A] flex gap-[4px] w-fit px-[4px] '>
                    <button onClick={() => navigate('/login')} className={` transition-all duration-300 ease-out ${isNewUser && 'bg-[white]'} w-[148px] justify-center px-[16px] py-[8px] gap-[8px]  rounded-lg flex my-[4px] items-center`}>

                        Existing User
                    </button>
                    <button onClick={() => navigate('/sign-up')} className={`  transition-all duration-300 ease-out ${!isNewUser && 'bg-[white]'} w-[148px] justify-center px-[16px] py-[8px] gap-[8px]  rounded-lg flex my-[4px] items-center`}>

                        New User
                    </button>
                </div>
                <h1 className=" font-[600] text-[32px]">


                    {!isNewUser ? 'Create Account' : 'Log in to your Account'}


                </h1>
                <form ref={formRef} className=" form h-[80vh] opacity-0   ease-in transition-all delay-300   mx-auto flex flex-col gap-[16px]  " action="">
                    {!isNewUser &&
                        <label className=" w-full  items-start  justify-start flex gap-[8px] flex-col" htmlFor="">
                            Full Name
                            <div className=" border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                                <AiOutlineUser className=" text-[#bfc5d0d3]" /><input type="text" className=" outline-none w-[412px]" placeholder="Steven Ade***" name="" id="" />
                            </div>
                        </label>
                    }

                    <label className=" w-full  items-start  justify-start flex gap-[8px] flex-col" htmlFor="">
                        User Name
                        <div className=" border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                            <AiOutlineUser className=" text-[#bfc5d0d3]" /><input type="text" className="outline-none w-[412px]" placeholder="Steven Ade***" name="" id="" />
                        </div>
                    </label>

                    {!isNewUser &&
                        <label className=" w-full  items-start  justify-start flex gap-[8px] flex-col" htmlFor="">
                            Email
                            <div className=" border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                                <AiOutlineMail className=" text-[#bfc5d0d3]" /><input type="email" className=" outline-none w-[412px]" placeholder="Steven***@gmail.com" name="" id="" />
                            </div>
                        </label>
                    }
                    {!isNewUser &&
                        <label className=" w-full  items-start  justify-start flex gap-[8px] flex-col" htmlFor="">
                            Phone Number
                            <div className=" border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                                <img src={phone} className=" text-[#bfc5d0d3] size-[16px]" /><input type="number" className=" outline-none w-[412px]" placeholder="0803 212 1414" name="" id="" />
                            </div>
                            <span className="  text-[12px]  mt-[8px]">
                                WhatsApp Number
                            </span>
                        </label>
                    }

                    <label className=" w-full  items-start  justify-start flex gap-[8px] flex-col" htmlFor="">
                        Password
                        <div className=" border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                            <AiOutlineLock className="text-[#bfc5d0d3]" size={20} /><input type="number" className=" outline-none w-[412px]" placeholder="0803 212 1414" name="" id="" />
                        </div>
                        {isNewUser &&
                            <span className=" font-[500] text-[14px] text-[#DA9658] ">
                                Reset Password
                            </span>
                        }


                    </label>


                    <button className=" text-white bg-[#DA9658] mt-[8px]  w-full py-[24px] rounded-lg">
                        {!isNewUser ? 'Sign Up' : 'Login'}
                    </button>
                    <div className=" text-[#8F96A3] grid grid-cols-3 items-center">
                        <hr className=" text-[#d7d7d7] border-[#d8d8d9] border " />
                        <p>Or sign up with</p>
                        <hr className=" text-[#d7d7d7] border-[#d8d8d9] border " />
                    </div>
                    <div className="  shadow-md mt-[24px] gap-[8px] text-[18px] font-[400] border-[#F1F2F3] border p-[8px] w-full text-center rounded-lg items-center flex justify-center mx-auto">
                        <img src={google} className=" text-[#bfc5d0d3] size-[24px]" /> Google
                    </div>





                </form>

            </div>
        </div>
    );
};

export default Signup;
