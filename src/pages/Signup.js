import React, { useContext, useEffect, useRef, useState } from "react";
import { LogoFunction } from "../components/Header";
import vector1 from "../assets/Vector (3).png";
import google from "../assets/icons8-google 1.png";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Usercontext } from "../context/userContext";
import logo2 from "../assets/DiaraDove Logo (1).png";
import person from "../assets/person.png";
import email1 from "../assets/email.png";
import phone from "../assets/calling.png";
import password1 from "../assets/password.png";
import logo3 from "../assets/DiaraDove Logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../Utils/axiosInstance";

const Signup = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { userInfo, handleVerifyEmail } = useContext(Usercontext);
  const navigate = useNavigate();
  const formRef = useRef(null); // Ref to target the form element
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".logo2", { x: 10, duration: 0.2, yoyo: true, repeat: 2 })
      .to(".logo2", { rotation: 360, duration: 1 })
      .to(".logo2", { scale: 1, rotation: 360, duration: 1 })
      .to(".left-sm", {
        x: 2,
        opacity: 0,
        width: 0,
        rotation: 0,
        duration: 0.8,
      });

    gsap.to(".form", {
      opacity: 1,
      x: 0,
    });
    gsap.from(".left-md", {
      opacity: 1,
      width: 60,
      x: -200,
      delay: 1,
    });
    gsap.to(".left-md", {
      opacity: 1,
      x: 0,
      width: 660,
      delay: 1,
    });

    gsap.to(".loader ", {
      opacity: 1,
      x: 0,
      delay: 1,
    });

    gsap.from(".right", {
      opacity: 0,
      x: -6000,
      delay: 0.1,
    });
    gsap.to(".right", {
      opacity: 1,
      x: 0,
      delay: 0.1,
    });

    gsap.to(".bar", {
      opacity: 0,
      delay: 0.5,
      width: 0,
      x: 300,
    });

    gsap.to(".bar", {
      opacity: 0,
      delay: 0.5,
      width: 0,
      x: 0,
    });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Validate user input
      const formData = {
        fullname: fullName,
        username: userName,
        email,
        phonenumber: phoneNumber,
        password: newPassword,
      };

      const response = await axiosInstance.post("/api/users/signup", formData);
      console.log("Response:", response);
      console.log("Response data:", response.data);
      if (response.status === 200 && email.length > 3) {
        handleVerifyEmail(email);
        toast.success(response.data.message);
        setEmail("");
        setFullName("");
        setUserName("");
        setPhoneNumber("");
        setPassword("");
        navigate("/verify");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.status === 400) {
        if (error.response.data.message) {
          toast.error(error.response.data.message)
        }
        error?.response?.data?.errors?.map((e) => toast.error(e));
      }
      if (error?.response?.status === 400) {
      } else {
        console.log(error);
      }

    }
  };


  useEffect(() => {
    if (userInfo?.token) {
      navigate("/dashboard")
    }
  }, [userInfo?.token])

  const handleGoogleAuth = async () => {
    try {
      // window.location.href = 'http://localhost:8000/auth/google';
      window.location.href = 'https://dairydoveii.onrender.com/auth/google/';
    } catch (error) {
      console.error('Error during Google authentication:', error);
    }
  };


  return (
    <div className="bg-[#FDFAF7] w-full relative h-full py-0 md:py-[25.5px] flex">
      <div className="bg-gradient-to-b hidden relative left-sm left-md from-[#DA9658] to-[#91643B] h-[101vh] w-[100vw]">
        <div className="bg-[#ffffff37] rounded-bl-full h-[55px] w-[100%] left-[315px] absolute top-0" />
        <div className="bg-[#ffffff37] rounded-tr-full h-[55px] w-[100%] right-[315px] absolute bottom-0" />
        <button className="shadow-md bg-[#ffffff] rounded-2xl float-start mx-auto mt-[48px] p-3">
          <LogoFunction />
        </button>

        <img
          src={vector1}
          className="absolute top-[249px] left-[44.1px]"
          alt=""
        />
        <img
          src={vector1}
          className="absolute bottom-[85px] right-[44.1px]"
          alt=""
        />
        <div className="mt-[350px] text-white mx-auto">
          <h1 className="font-[600] text-[56px]">Hello Friend!</h1>
          <p className="w-[283px] mx-auto mt-[24px]">
            Enter your personal details and start journey with us
          </p>
        </div>
      </div>

      <div className="fixed left-sm z-[20] top-0 left-0 w-full from-[#DA9658] to-[#91643B] h-[100vh]">
        <div className="relative flex justify-center items-center bg-gradient-to-b w-full h-full">
          <img
            src={vector1}
            className="absolute w-[5rem] left-[56px] bottom-[85px]"
            alt=""
          />
          <img
            src={vector1}
            className="absolute w-[5rem] right-[56px] top-[85px]"
            alt=""
          />
          <img src={logo2} className="my-auto logo2 size-[117px]" alt="" />
        </div>
      </div>

      {/* Right */}
      <div
        className="right ease-in h-full md:h-[972px] pb-[48px] md:pb-0  w-[390px] md:w-[572px] bg-white my-auto transition-all delay-300 mx-auto  flex flex-col items-center justify-center pt-[0px] md:pt-[20px]"
        style={{ boxShadow: "0px 4px 24px 0px #0000000A" }}
      >
        <div onClick={() => navigate('/')} className="w-[412px] pl-[24px] md:pl-0 mt-[72px] md:mt-0 mb-[20px] flex  justify-start  items-start">
          <img src={logo3} alt="" className="w-[146px] h-[36px] " />
        </div>
        <div className="bg-[#E0A7741A]  p-[4px] rounded-[8px] flex gap-[4px] w-[342px] md:w-[412px] mx-[24px] md:mx-[80px]">
          <button
            onClick={() => navigate("/login")}
            className={`transition-all duration-300 ease-out ${isNewUser && "bg-[white]"
              } w-full justify-center  px-[16px] h-[32px] gap-[8px] rounded-lg flex  items-center`}
          >
            Existing User
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className={`transition-all duration-300 ease-out ${!isNewUser && "bg-[white]"
              } w-full justify-center px-[16px] h-[32px] gap-[8px] rounded-lg flex  items-center`}
          >
            New User
          </button>
        </div>
        <h1 className=" my-[24px] font-[600] text-start w-full flex justify-start px-[24px] md:px-[80px] text-[32px]">
          {!isNewUser ? "Create Account" : "Log in to your Account"}
        </h1>
        <form
          ref={formRef}
          onSubmit={(e) => handleSignup(e)}
          className="form opacity-0 w-[342px] md:w-[412px] ease-in transition-all delay-300 mx-auto flex flex-col gap-[16px]"
        >
          {!isNewUser && (
            <label
              className="w-full items-start justify-start flex gap-[8px] flex-col"
              htmlFor=""
            >
              Full Name
              <div className="w-full border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                <img src={person} className="text-[#bfc5d0d3]" />
                <input
                  required={true}
                  type="text"
                  className="outline-none w-full"
                  placeholder="Steven Ade***"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </label>
          )}

          <label
            className="w-full items-start justify-start flex gap-[8px] flex-col"
            htmlFor=""
          >
            User Name
            <div className="w-full border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
              <img src={person} className="text-[#bfc5d0d3]" />
              <input
                required={true}
                type="text"
                className="outline-none w-full"
                placeholder="Steven Ade***"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </label>

          {!isNewUser && (
            <label
              className="w-full items-start justify-start flex gap-[8px] flex-col"
              htmlFor=""
            >
              Email
              <div className="w-full border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                <img src={email1} className="text-[#bfc5d0d3]" />
                <input
                  required={true}
                  type="email"
                  className="outline-none w-full"
                  placeholder="Steven***@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>
          )}
          {!isNewUser && (
            <label
              className="w-full items-start justify-start flex gap-[8px] flex-col"
              htmlFor=""
            >
              Phone Number
              <div className="w-full border-[#bfc5d0d3] p-4 rounded-lg border gap-[8px] flex items-center">
                <img
                  src={phone}
                  className="text-[#bfc5d0d3] size-[16px]"
                  alt="Phone"
                />
                <input
                  minLength={11}
                  maxLength={11}
                  type="text"
                  pattern="[0-9]*"
                  className="outline-none w-[412px]"
                  max={11}
                  placeholder="0803 212 1414"
                  value={phoneNumber}
                  onChange={(e) => {
                    const input = e.target.value;
                    // Remove all non-numeric characters from input
                    const sanitizedInput = input.replace(/\D/g, "");
                    // Check if sanitized input is 11 digits long
                    if (sanitizedInput.length <= 11) {
                      setPhoneNumber(sanitizedInput);
                    }
                  }}
                />
              </div>
              <span className="text-[12px] mt-[8px]">WhatsApp Number</span>
            </label>
          )}

          <label
            className="w-full items-start justify-start flex gap-[8px] flex-col"
            htmlFor=""
          >
            Password
            <div className="border-[#bfc5d0d3] w-full p-4 rounded-lg border gap-[8px] flex items-center">
              {/* <img src={password1} className="text-[#bfc5d0d3]" size={20} />
              <input
                required={true}
                type="password"
                className="outline-none w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}

              <div
                className={`${errors.newPassword ? "border-red-500" : ""
                  } flex  relative w-full items-center gap-[8px]`}
              >
                <img src={password1} className="text-[#B4B9C2]" />
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  placeholder="Enter new password"
                  className="outline-none w-full"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {!newPasswordVisible ? (
                    <FaEyeSlash className="text-[#8F96A3]" />
                  ) : (
                    <FaEye className="text-[#8F96A3]" />
                  )}
                </button>
              </div>
            </div>
            {isNewUser && (
              <span className="font-[500] text-[14px] text-[#DA9658]">
                Reset Password
              </span>
            )}
          </label>

          <button
            type="submit"
            className="text-white bg-[#DA9658] mt-[8px] w-full py-[12px] rounded-lg"
          >
            {!loading && <>{isNewUser ? "Login" : "Sign Up"}</>}
            {loading && (
              <CircularProgress
                size={20}
                sx={{ color: "white" }}
                className=" text-white ml-[.5rem]"
              />
            )}

          </button>
          <div className="text-[#8F96A3] flex justify-center items-center">
            <hr className="text-[#d7d7d7] w-[106px] md:w-full mx-[.3rem] border-[#F1F2F3] border" />
            <p className="text-sm px-[14px] whitespace-nowrap">Or continue with</p>
            <hr className="text-[#d7d7d7] w-[106px] md:w-full mx-[.3rem] border-[#F1F2F3] border" />
          </div>
          <div onClick={() => handleGoogleAuth()} className=" gap-[16px] text-[18px] font-[400] border-[#F1F2F3] border p-[8px] w-full text-center rounded-lg  cursor-pointer items-center flex justify-center mx-auto">

            <img src={google} className="text-[#bfc5d0d3] size-[24px]" alt="Google" />
            <p className="size-fit" >Google</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
