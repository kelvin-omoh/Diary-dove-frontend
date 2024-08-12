import React, { useContext, useEffect } from "react";
import whatsappIcon from "../../assets/Group (1).png";
import googleIcon from "../../assets/icons8-google 1.png";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import ToggleIcon from "./ToggleIcon";

import { Usercontext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Utils/axiosInstance";
import toast from "react-hot-toast";

const Step1 = ({ handleNext }) => {
  const [google, setGoogle] = useState(false);
  const [checked, setChecked] = useState(false);
  const { setAuthInfo, userInfo, whatsappNumber, handleVerifyWhatsapp, setWhatsappNumber } = useContext(Usercontext);
  const navigate = useNavigate();
  const [formattedNumber, setFormattedNumber] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleGoogleChange = (event) => {
    setGoogle(event.target.checked);
  };




  const validatePhoneNumber = (value, country) => {
    const strippedNumber = stripCountryCode(value, country);
    console.log(value);
    const isValidLength = strippedNumber.length === 13; // Adjust length as per requirement
    if (isValidLength) {
      setError('');
      return true;
    } else {
      setError('Invalid phone number: Must be exactly 10 digits after the country code');
      return false;
    }
  };

  const getAllReminders = async () => {
    try {
      const res = await axiosInstance.get("/api/reminders", {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.data);
      // if (res?.data?.data?.length > 0) {
      //     navigate("/dashboard")
      // }
    } catch (error) {
      console.log(error);
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    getAllReminders();
  }, []);
  const handleWhatsapp = async () => {
    try {
      setIsLoading(true);
      handleVerifyWhatsapp(whatsappNumber)
      const formattedNumber = `${whatsappNumber}`;

      const res = await axiosInstance.post("/api/users/sendphoneOTP", {
        phonenumber: formattedNumber.replace('#', ''),
      }, {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        }
      });
      console.log(res);
      toast.success(res.data.message);
      // setTimer(360);
      setIsLoading(false);
      navigate('/verify-whatsapp')
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      console.log(error);
      toast.error(
        error.response.data.message
      );

    }

  }
  const renderDashedLine = () => {
    const segments = [];
    for (let i = 0; i < 20; i++) {
      segments.push(
        <Box
          key={i}
          width="2px"
          height="8px"
          bgcolor="#D1A055" // gold color
          margin="4px 0"
        />
      );
    }
    return segments;
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const stripCountryCode = (number, country) => {
    const countryCode = `+${country.dialCode}`;
    return number.replace(countryCode, '');
  };

  const handlePhoneNumberChange = (value) => {
    // Ensure the value starts with +
    if (!value.startsWith('+')) {
      value = `+#${value}`;
    }
    setWhatsappNumber(value);
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
      setWhatsappNumber(updatedData.phonenumber);

      const userDataArray = response.data.data;
      const userDataObject = userDataArray.reduce((acc, item) => {
        const entries = Object.entries(item);
        if (entries.length > 0) {
          const [key, value] = entries[0];
          acc[key] = value;
        }
        return acc;
      }, {});


    } catch (error) {
      toast.error("Error while getting user information");
      console.log(error);
    }
  };


  useEffect(() => {
    // Format the number to include the country code and remove the leading zero
    // const formatted = `+234${whatsappNumber.slice(1)}`;
    // setFormattedNumber(formatted);
    setFormattedNumber(whatsappNumber);
  }, [whatsappNumber]);



  useEffect(() => {
    getUserData()
  }, [userInfo?.token])

  return (
    <>
      <div className=" overflow-hidden ">
        <Timeline>
          <TimelineItem
            sx={{
              "&::before": {
                display: "none",
              },
            }}
            className="px-[1rem]  "
          >
            <TimelineSeparator className="  flex">
              <TimelineDot
                sx={{ background: "#ff000000", boxShadow: "none" }}
                className=" shadow-none bg-none"
              >
                <div className=" size-[24px]   rounded-full  border-[7px] border-[#DA9658] "></div>
              </TimelineDot>
              {renderDashedLine()}
            </TimelineSeparator>
            <TimelineContent className=" " sx={{ py: "14px", px: 0 }}>
              <Typography
                className=" text-[#DA9658] leading-[24px]"
                variant="h6"
                component="span"
              >
                Connect social network
              </Typography>
              <Box className=" rounded-[12px] w-[306px] md:w-[595px] border-[#EDEDED] p-[16px] border-[1px]">
                <Box className=" flex justify-between w-full  ">
                  <Box className=" text-[#8F96A3] flex gap-[8px] items-center ">
                    <img
                      className=" size-[32px]"
                      src={googleIcon}
                      alt={"google"}
                    />
                    Google
                  </Box>
                  <Box className=" w-fit   text-[#8F96A3] ">
                    <Checkbox
                      checked={true}
                      sx={{
                        padding: 0,
                        color: '#02AB75',
                        '&.Mui-checked': {
                          color: '#02AB75',
                        },
                      }}
                      {...label}
                      defaultChecked
                    />
                  </Box>
                </Box>

              </Box>
              <Box className={` border-[#EDEDED]  ease-in delay-75 transition-all  rounded-[12px] mt-[16px] w-[306px] md:w-[595px]  p-[16px] border-[1px]`}>
                <Box className=" flex justify-between w-full  ">
                  <Box className=" text-[#8F96A3] flex gap-[8px] items-center ">
                    <img
                      className=" size-[32px]"
                      src={whatsappIcon}
                      alt={"google"}
                    />
                    Whatsapp
                  </Box>
                  <Box className=" w-[38px]   text-[#8F96A3] ">
                    <ToggleIcon checked={checked} setChecked={setChecked} />
                  </Box>
                </Box>
                {checked &&
                  <div className="  flex items-start gap-3">

                    <PhoneInput
                      country={'ng'}
                      placeholder="Enter phone number"
                      value={whatsappNumber}
                      onChange={handlePhoneNumberChange}
                      countryCodeEditable={true}
                      enableSearch={true}
                      autoFormat={true}
                      className={`text-[#262728] border ease-in delay-75 transition-all my-[8px] mt-[1rem] outline-none rounded-[8px] `}
                    />
                    {/* {error && (
                      <p className="error-message text-red-500">{error}</p>
                    )} */}

                  </div>
                }
                {checked && <button
                  onClick={() => {
                    if (whatsappNumber.length > 10) {
                      handleWhatsapp();
                    }
                  }}
                  disabled={whatsappNumber.length < 13}
                  className="rounded-[8px] ease-in delay-75 transition-all disabled:bg-[#da97588a] mt-[32px] bg-[#DA9658] px-[19px] py-[4px] text-white"
                >
                  {loading ? (
                    <div className=" flex gap-4 items-center">
                      Connecting
                      <CircularProgress
                        size={20}
                        sx={{ color: "white" }}
                        className=" text-white ml-[.5rem]"
                      />
                    </div>

                  ) : " Connect "}
                </button>}

              </Box>
              {!checked && <button
                onClick={() => {

                  handleNext()
                }
                }

                className=" rounded-[8px]  mt-[32px] bg-[#DA9658] px-[81.5px] py-[16.5px] text-white "
              >
                Continue
              </button>}
            </TimelineContent>
          </TimelineItem>

          <TimelineItem
            sx={{
              "&::before": {
                display: "none",
              },
            }}
          >
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  background: "#ff000000",
                  marginLeft: "1rem",
                  boxShadow: "none",
                }}
                className=" shadow-none bg-none"
              >
                <div className=" size-[24px]   rounded-full  border-[7px] border-[#c4c4c4] "></div>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ py: "14px", px: "3px" }}>
              <Typography
                className=" text-[#020202] leading-[24px]"
                variant="h6"
                component="span"
              >
                Schedule Notification
                <Box className=" w-[306px] md:w-[595px]"></Box>
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </>
  );
};

export default Step1;
