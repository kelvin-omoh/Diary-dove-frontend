import React, { useContext, useEffect, useRef, useState } from "react";
import { LogoFunction } from "../components/Header";
import vector1 from "../assets/Vector (3).png";
import Logo from "../assets/DiaraDove Logo.png";
// import phone from '../assets/Calling 1.png';
import logo2 from "../assets/DiaraDove Logo (1).png";
import google from "../assets/icons8-google 1.png";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import gsap from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { Usercontext } from "../context/userContext";
import toast from "react-hot-toast";
import { useGSAP } from "@gsap/react";
import Profile from "../assets/person.png";
import Warning from "../assets/Warning.png";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../Utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { handleVerifyEmail } = useContext(Usercontext);
  const { setAuthInfo, userInfo } = useContext(Usercontext);
  const [isNewUser, setIsNewUser] = useState(true);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const username = queryParams.get("username");
    const email = queryParams.get("email");
    const refreshtoken = queryParams.get("refreshtoken");
    const setup = queryParams.get("setup");

    if (token && refreshtoken) {
      setAuthInfo({
        token,
        username,
        email,
        refreshtoken,
        setup,
      });
    }
  }, [location.search]);

  useGSAP(() => {
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

  useEffect(() => {
    if (userInfo?.token) {
      navigate("/diary");
    }
  }, [userInfo?.token]);

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("api/users/personalinfo", {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : '',
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
    } catch (error) {
      toast.error("Error while getting user information");
      console.log(error);
    }
  };
  const fetchUserInfo = async (token) => {
    console.log(token);
    try {
      const response = await axiosInstance.get("api/users/personalinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw new Error("Error while getting user information");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = { username: userName, password };
      const response = await axiosInstance.post("api/users/login", formData);

      if (response.data.status === "success") {
        toast.success(response.data.message);
        console.log(response.data);

        const userInfo = {
          token: response.data.data[0]?.token,
          refreshtoken: response.data.data[1]?.refreshtoken,
          username: response.data.data[2]?.username,
          email: response.data.data[3]?.email,
          setup: response.data.data[4]?.setup,
          password: true
        };

        localStorage.setItem("authData", JSON.stringify(userInfo));
        if (userInfo.token) {
          try {
            const personalInfo = await fetchUserInfo(userInfo.token);
            const completeUserInfo = { ...userInfo, ...personalInfo };
            localStorage.setItem("authData", JSON.stringify(completeUserInfo));
            setAuthInfo(completeUserInfo);
            navigate("/setup");
            handleVerifyEmail(userInfo.email);
          } catch (error) {
            toast.error("Error while getting user information");
            console.error(error);
          }
        }



      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error("Error while getting login in ,try again later....");
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleAuth = async () => {
    try {
      // window.location.href = 'http://localhost:8000/auth/google';
      window.location.href = "https://dairydoveii.onrender.com/auth/google/";
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  return (
    <div className="md:bg-[#FAF2EA] h-[100vh] rounded-[8px] w-[100vw] items-center justify-center flex  ">
      <div className=" py-5 md:py-4 rounded-[8px] px-6 md:px-20 items-center justify-center flex h-fit w-full md:w-[572px] bg-white ">
        <div className=" bg-gradient-to-b hidden relative left-sm left-md  from-[#DA9658] to-[#91643B] h-[101vh] w-[100vw]">
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
            className="absolute bottom-[85px]  right-[44.1px]"
            alt=""
          />
          <div className="mt-[350px] text-white mx-auto">
            <h1 className="font-[600] text-[56px]">Hello Friend!</h1>
            <p className="w-[283px] mx-auto mt-[24px]">
              Enter your personal details and start journey with us
            </p>
            {/* <button className="mt-[94px] border border-white rounded-[8px] w-[380px] p-[16px]">Login</button> */}
          </div>
        </div>

        <div className=" absolute   left-sm  z-[20] top-0 left-0 w-full from-[#DA9658] to-[#91643B]  h-full ">
          <div className=" relative flex justify-center items-center bg-gradient-to-b w-full h-full">
            <img
              src={vector1}
              className="absolute w-[5rem] left-[56px] bottom-[85px]"
              alt=""
            />
            <img
              src={vector1}
              className="absolute  w-[5rem] right-[56px] top-[85px]"
              alt=""
            />
            <img src={logo2} className="my-auto logo2  size-[117px] " alt=" " />
          </div>
        </div>

        <div className="right ease-in h-full px-0 md:px-0 my-auto transition-all gap-6 delay-300 mx-auto w-full max-w-lg flex flex-col items-center justify-center">
          <div onClick={() => navigate('/')} className="w-full flex items-center justify-start">
            <img src={Logo} className="h-9 md:h-[36px] w-auto" alt="logo" />
          </div>

          <div className="bg-[#E0A7741A] flex gap-1 border rounded-lg w-full max-w-md px-1 py-1">
            <button
              onClick={() => navigate("/login")}
              className={`transition-all duration-300 ease-out ${isNewUser ? "bg-[white]" : "bg-transparent"} w-1/2 justify-center px-4 py-2 rounded-lg flex items-center`}
            >
              Existing User
            </button>
            <button
              onClick={() => navigate("/sign-up")}
              className={`transition-all duration-300 ease-out ${!isNewUser ? "bg-[white]" : "bg-transparent"} w-1/2 justify-center px-4 py-2 rounded-lg flex items-center`}
            >
              New User
            </button>
          </div>

          <div className="w-full max-w-md py-4 grid gap-6">
            <div className="font-semibold flex items-start justify-start">
              <h1 className="text-[24px] sm:text-[32px] md:text-3xl">
                {isNewUser ? "Log in to your Account" : "Create Account"}
              </h1>
            </div>

            <div className="w-full grid gap-4">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="form opacity-100 w-full ease-in transition-all delay-300 flex flex-col gap-4"
              >
                <label className="w-full flex flex-col gap-2" htmlFor="userName">
                  <p>User Name</p>
                  <div className="border-[#bfc5d0d3] w-full p-3 rounded-lg border flex items-center gap-2">
                    <img src={Profile} className="h-5 w-5" alt="user" />
                    <input
                      type="text"
                      id="userName"
                      required
                      className="outline-none bg-transparent w-full"
                      placeholder="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <img src={Warning} className="h-5 w-5" alt="warning" />
                  </div>
                </label>

                <label className="w-full flex flex-col gap-2" htmlFor="password">
                  <p>Password</p>
                  <div className="border-[#bfc5d0d3] w-full p-3 rounded-lg border flex items-center gap-2">
                    <AiOutlineLock className="text-[#bfc5d0d3] h-5 w-5" />
                    <input
                      type={visible ? "text" : "password"}
                      id="password"
                      required
                      className="outline-none bg-transparent w-full"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="cursor-pointer text-gray-400"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <PiEyeLight className="h-5 w-5" />
                      ) : (
                        <PiEyeSlashLight className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/reset-password")}
                    className="text-[#DA9658] text-xs leading-4 mt-2 self-end"
                  >
                    Forgot Password?
                  </button>
                </label>

                <div className="w-full flex flex-col gap-4">
                  <button className="text-white bg-[#DA9658] py-3 rounded-lg">
                    {!loading && <>{isNewUser ? "Login" : "Sign Up"}</>}
                    {loading && (
                      <CircularProgress
                        size={20}
                        sx={{ color: "white" }}
                        className="ml-2"
                      />
                    )}
                  </button>

                  <div className="text-[#8F96A3] flex items-center justify-center gap-2">
                    <hr className="border-[#F1F2F3] flex-grow" />
                    <p className="text-sm px-2 whitespace-nowrap">Or continue with</p>
                    <hr className="border-[#F1F2F3] flex-grow" />
                  </div>

                  <div
                    onClick={handleGoogleAuth}
                    className=" gap-[16px] text-[18px] font-[400] border-[#F1F2F3] border p-[8px] w-full text-center rounded-lg  cursor-pointer items-center flex justify-center mx-auto">

                    <img src={google} className="text-[#bfc5d0d3] size-[24px]" alt="Google" />
                    <p>Google</p>

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
