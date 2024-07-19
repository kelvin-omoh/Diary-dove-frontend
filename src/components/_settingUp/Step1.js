import React, { useContext, useEffect } from 'react'
import whatsappIcon from '../../assets/Group (1).png';
import googleIcon from '../../assets/icons8-google 1.png';
import { Checkbox } from '@mui/material';
import { useState } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';
import { Switch, Button, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BsCircle, BsGoogle, BsWhatsapp } from 'react-icons/bs';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import ToggleIcon from './ToggleIcon';

import { Usercontext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Step1 = ({ activeStep, handleNext }) => {
    const [google, setGoogle] = useState(false);
    const [whatsapp, setWhatsapp] = useState(false);
    const { setAuthInfo, userInfo } = useContext(Usercontext)
    const navigate = useNavigate()
    const handleGoogleChange = (event) => {
        setGoogle(event.target.checked);
    };

    const handleWhatsappChange = (event) => {
        setWhatsapp(event.target.checked);
    };

    const getAllReminders = async () => {
        try {
            const res = await axios.get("/api/reminders", {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : '',
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data.data);
            if (res?.data?.data?.length > 0) {
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(error);
            console.error("Error fetching reminders:", error);
        }
    };

    useEffect(() => {
        getAllReminders()
    }, [])


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
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <>
            <div className=' overflow-hidden '>
                <Timeline>
                    <TimelineItem sx={{
                        '&::before': {
                            display: 'none',
                        },
                    }} className='px-[1rem]  '>
                        <TimelineSeparator className='  flex'>
                            <TimelineDot sx={{ background: "#ff000000", boxShadow: "none" }} className=' shadow-none bg-none' >
                                <div className=' size-[24px]   rounded-full  border-[7px] border-[#DA9658] '>
                                </div>
                            </TimelineDot>
                            {renderDashedLine()}
                        </TimelineSeparator>
                        <TimelineContent className=' ' sx={{ py: '14px', px: 0 }}>
                            <Typography className=' text-[#DA9658] leading-[24px]' variant="h6" component="span">
                                Connect social network
                            </Typography>
                            <Box className=" rounded-[12px] w-[306px] md:w-[595px] border-[#EDEDED] p-[16px] border-[1px]">
                                <Box className=" flex justify-between w-full  ">
                                    <Box className=" text-[#8F96A3] flex gap-[8px] items-center ">
                                        <img className=' size-[32px]' src={googleIcon} alt={'google'} />
                                        Google
                                    </Box>
                                    <Box className=" w-fit   text-[#8F96A3] ">
                                        <Checkbox {...label} defaultChecked color="success" />

                                    </Box>

                                </Box>
                                <input disabled value={userInfo?.email} type="text" className=' px-[1em] text-[#8F96A3] w-full my-[8px] h-[40px] outline-none  rounded-[8px] border-[1px] border-[#EDEDED] ' name="" id="" />


                            </Box>
                            <Box className=" rounded-[12px] mt-[16px] w-[306px] md:w-[595px] border-[#EDEDED] p-[16px] border-[1px]">
                                <Box className=" flex justify-between w-full  ">
                                    <Box className=" text-[#8F96A3] flex gap-[8px] items-center ">
                                        <img className=' size-[32px]' src={whatsappIcon} alt={'google'} />
                                        Whatsapp
                                    </Box>
                                    <Box className=" w-fit   text-[#8F96A3] ">
                                        <ToggleIcon />
                                    </Box>
                                </Box>

                            </Box>
                            <button onClick={handleNext} className=' rounded-[8px] mt-[32px] bg-[#DA9658] px-[81.5px] py-[16.5px] text-white '>Continue</button>


                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem sx={{
                        '&::before': {
                            display: 'none',
                        },
                    }} >
                        <TimelineSeparator>
                            <TimelineDot sx={{ background: "#ff000000", marginLeft: "1rem", boxShadow: "none" }} className=' shadow-none bg-none' >
                                <div className=' size-[24px]   rounded-full  border-[7px] border-[#c4c4c4] '>
                                </div>
                            </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '14px', px: '3px' }}>
                            <Typography className=' text-[#020202] leading-[24px]' variant="h6" component="span">
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