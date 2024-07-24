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
  const [time, setTime] = useState({ hour: "", minute: "", period: "AM" });
  const [checkReminder, setCheckReminder] = useState(true);
  const navigate = useNavigate();
  const { userInfo, logOut } = useContext(Usercontext);
  const [loading, setLoading] = useState(false);

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


  const handleTimeChange = (field, event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Truncate to two characters
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2);
    }

    setTime((prevTime) => ({
      ...prevTime,
      [field]: inputValue,
    }));
  };

  const handleAlignment = (period) => {
    setTime((prevTime) => ({
      ...prevTime,
      period,
    }));
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


  const addReminder = async () => {
    if (checkReminder && isValidReminder) {
      setCheckReminder(true);
      if (time.hour !== "" && time.minute !== "") {
        // Parse hour and minute from the time object
        const hour = parseInt(time.hour, 10);
        const minute = parseInt(time.minute, 10);

        // Create a new reminder with hour and minute as separate properties
        const newReminder = {
          reminder: reminder !== "" ? reminder : "No Reminder Name",
          hour: hour.toString(),       // Store hour
          time: minute.toString(),   // Store minute
        };

        setReminders([...reminders, newReminder]);
        // Clear form after adding
        setTime({ hour: "", minute: "", period: "AM" });
        setReminder("");
      }
    } else {
      setCheckReminder(false);
    }
  };


  const savePreferences = async () => {
    // Format all times to match the required "12:30 am" format
    const formattedTimes = reminders.map((r) => {
      // Default to empty strings if hour or minute are undefined
      const hour = r.hour !== undefined ? parseInt(r.hour, 10) : 0;
      const minute = r.minute !== undefined ? parseInt(r.minute, 10) : 0;

      // Validate hour and minute ranges
      if (isNaN(hour) || isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) {
        console.error(`Invalid time values: hour=${hour}, minute=${minute}`);
        return ""; // or handle the error as appropriate
      }

      // Determine period based on hour
      const period = hour >= 12 ? "PM" : "AM";

      // Convert hour to 12-hour format and adjust for 12 AM/PM cases
      const formattedHour = (hour % 12) || 12;
      const formattedMinute = minute.toString().padStart(2, "0");

      // Format time as "h:mm am/pm"
      return `${formattedHour}:${formattedMinute} ${period.toLowerCase()}`;
    });

    // Filter out any invalid or empty times
    const validTimes = formattedTimes.filter(time => time !== "");

    console.log(validTimes); // Check the formatted times

    const token = extractToken(userInfo.token);

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/api/reminders/addnew",
        {
          times: validTimes,
        },
        {
          headers: {
            Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Reminder saved successfully");
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status === 401) {
        logOut();
        toast.error("Session expired. Please log in again.");
      } else {
        console.log(error.response);
        toast.error(error.response?.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };


  const getAllReminders = async () => {
    if (userInfo?.token?.length > 4) {
      try {
        const res = await axiosInstance.get("/api/reminders", {
          headers: {
            Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
            "Content-Type": "application/json",
          },
        });
        setReminders(res.data.data);
      } catch (error) {
        toast.error("Error fetching reminders");
      }
    }
  };

  const deleteReminder = async (id) => {
    try {
      await axiosInstance.delete(`/api/reminders/delete/${id}`, {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        },
      });
      setReminders(reminders.filter((reminder) => reminder.id !== id));
      toast.success("Reminder deleted successfully");
    } catch (error) {
      toast.error("Error deleting reminder");
    }
  };

  useEffect(() => {
    getAllReminders();
  }, [userInfo?.token]);


  const isValidReminder = () => {
    return daysOfWeek.includes(reminder);
  };

  const convertToReadableTime = (hour, time) => {
    let hours = hour;
    let minutes = time;

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };



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
                          min={0}
                          max={59}
                          className="text-center w-[48px] font-[500] text-[20px] h-[28px] my-auto"
                          type="number"
                          value={time.hour}
                          inputMode="numeric"
                          pattern="\d*"
                          onChange={(e) => {
                            e.target.value = parseInt(
                              e.target.value
                            ).toLocaleString("en-US", {
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
                          maxLength={2}
                          className="text-center w-[48px] font-[500] text-[20px] h-[28px] my-auto"
                          type="number"
                          value={time.minute}
                          inputMode="numeric"
                          pattern="\d*"
                          onChange={(e) => {
                            e.target.value = parseInt(
                              e.target.value
                            ).toLocaleString("en-US", {
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
                              handleAlignment("AM");
                            }}
                            className={`w-[52px] h-[37px] m-auto rounded-[8px] ${time.period === "AM"
                              ? "bg-white text-black"
                              : "bg-none text-gray-500"
                              }`}
                          >
                            AM
                          </button>
                          <button
                            value="PM"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAlignment("PM");
                            }}
                            className={`w-[52px] h-[37px] m-auto rounded-[8px] ${time.period === "PM"
                              ? "bg-white text-black"
                              : "bg-none text-gray-500"
                              }`}
                          >
                            PM
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="bg-[#DA9658] h-[34px] w-[34px] flex items-center justify-center text-[32px] font-light text-white rounded-full"
                        onClick={addReminder}
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
                          {convertToReadableTime(reminder.hour, reminder.time)}
                        </span>
                        <button
                          type="button"
                          className="text-white px-2 py-1 rounded"
                          onClick={() => deleteReminder(reminder.id)}
                        >
                          <img className="h-[18px]" src={trash} alt="trash" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    savePreferences();
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
