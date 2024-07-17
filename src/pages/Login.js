import React, { useContext, useEffect, useRef, useState } from "react";
import { LogoFunction } from "../components/Header";
import vector1 from '../assets/Vector (3).png';
import vector2 from '../assets/Frame 18.png';
import Logo from '../assets/logo 2.png'
// import phone from '../assets/Calling 1.png';
import logo2 from '../assets/DiaraDove Logo (1).png';
import google from '../assets/icons8-google 1.png';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/userContext";
import toast from "react-hot-toast";
import { useGSAP } from "@gsap/react";
import Profile from "../assets/person.png"
import Warning from "../assets/Warning.png"
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';



const Login = () => {

  const navigate = useNavigate();
  const formRef = useRef(null);
  const { verifyEmail, setVerifyEmail, handleVerifyEmail } = useContext(Usercontext)
  const { setAuthInfo, userInfo } = useContext(Usercontext)
  const [isNewUser, setIsNewUser] = useState(true);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false)


  useGSAP(() => {


    const tl = gsap.timeline();


    tl.to('.logo2', { x: 10, duration: 0.2, yoyo: true, repeat: 2 })
      .to('.logo2', { rotation: 360, duration: 1 })
      .to('.logo2', { scale: 1, rotation: 360, duration: 1 })
      .to('.left-sm', { x: 2, opacity: 0, width: 0, rotation: 0, duration: .8 });


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







  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { username: userName, password };
      const response = await axios.post("api/users/login", formData);
      console.log("Response:", response.data);
      if (response.data.status == 'success') {
        toast.success(response.data.message)
        navigate("/setup")
        handleVerifyEmail(email)
        setAuthInfo({
          token: response.data.data[0].token,
          username: response.data.data[1].username,
          email: response.data.data[2].email,
        });
      }
    } catch (error) {
      console.log("Error:", error);
      console.log(error.status);

      if(error.response.status===400){
        
        toast.error(error.response.data.message)
      }
      error?.response?.data?.errors?.map(i =>
        toast.error(i)
      )
      console.log(error?.response?.data?.errors?.map(i => i));

    }
  };

  return (
    <div className="md:bg-[#FAF2EA] h-[100vh] w-[100vw] items-center justify-center flex  " >
      <div className=" py-5 md:py-4 px-6 md:px-20 items-center justify-center flex h-fit md:w-[572px] bg-white ">
        <div className=" bg-gradient-to-b hidden relative left-sm left-md  from-[#DA9658] to-[#91643B] h-[101vh] w-[100vw]">
          <div className="bg-[#ffffff37] rounded-bl-full h-[55px] w-[100%] left-[315px] absolute top-0" />
          <div className="bg-[#ffffff37] rounded-tr-full h-[55px] w-[100%] right-[315px] absolute bottom-0" />
          <button className="shadow-md bg-[#ffffff] rounded-2xl float-start mx-auto mt-[48px] p-3">
            <LogoFunction />
          </button>
          <img src={vector1} className="absolute top-[249px] left-[44.1px]" alt="" />

          <img src={vector1} className="absolute bottom-[85px]  right-[44.1px]" alt="" />
          <div className="mt-[350px] text-white mx-auto">
            <h1 className="font-[600] text-[56px]">Hello Friend!</h1>
            <p className="w-[283px] mx-auto mt-[24px]">Enter your personal details and start journey with us</p>
            {/* <button className="mt-[94px] border border-white rounded-[8px] w-[380px] p-[16px]">Login</button> */}
          </div>
        </div>

        <div className=" absolute  left-sm  z-[20] top-0 left-0 w-full from-[#DA9658] to-[#91643B]  h-[101vh] ">
          <div className=" relative flex justify-center items-center bg-gradient-to-b w-full h-full">
            <img src={vector1} className="absolute w-[5rem] left-[56px] bottom-[85px]" alt="" />
            <img src={vector1} className="absolute  w-[5rem] right-[56px] top-[85px]" alt="" />
            <img src={logo2} className="my-auto logo2  size-[117px] " alt=" " />
          </div>
        </div>

        < div className="right ease-in h-full  my-auto transition-all  gap-6 delay-300 mx-auto w-[342px] md:w-fit flex flex-col  items-center justify-center ">
          <div className=" grid w-full items-center justify-start ">
            <img src={Logo} className=" h-[36px] mdw-[146px]" alt="logo" />
          </div>

          <div className='md:bg-[#E0A7741A] flex gap-[4px] border rounded-lg w-[342px] md:w-[412px] px-[4px]'>
            <button onClick={() => navigate('/login')} className={`transition-all duration-300 ease-out ${isNewUser ? 'bg-[white]' : ''} w-[202px] justify-center px-[16px] py-[8px] gap-[8px] rounded-lg flex my-[4px] items-center`}>
              Existing User
            </button>
            <button onClick={() => navigate('/sign-up')} className={`transition-all duration-300 ease-out ${!isNewUser ? 'bg-[white]' : ''} w-[148px] justify-center px-[16px] py-[8px] gap-[8px] rounded-lg flex my-[4px] items-center`}>
              New User
            </button>
          </div>
          <div className=" grid py-4   gap-6 ">
            <div className=" font-[600] w-[342px] md:w-[412px] items-start justify-start flex">
              <h1 className=" h-full text-[32px]  ">
                {isNewUser ? 'Log in to your Account' : 'Create Account'}
              </h1>
            </div>
            <div className=" grid gap-4" >
              <form ref={formRef} onSubmit={handleSubmit} className="form opacity-0  ease-in transition-all delay-300  flex flex-col gap-[16px]">



                <label className="w-full items-start justify-start flex gap-[8px] flex-col" htmlFor="userName" >
                  <p>User Name</p>
                  <div className="border-[#bfc5d0d3] w-full p-4 rounded-lg border gap-[8px] flex items-center">
                    <img src={Profile} className=" size-5" alt="user" />
                    <input
                      type="text"
                      id="userName"
                      required
                      className="outline-none w-full"
                      placeholder="user Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <img src={Warning} className=" size-5" alt="user" />

                  </div>
                </label>
                <label className="w-full items-start justify-start flex gap-[8px] flex-col" htmlFor="userName" >
                  <p>Password</p>
                  <div className="border-[#bfc5d0d3] w-full p-4 rounded-lg border gap-2  flex items-center">
                    <AiOutlineLock className="text-[#bfc5d0d3]" size={20} />
                    <input
                      type={visible ? 'text' : 'password'}
                      id="password"
                      required
                      className="outline-none w-full"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className=" text-gray-400" onClick={() => setVisible(!visible)}>
                      {visible ? < PiEyeLight /> : <PiEyeSlashLight />}
                    </div>

                  </div>
                  <button onClick={() => navigate('/reset-password')} className=' text-[#DA9658] text-xs leading-4'>Forgot Password</button>

                </label>
                <div className=" grid gap-4">
                  <button className="text-white bg-[#DA9658] h-[59px]  w-full py-[24px] rounded-lg">
                    {isNewUser ? 'Login' : 'Sign Up'}
                  </button>
                  <div className="text-[#8F96A3]  grid grid-cols-3 items-center">
                    <hr className="text-[#d7d7d7] border-[#d8d8d9] border" />
                    <p className=" text-sm">Or continue with</p>
                    <hr className="text-[#d7d7d7] border-[#d8d8d9] border" />
                  </div>
                  <div className=" gap-[16px] text-[18px] font-[400] border-[#F1F2F3] border p-[8px] w-full text-center rounded-lg items-center flex justify-center mx-auto">
                    <img src={google} className="text-[#bfc5d0d3] size-[24px]" alt="Google" />
                    <p className="size-fit" >Google</p>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>


      </div>
    </div>

  );
};

export default Login;
