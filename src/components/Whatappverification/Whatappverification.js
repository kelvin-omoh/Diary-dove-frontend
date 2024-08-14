import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Inputs from "../_Verification/Inputs";
import tick from "../../assets/Tick Circle.png";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Usercontext } from "../../context/userContext";
import axiosInstance from "../../Utils/axiosInstance";
import { useMutation } from "react-query";
import { verifyOTPInWhatsappVerification } from "../Service/Service";

const WhatsAppVerification = () => {
  const navigate = useNavigate();
  const { verifyWhatsApp, userInfo, setAuthInfo, logOut, handleVerifyWhatsapp, whatsappNumber, setWhatsappNumber } = useContext(Usercontext); // Removed setVerifyWhatsApp
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem('timer');
    return savedTimer !== null ? parseInt(savedTimer, 10) : 360;
  });
  const [canResend, setCanResend] = useState(false);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [otp, setOtp] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAgain, setIsAgain] = useState(false);

  const verifyOTPInWhatsappVerificationMutation = useMutation(verifyOTPInWhatsappVerification)


  useEffect(() => {
    localStorage.setItem('timer', timer);
  }, [timer]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    console.log(whatsappNumber);
    if (!whatsappNumber) {
      toast.error("WhatsApp number verification is required.");
    }
  }, [whatsappNumber]);

  const verifyOTP = async () => {
    if (!isSuccess) {
      setLoading(true);
      try {
        if (otp.length === 6) {
          const response = await verifyOTPInWhatsappVerificationMutation.mutateAsync({ otp, userInfo })
          localStorage.removeItem("whatsapp");
          toast.success(response.data.message);
          setAuthInfo({ ...userInfo, phonenumber: whatsappNumber })
          navigate("/verify-whatsapp/success")
        }
      } catch (error) {
        console.log(error);
        toast.error("OTP verification is incorrect.");
      } finally {
        setLoading(false);
        setIsSuccess(true)
      }
    }
  };

  const handleResendOfCode = async () => {
    try {
      setIsAgain(true)
      const formattedNumber = `${whatsappNumber}`;

      const res = await axiosInstance.post("/api/users/sendphoneOTP", {
        phonenumber: formattedNumber,
      }, {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        }
      });
      console.log(res);
      toast.success(res.data.message);
      setTimer(360);
      setIsAgain(false)
    } catch (error) {
      console.log(error);
      setIsAgain(false)
      toast.error(
        "An error occurred while resending code, please try again later..."
      );
    }
  };

  const formatNumber = (num) => {
    return `+ ${num.toString().split('').join(' ')}`;
  };


  return (
    <div className=" w-full flex justify-center items-center h-[100vh] bg-[#FDFAF7]">
      <div className=" w-[342px] shadow-sm rounded-[8px] px-[22px] md:px-[24px]  md:min-w-[538px] h-[467px] flex justify-center items-center flex-col bg-[#Fff]">
        {isSuccess && (
          <img src={tick} alt={"tick"} className=" mb-[40px] size-[125px]" />
        )}
        <div
          className={` mb-[20px] md:mb-[40px] ${isSuccess ? "h-[77px]  " : ""
            }  `}
        >
          <h1
            className={` font-[600] text-[20px] md:text-[32px] ${isSuccess ? "mb-[12px]" : "mb-[16px]"
              }  text-center`}
          >
            {isSuccess ? "Verification Success" : "Verify your WhatsApp number"}
          </h1>
          {!isSuccess && (
            <>
              <p className=" text-[#8F96A3] text-[14px] md:text-[18px]  w-full leading-[27px] ">
                Enter the code sent to {`${whatsappNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}`} Wrong number?
                {/*}  <span className=" text-[#DA9658]">
                  {" "}
                  {maskPhoneNumber(verifyWhatsApp)}
                </span> */}
              </p>
              <Inputs
                otp={otp}
                setOtp={setOtp}
                otpValues={otpValues}
                setOtpValues={setOtpValues}
              />
              <p className=" mx-auto flex justify-center items-center w-full my-[20px]">Didn’t receive code?</p>
            </>
          )}
          <button
            className={`${isSuccess ? "mt-[12px]" : "mt-[20px]  mx-auto flex  justify-center"
              } text-[14px] md:text-[18px]`}
          >
            {!isSuccess && (
              <>
                <span
                  onClick={() => {
                    timer === 0 && handleResendOfCode();
                  }}
                  className={`${timer === 0 ? "text-[#DA9658]" : ""}  mx-auto items-center w-full flex justify-center`}
                >
                  {isAgain ?
                    <>
                      Sending
                      <CircularProgress className=" mx-4" size={24} style={{ color: "#DA9658" }} />
                    </> : 'Send code again '
                  }
                </span>
                <span style={{ marginLeft: "20px" }}></span>
              </>
            )}

            <span className="text-[#8F96A3]">
              {!isSuccess ? (
                <>{timer !== 0 && formatTime(timer)}</>
              ) : (
                "You have successfully verified your account"
              )}
            </span>
          </button>
        </div>

        <button
          type="submit"
          onClick={() => {
            {
              !isSuccess ?
                !otp.length < 6 &&
                verifyOTP()
                :
                navigate('/login')
            }
          }}
          className={` w-full font-[500] rounded-[8px] ${!isSuccess && otp.length < 6 ? 'bg-[#da975887]' : 'bg-[#DA9658]'}  py-[16px]  text-center text-white ${isSuccess ? "w-[192px]" : "w-full"
            }`}
        >
          {loading ? (
            <div className=" text-white items-center gap-3 justify-center flex w-full h-full">
              Verifying...{" "}
              <CircularProgress size={24} style={{ color: "white" }} />
            </div>
          ) : (
            <> {isSuccess ? "Continue " : "Verify"} </>
          )}
        </button>
      </div>
    </div>
  );
};

export default WhatsAppVerification;
