import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  createTheme,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { BsCheck, BsChevronDown, BsChevronUp } from "react-icons/bs";
import trash from "../../assets/trash_2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Usercontext } from "../../context/userContext";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../Utils/axiosInstance";

const checkboxTheme = createTheme({
  palette: {
    customColor: {
      main: "#DA9658",
    },
  },
});

const renderDashedLine = () => {
  const segments = [];
  for (let i = 0; i < 3; i++) {
    segments.push(
      <Box
        key={i}
        width="2px"
        height="7px"
        bgcolor="#D1A055" // gold color
        margin="4px 0"
      />
    );
  }
  return segments;
};

const Step2 = () => {
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reminder, setReminder] = useState("Everyday"); // Set "Everyday" as the default value
  const [time, setTime] = useState({
    hour: '00',
    minute: '00',
    period: 'AM',
  });
  const [checkReminder, setCheckReminder] = useState(true);
  const navigate = useNavigate();
  const { userInfo, setAuthInfo, logOut, whatsappNumber, setWhatsappNumber } = useContext(Usercontext);
  const [loading, setLoading] = useState(false);
  const [Deleteloading, setDeleteLoading] = useState(false);
  const [hourRange, setHourRange] = useState({ min: 0, max: 23 });
  const [deletingId, setDeletingId] = useState(null);
  const handleChange = (event) => {
    setCheckReminder(true);
    setReminder(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SelectIcon = ({ open }) => {
    return (
      <div className=" text-[#B4B9C2] pr-[1.2rem]">
        {!open ? <BsChevronDown /> : <BsChevronUp />}
      </div>
    );
  };

  const extractToken = (token) => {
    return token;
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("api/users/personalinfo", {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo?.token}` : "",
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
      navigate("/dashboard")
    } catch (error) {
      toast.error("Error while getting user information");
      return false;
    }
  };

  const daysOfWeek = ["Everyday"];

  const isValidReminder = () => {
    return daysOfWeek.includes(reminder);
  };

  const getAllReminders = async () => {
    if (userInfo?.token?.length > 4) {
      try {
        const response = await axios.get('/api/reminders', {
          headers: {
            Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
            "Content-Type": "application/json",
          },
        });
        const fetchedReminders = response.data.data.map((reminder) => {

          let hour = reminder.hour;
          const minute = reminder.time.toString().padStart(2, '0');
          let period = hour >= 12 ? 'PM' : 'AM';
          return {
            id: reminder.id,
            hour: reminder.hour,
            minute: reminder.time,
            period: period,
          }
        })
        console.log(response.data);
        setReminders(fetchedReminders);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    }
  };

  const handleAlignment = (selectedPeriod) => {
    const isAM = selectedPeriod === 'AM';

    setHourRange({ min: 0, max: 23 });
    setTime((prevTime) => ({
      ...prevTime,
      period: isAM ? 'AM' : 'PM',
    }));
  };

  const handleTimeChange = (field, e) => {
    const value = e.target.value;

    setTime(prevTime => ({
      ...prevTime,
      [field]: value,
      period: field === 'hour' ? (value >= 12 ? 'PM' : 'AM') : prevTime.period,
    }));
  };

  const addReminder = () => {
    if (reminders.length < 3) {
      if (time.hour !== '' && time.minute !== '') {
        setReminders((prevReminders) => [
          ...prevReminders,
          { index: reminders.length + 1, hour: parseInt(time.hour, 10), minute: parseInt(time.minute, 10), period: time.period },
        ]);
        setTime({ hour: '00', minute: '00', period: 'AM' });
      }
    } else {
      toast.error(`You've reached your limit`);
    }
  };

  const convertToReadableTime = (hour, minute, period) => {
    return `${hour?.toString().padStart(2, '0')}:${minute?.toString().padStart(2, '0')} ${period}`;
  };

  const deleteReminder = async (id) => {
    try {
      setDeletingId(id)
      setDeleteLoading(true)
      const res = await axiosInstance.delete(`/api/reminders/delete/${id}`, {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        },
      });
      setReminders(reminders.filter((reminder) => reminder.id !== id));
      toast.success(res.data.message);
      setDeleteLoading(false)
    } catch (error) {
      setDeletingId(null);
      setDeleteLoading(false)
      toast.error("Error deleting reminder");
    }
  };

  const deleteReminderId = (id) => {
    const newReminders = reminders.filter(reminder => reminder.index !== id);
    setReminders(newReminders);
  };

  useEffect(() => {
    getAllReminders();
  }, [userInfo?.token]);

  const savePreferences = async () => {
    setLoading(true);
    console.log(reminders);
    const formattedReminders = reminders.map(reminder => {
      let hour = parseInt(reminder.hour, 10);
      const minute = reminder.minute.toString().padStart(2, '0');
      let period = reminder.period.toLowerCase();

      // Normalize the hour and period
      if (hour === 0) {
        hour = 12; // Convert 0 AM to 12 AM
        period = 'am';
      } else if (hour > 12) {
        hour -= 12;
        period = 'pm';
      } else if (hour === 12) {
        period = period === 'am' ? 'pm' : 'am'; // Adjust 12 PM or 12 AM correctly
      } else {
        period = period === 'pm' ? 'pm' : 'am'; // For any hour from 1 to 11, set period based on input or default to 'am'
      }

      // Ensure hour is in 12-hour format with a leading zero if needed
      const formattedHour = hour.toString().padStart(2, '0');

      return `${formattedHour}:${minute} ${period}`;
    });

    try {
      const response = await axiosInstance.post('api/users/setup', {
        times: formattedReminders,
      }, {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        const updatedData = { ...userInfo, setup: true };
        setAuthInfo(updatedData);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save preferences.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(reminders);
  }, [reminders])

  useEffect(() => {
    if (userInfo.setup === true) {
      navigate("/dashboard")
    }
  }, [userInfo])

  return (
    <div className=" flex flex-col   gap-[16px]">
      <Timeline sx={{ padding: "0px" }}>
        <TimelineItem
          className="w-[306px] md:w-[595px]  "
          sx={{
            "&::before": {
              display: "none",
            },
          }}
        >
          <TimelineSeparator className=" flex">
            <TimelineDot
              sx={{ background: "#ff000000", boxShadow: "none" }}
              className=" shadow-none  bg-[#DA9658]"
            >
              <div className=" size-[24px] font-thin font-[fantasy]  text-white  rounded-full  grid place-content-center bg-[#DA9658] ">
                <BsCheck size={20} />
              </div>
            </TimelineDot>
            {renderDashedLine()}
          </TimelineSeparator>
          <TimelineContent sx={{ py: "14px", px: "12px" }}>
            <Typography
              className=" text-[#020202] leading-[24px]"
              variant="h6"
              component="span"
            >
              Connect social network
              <Box className=" w-[342px] md:w-[595px]"></Box>
            </Typography>
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
              sx={{ background: "#ff000000", boxShadow: "none" }}
              className=" shadow-none bg-none"
            >
              <div className=" size-[24px]   rounded-full  border-[7px] border-[#DA9658] "></div>
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ py: "14px", px: "12px" }}>
            <Typography
              className="  text-[#DA9658] leading-[24px]"
              variant="h6"
              component="span"
            >
              Schedule Notification
            </Typography>
            <Box className=" w-[306px] md:w-[595px]">


              <form className=" w-[306px] md:w-[359px]" action="">
                <label
                  className=" text-[16px] text-black flex gap-[8px] flex-col  mb-[8px]"
                  htmlFor=""
                >
                  Reminder
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{ outline: "none", border: "none" }}
                      className={`border outline-none  rounded-sm  ${!checkReminder
                        ? "border-[#ff6a67] "
                        : "border-[#F1F2F3] "
                        }`}
                      id="demo-simple-select-label"
                    ></InputLabel>
                    <Select
                      sx={{ outline: "none" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={reminder}
                      onChange={handleChange}
                      label=""
                      className={`border outline-none  rounded-sm  ${!checkReminder
                        ? "border-[#ff6a67] "
                        : "border-[#F1F2F3] "
                        }`}
                      onOpen={handleOpen}
                      onClose={handleClose}
                      IconComponent={() => <SelectIcon open={open} />}
                    >
                      {daysOfWeek.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                    {!checkReminder && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        Choose a day
                      </div>
                    )}
                  </FormControl>
                </label>

                <label
                  className=" text-[16px] text-black flex gap-[8px] flex-col  mb-[8px]"
                  htmlFor=""
                >
                  Reminder Time
                  <FormControl>
                    <div className=" flex gap-[8px]  items-center">
                      <div className=" border w-[248px] h-[68px] flex place-content-center  border-[#FAF2EA] pl-[15.5px] pr-[9px] rounded-[8px]">
                        <input
                          placeholder="00"
                          min={hourRange.min}
                          max={hourRange.max}
                          className="text-center w-[48px] font-[500] text-[20px] h-[28px] my-auto"
                          type="number"
                          value={time.hour}
                          inputMode="numeric"
                          pattern="\d*"
                          onChange={(e) => {
                            let newValue = parseInt(e.target.value, 10);
                            if (isNaN(newValue)) newValue = 0;
                            newValue = Math.max(hourRange.min, Math.min(newValue, hourRange.max));
                            e.target.value = newValue.toLocaleString("en-US", {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            });
                            handleTimeChange("hour", e);
                          }}
                        />
                        <input
                          placeholder="00"
                          min={0}
                          max={59}
                          className="text-center w-[48px] font-[500] text-[20px] h-[28px] my-auto"
                          type="number"
                          value={time.minute}
                          inputMode="numeric"
                          pattern="\d*"
                          onChange={(e) => {
                            let newValue = parseInt(e.target.value, 10);
                            if (isNaN(newValue)) newValue = 0;
                            newValue = Math.max(0, Math.min(newValue, 59));
                            e.target.value = newValue.toLocaleString("en-US", {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            });
                            handleTimeChange("minute", e);
                          }}
                        />

                        <div className=" items-center  w-[112px] my-auto h-[45px] grid grid-cols-2 p-[3.5px] rounded-[8px] bg-[#E0A7741A]">
                          <button
                            value="AM"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAlignment('AM');
                            }}
                            className={`w-[52px] h-[37px] m-auto rounded-[8px] ${time.period === "AM" ? "bg-white text-black" : "bg-none text-gray-500"}`}
                          >
                            AM
                          </button>
                          <button
                            value="PM"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAlignment('PM')
                            }}
                            className={`w-[52px] h-[37px] m-auto rounded-[8px] ${time.period === "PM" ? "bg-white text-black" : "bg-none text-gray-500"}`}
                          >
                            PM
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-[34px] h-[34px]">
                        <button
                          type="button"
                          className="bg-[#DA9658] h-[34px] w-[34px] flex items-center justify-center text-[32px] font-light text-white rounded-full"
                          onClick={addReminder}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </FormControl>
                </label>

                <div className="flex gap-[8px] items-center">
                  <div className=" w-[248px] grid gap-[8px] ">
                    {reminders.map((reminder, index) => (
                      <div
                        key={index}
                        className="flex w-full h-[62px] p-[16px] rounded-[8px] border-[#FAF2EA] justify-between border items-center gap-2"
                      >
                        <span>
                          {convertToReadableTime(reminder?.hour, reminder?.minute, reminder?.period)}

                        </span>
                        <button
                          type="button"
                          className="text-white px-2 py-1 rounded"
                          onClick={() => {
                            reminder.id ? deleteReminder(reminder.id) : deleteReminderId(reminder.index)
                          }}>
                          {reminder.id === deletingId ? (
                            <div className="text-[14px] text-black items-center gap-3 justify-center flex w-full h-full">
                              Deleting...{" "}
                              <CircularProgress size={18} style={{ color: "orange" }} />
                            </div>
                          ) : (
                            <img className="h-[18px]" src={trash} alt="trash" />
                          )}

                        </button>
                      </div>
                    ))}

                    {reminders.length > 2 && <p className=" text-red-500">Maximum is 3</p>}

                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (reminders.length < 4) {
                      savePreferences();
                    } else {
                      toast.error(`You've reached your limit `)
                    }
                  }}
                  className=" bg-[#DA9658] mt-[77px] md:mt-[126px] text-white py-[16.5px] text-center w-[236px] h-[60px] rounded-[8px]"
                >
                  {loading ? (
                    <div className=" text-white items-center gap-3 justify-center flex w-full h-full">
                      Saving...{" "}
                      <CircularProgress size={24} style={{ color: "white" }} />
                    </div>
                  ) : (
                    "  Save Preferences"
                  )}
                </button>
              </form>
            </Box>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default Step2;
