import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { Checkbox, FormControl, InputLabel, MenuItem, Select, ThemeProvider, ToggleButton, ToggleButtonGroup, createTheme } from '@mui/material'
import { useState } from 'react'
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {   TimelineOppositeContent } from '@mui/lab';
import { BsChevronBarDown, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import trash from '../assets/trash_2.png'
import { useNavigate } from 'react-router-dom';
const checkboxTheme = createTheme({
    palette: {
        customColor: {
            main: '#DA9658',
        },
    },
});


const renderDashedLine = () => {
    const segments = [];
    for (let i = 0; i < 4; i++) {
        segments.push(
            <Box
                key={i}
                width="2px"
                height="10px"
                bgcolor="#D1A055" // gold color
                margin="4px 0"
            />
        );
    }
    return segments;
};


const timing = [
    {
        text: "Weekly"
    },
    {
        text: "Monthly"
    },
    {
        text: "Quarterly"
    },
    {
        text: "Yearly"
    },
]

const Reminder = () => {
  const [open, setOpen] = useState(false);
    const [reminders, setReminders] = useState([]);
    const [reminder, setReminder] = useState('');
    const [time, setTime] = useState({ hour: '', minute: '', period: 'AM' });
    const [alignment, setAlignment] = useState('AM');
    const [checkReminder, setCheckReminder] = useState(true)
    const navigate = useNavigate()

    const handleChange = (event) => {
        setCheckReminder(true)
        setReminder(event.target.value);
    };

    const handleTimeChange = (field, value) => {
        setTime((prevTime) => ({
            ...prevTime,
            [field]: value
        }));
    };

    const handleAlignment = (period) => {
        setTime((prevTime) => ({
            ...prevTime,
            period
        }));
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const SelectIcon = ({ open }) => {
        return (<div className=' text-[#B4B9C2] pr-[1.2rem]'>
            {!open ? <BsChevronDown /> : <BsChevronUp />}

        </div>)
    };




    const addReminder = () => {
        if (checkReminder && isValidReminder) {
            setCheckReminder(true)
            if (time.hour !== '' && time.minute !== '') {
                const newReminder = {
                    reminder: reminder !== '' ? reminder : 'No Reminder Name',
                    time: `${time.hour}:${time.minute} ${time.period}`
                };
                setReminders([...reminders, newReminder]);
                // Clear form after adding
                setTime({ hour: '', minute: '', period: 'AM' });
            }
        }

        !isValidReminder() ? setCheckReminder(false) : setCheckReminder(true);
    };

    const deleteReminder = (index) => {
        const updatedReminders = [...reminders];
        updatedReminders.splice(index, 1);
        setReminders(updatedReminders);
    };

    const daysOfWeek = ['Everyday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const isValidReminder = () => {
        return daysOfWeek.includes(reminder);
    };

  return (
    <div className='grid   md:pt-[56px] md:px-[151px]'>
        <div className='w-fit grid justify-start'>
            <h2 className='w-fit font-semibold text-[40px]'>Change user preferences below</h2>
            <p className='w-fit text-slate-400'>Update reminder preferences</p>
        </div>
        
        <div className=' flex flex-col   gap-[16px]'>
            <Timeline >
                <TimelineItem
                    className='  '

                >
                    <TimelineSeparator className=' flex'>
                        <TimelineDot sx={{ background: "#ff000000", boxShadow: "none" }} className=' shadow-none bg-none' >
                            <div className=' p-[6px]   rounded-full  border-[.6rem] border-[#DA9658] size-[24px]'>
                            </div>
                        </TimelineDot>
                        {renderDashedLine()}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '14px', px: 2 }}>
                        <Typography className=' text-[#020202] leading-[24px]' variant="h6" component="span">
                            Connect social network
                            <Box className=" w-[342px] text-a md:w-[595px]"></Box>
                        </Typography>
                    </TimelineContent>

                </TimelineItem>

                <TimelineItem sx={{
                    '&::before': {
                        display: 'none',


                    },
                }} >
                    <TimelineSeparator>
                        <TimelineDot sx={{ background: "#ff000000", boxShadow: "none" }} className=' shadow-none bg-none' >
                            <div className=' p-[9px] ml-[2rem]  rounded-full  border-[.6rem] border-[#E4E2E0] size-[5px]'>
                            </div>
                        </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '14px' }}>
                        <Typography className='  text-[#DA9658] leading-[24px]' variant="h6" component="span">
                            Schedule Notification
                        </Typography>
                        <Box className=" w-[306px] md:w-[595px]">
                            <p className=' text-[#8F96A3] text-[14px] '>&#123; add descriptive note &#125;</p>


                            <form className=' w-[306px] md:w-[359px]' action=''>

                                <label className=' text-[16px] text-black flex gap-[8px] flex-col  mb-[8px]' htmlFor="">
                                    Reminder
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ outline: "none", border: "none" }} className={`border outline-none  rounded-sm  ${!checkReminder ? 'border-[#ff6a67] ' : 'border-[#F1F2F3] '}`} id="demo-simple-select-label"
                                        >

                                        </InputLabel>
                                        <Select
                                            sx={{ outline: "none" }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={reminder}
                                            onChange={handleChange}
                                            label=''
                                            className={`border outline-none  rounded-sm  ${!checkReminder ? 'border-[#ff6a67] ' : 'border-[#F1F2F3] '}`}
                                            onOpen={handleOpen}
                                            onClose={handleClose}
                                            IconComponent={() => <SelectIcon open={open} />}
                                        >
                                            {daysOfWeek.map((day) => (
                                                <MenuItem key={day} value={day}>{day}</MenuItem>
                                            ))}
                                        </Select>
                                        {!checkReminder && (
                                            <div style={{ color: 'red', marginTop: '5px' }}>Choose a day</div>
                                        )}
                                    </FormControl>
                                </label>

                                <label className=' text-[16px] text-black flex gap-[8px] flex-col  mb-[8px]' htmlFor="">
                                    Reminder Time
                                    <FormControl >
                                        <div className=' flex gap-[8px]  items-center'>
                                            <div className=' border w-[248px] h-[68px] flex place-content-center  border-[#FAF2EA] pl-[15.5px] pr-[9px] rounded-[8px]'>
                                                <input
                                                    placeholder='00'
                                                    min={0}
                                                    max={59}
                                                    className='text-center w-[48px] font-[500] text-[20px] h-[28px] my-auto'
                                                    type="number"
                                                    value={time.hour}
                                                    inputMode="numeric"
                                                    pattern="\d*"
                                                    onChange={(e) => {
                                                        e.target.value = parseInt(e.target.value).toLocaleString('en-US', {
                                                            minimumIntegerDigits: 2,
                                                            useGrouping: false
                                                        });
                                                        handleTimeChange('hour', e.target.value)
                                                    }}
                                                />

                                                <input
                                                    placeholder='00'
                                                    min={0}
                                                    max={59}
                                                    className='text-center w-[48px] font-[500] text-[20px] h-[28px] my-auto'
                                                    type="number"
                                                    value={time.minute}
                                                    inputMode="numeric"
                                                    pattern="\d*"
                                                    onChange={(e) => {
                                                        e.target.value = parseInt(e.target.value).toLocaleString('en-US', {
                                                            minimumIntegerDigits: 2,
                                                            useGrouping: false
                                                        });
                                                        handleTimeChange('minute', e.target.value)
                                                    }}

                                                />

                                                <div className=' items-center  w-[112px] my-auto h-[45px] grid grid-cols-2 p-[3.5px] rounded-[8px] bg-[#E0A7741A]'>
                                                    <button
                                                        value='AM'
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleAlignment('AM');
                                                        }}
                                                        className={`w-[52px] h-[37px] m-auto rounded-[8px] ${time.period === 'AM' ? 'bg-white text-black' : 'bg-none text-gray-500'
                                                            }`}
                                                    >
                                                        AM
                                                    </button>
                                                    <button
                                                        value='PM'
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleAlignment('PM');
                                                        }}
                                                        className={`w-[52px] h-[37px] m-auto rounded-[8px] ${time.period === 'PM' ? 'bg-white text-black' : 'bg-none text-gray-500'
                                                            }`}
                                                    >
                                                        PM
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                type='button'
                                                className='bg-[#DA9658] h-[34px] w-[34px] flex items-center justify-center text-[32px] font-light text-white rounded-full ' onClick={addReminder}
                                            >
                                                +
                                            </button>

                                        </div>
                                    </FormControl>
                                </label>

                                <div className='flex gap-[8px] items-center'>


                                    <div className=' w-[248px] grid gap-[8px] '>
                                        {reminders.map((reminder, index) => (
                                            <div key={index} className='flex w-full h-[62px] p-[16px] rounded-[8px] border-[#FAF2EA] justify-between border  items-center gap-2'>
                                                <span>{` ${reminder.time}`}</span>
                                                <button
                                                    type='button'
                                                    className=' text-white px-2 py-1 rounded'
                                                    onClick={() => deleteReminder(index)}
                                                >
                                                    <img className=' h-[18px]' src={trash} alt='trash' />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/')
                                }}
                                    className=' bg-[#DA9658] mt-[77px] md:mt-[126px] text-white py-[16.5px] text-center w-[236px] h-[60px] rounded-[8px]'>
                                    Save Preferences
                                </button>
                            </form>
                        </Box>

                    </TimelineContent>

                </TimelineItem>
            </Timeline >
        </div >
       
        <div></div>
</div>
  )
}

export default Reminder