import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  createTheme,
} from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BsCheck,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import trash from "../../assets/trash_2.png";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
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
  for (let i = 0; i < 2; i++) {
    segments.push(
      <Box key={i} width="2px" height="7px" bgcolor="#D1A055" margin="4px 0" />
    );
  }
  return segments;
};


const Step2 = () => {
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reminder, setReminder] = useState("Everyday");
  const [time, setTime] = useState({
    hour: '00',
    minute: '00',
    period: 'am'
  });
  const [checkReminder, setCheckReminder] = useState(true);
  const navigate = useNavigate();
  const { userInfo, logOut } = useContext(Usercontext);
  const [loading, setLoading] = useState(false);
  const [hourRange, setHourRange] = useState({ min: 0, max: 23 });
  const extractToken = (token) => {
    return token;
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Truncate to two characters
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2);
    }

    setCheckReminder(true);
    setReminder(inputValue);
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
        const fetchedReminders = response.data.data.map((reminder) => ({
          id: reminder.id,
          hour: reminder.hour + 1,
          minute: reminder.time,
          period: reminder.hour + 1 < 12 ? 'AM' : 'PM',
        }));
        setReminders(fetchedReminders);
        console.log(fetchedReminders);
      } catch (error) {
        console.log(error);
        console.error('Error fetching reminders:', error);
      }
    }
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


  const handleAlignment = (selectedPeriod) => {
    // Determine if selectedPeriod is AM or PM, defaulting to AM if not provided
    const isAM = selectedPeriod ? selectedPeriod === 'AM' : true;

    // Define hour range based on AM or PM
    const min = isAM ? 0 : 12;  // AM hours range from 0-11, PM hours range from 12-23
    const max = isAM ? 11 : 23;

    // Update hour range and time state
    setHourRange({ min, max });
    setTime((prevTime) => ({
      ...prevTime,
      hour: isAM ? '00' : '12',  // Default hour for AM is 00, for PM is 12
      minute: '00',
      period: isAM ? 'am' : 'pm',
    }));
  };

  const formatReminderToString = (reminder) => {
    const { hour, time } = reminder;

    // Determine AM/PM period
    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    const displayMinute = time.toString().padStart(2, '0'); // Ensure two-digit minute

    // Return formatted string
    return `${displayHour}:${displayMinute} ${period.toLowerCase()}`;
  };



  const handleTimeChange = (field, e) => {
    const value = e.target.value;
    setTime((prevTime) => ({
      ...prevTime,
      [field]: value,
    }));
  };


  const addReminder = () => {
    if (reminders.length < 4) {
      if (time.hour !== '' && time.minute !== '') {
        setReminders((prevReminders) => [
          ...prevReminders,
          { index: reminders.length + 1, hour: parseInt(time.hour, 10), minute: parseInt(time.minute, 10), period: time.period },
        ]);
        setTime({ hour: '', minute: '', period: 'AM' });
      }
    } else {
      toast.error(`You've reached your limit `)
    }

  };

  const savePreferences = async () => {
    setLoading(true);

    const formattedReminders = reminders.map(reminder => {
      let hour = reminder.hour;
      let period = reminder.period.toLowerCase();

      if (hour === 0) {
        hour = 12; // Midnight case
      } else if (hour === 12) {
        period = 'pm'; // Noon case
      } else if (hour > 12) {
        hour -= 12;
        period = 'pm';
      }

      const minute = reminder.minute.toString().padStart(2, '0');

      return `${hour}:${minute} ${period}`;
    });

    // console.log(reminders);
    try {
      if (reminders.length < 4) {
        const response = await axiosInstance.post('/api/reminders/addnew', {
          times: formattedReminders,
        }, {
          headers: {
            Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(response.data.message);
          toast.success(response.data.message);
        }
      }
      else {
        toast.error("You've reached the limit")
      }

    } catch (error) {
      console.log(error);
      toast.error('Failed to save preferences.');

    } finally {
      setLoading(false);
    }
  };

  const convertToReadableTime = (hour, minute) => {
    let period = 'AM';
    let formattedHour = hour;

    if (hour === 0) {
      formattedHour = 12;
    } else if (hour === 12) {
      period = 'PM';
    } else if (hour > 12) {
      formattedHour = hour - 12;
      period = 'PM';
    }

    return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const deleteReminder = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/reminders/delete/${id}`, {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      setReminders(reminders.filter((reminder) => reminder.id !== id));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting reminder");
    }x
  };

  useEffect(() => {
    getAllReminders();
  }, [userInfo?.token]);



  const isValidReminder = () => {
    return daysOfWeek.includes(reminder);
  };


  const deleteReminderId = (id) => {
    console.log(id);
    const newReminders = reminders.filter(reminder => reminder.index !== id);
    console.log(newReminders);
    setReminders(newReminders)

  }

  const containerRef = useRef(null);

  const handleResize = useCallback((entry) => {
    // Your resize handling logic here
    console.log("Resized:", entry.contentRect);
  }, []);

  const daysOfWeek = ["Everyday"];


  return (
    <div ref={containerRef} className="flex flex-col mt-[24px] gap-[16px]">
      <Timeline sx={{ padding: "0px" }}>
        <TimelineItem
          className="w-[306px] h-0  md:w-[595px] "
          sx={{
            "&::before": {
              display: "none",
              height: '0rem',
            }, minHeight: "50px",

          }}
        >
          <TimelineSeparator className="grid m-0 size-fit ">
            <TimelineDot
              sx={{ background: "#ff000000", boxShadow: "none", marginBottom: '0', padding: '0', marginTop: '0' }}
              className="shadow-none m-0 size-fit bg-[#DA9658]"
            >
              <div className="size-[24px]  font-thin font-[fantasy] text-white rounded-full grid place-content-center bg-[#DA9658]">
                <BsCheck size={20} />
              </div>
            </TimelineDot>
            {renderDashedLine()}
          </TimelineSeparator>
          <TimelineContent sx={{ background: "#ff000000", boxShadow: "none", marginBottom: '0', paddingX: '12px', paddingTop: '0', paddingBottom: '0', marginTop: '0' }}>
            <Typography
              className="text-[#222222] text-[14px] font-[400] p-0 leading-[24px]"
              component="span"
            >
              Connect social network
              <Box className="w-[342px] md:w-[595px]"></Box>
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem
          className="w-[306px] h-10  md:w-[595px] "
          sx={{
            "&::before": {
              display: "none",
              height: '3rem',

            },

            "& .MuiTimelineDot-root": {
              marginTop: 0,
              marginBottom: 0,
            },
            "&::before": {
              display: "none",
            },
          }}
        >
          <TimelineSeparator>

            <TimelineDot
              sx={{ background: "#ff000000", boxShadow: "none" }}
              className="shadow-none bg-none"
            >
              <div className="size-[24px] rounded-full border-[7px] border-[#DA9658]"></div>
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ background: "#ff000000", boxShadow: "none", marginBottom: '0', paddingX: '9px', paddingTop: '0', paddingBottom: '0', marginTop: '0' }}>
            <Typography

              className="text-[#DA9658] text-[14px] font-[400] p-0 leading-[24px]"
              component="span"
            >
              Reminder Time
            </Typography>
            <Box className="w-[306px] md:w-[595px]">


              <form className="w-[306px] md:w-[359px]" action="">
                <label
                  className="text-[16px] text-black flex gap-[8px] flex-col mb-[8px]"
                  htmlFor=""
                >
                  {/* <FormControl fullWidth>
                    <Select
                      sx={{ outline: "none" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={reminder}
                      onChange={handleChange}
                      label=""
                      className="border outline-none rounded-sm border-[#F1F2F3]"
                    >
                      {daysOfWeek.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </label>

                <label
                  className="text-[16px] text-black flex gap-[8px] flex-col mb-[8px]"
                  htmlFor=""
                >
                  <FormControl>
                    <div className="flex gap-[8px] items-center">
                      <div className="border w-[248px] h-[68px] flex place-content-center border-[#FAF2EA] pl-[15.5px] pr-[9px] rounded-[8px]">
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
                        <div className="items-center w-[112px] my-auto h-[45px] grid grid-cols-2 p-[3.5px] rounded-[8px] bg-[#E0A7741A]">
                          <button
                            value="AM"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAlignment('AM');
                            }}
                            className={`w-[52px] h-[37px] m-auto rounded-[8px] ${time.period === "am" ? "bg-white text-black" : "bg-none text-gray-500"}`}
                          >
                            AM
                          </button>
                          <button
                            value="PM"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAlignment("PM");
                            }}
                            className={`w-[52px] h-[37px] m-auto rounded-[8px] ${time.period === "pm" ? "bg-white text-black" : "bg-none text-gray-500"}`}
                          >
                            PM
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="bg-[#DA9658] h-[34px] w-[34px] flex items-center justify-center text-[32px] font-light text-white rounded-full"
                        onClick={()=>{
                          if(reminders.length!==3){
                            addReminder()
                          }
                          else{
                            toast.error("Youve reached your limit !!")
                          }
                        }}
                      >
                        +
                      </button>
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
                          {convertToReadableTime(reminder.hour, reminder.minute)}
                        </span>
                        <button
                          type="button"
                          className="text-white px-2 py-1 rounded"
                          onClick={() => {
                            reminder.id ? deleteReminder(reminder.id) : deleteReminderId(index + 1)
                          }

                          }
                        >
                          <img className="h-[18px]" src={trash} alt="trash" />
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
                  className="bg-[#DA9658] mt-[77px] md:mt-[126px] text-white py-[16.5px] text-center w-[236px] h-[60px] rounded-[8px]"
                >
                  {loading ? (
                    <div className="text-white items-center gap-3 justify-center flex w-full h-full">
                      Saving...{" "}
                      <CircularProgress size={24} style={{ color: "white" }} />
                    </div>
                  ) : (
                    "Save Preferences"
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
