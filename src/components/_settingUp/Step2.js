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
import React, { useContext, useState } from "react";
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
import {
  BsCheck,
  BsChevronBarDown,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import trash from "../../assets/trash_2.png";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { Usercontext } from "../../context/userContext";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

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

const timing = [
  {
    text: "Weekly",
  },
  {
    text: "Monthly",
  },
  {
    text: "Quarterly",
  },
  {
    text: "Yearly",
  },
];

const Step2 = () => {
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reminder, setReminder] = useState("");
  const [time, setTime] = useState({ hour: "", minute: "", period: "AM" });
  const [checkReminder, setCheckReminder] = useState(true);
  const navigate = useNavigate();
  const { userInfo, logOut } = useContext(Usercontext);
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setCheckReminder(true);
    setReminder(event.target.value);
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

  console.log(userInfo);
  const addReminder = async () => {
    if (checkReminder && isValidReminder) {
      setCheckReminder(true);
      if (time.hour !== "" && time.minute !== "") {
        const newReminder = {
          reminder: reminder !== "" ? reminder : "No Reminder Name",
          time: `${time.hour}:${time.minute} ${time.period.toLowerCase()}`,
        };

        setReminders([...reminders, newReminder]);
        // Clear form after adding
        setTime({ hour: "", minute: "", period: "AM" });
      }
    }

    !isValidReminder() ? setCheckReminder(false) : setCheckReminder(true);
  };

  const extractToken = (token) => {
    // Assume token is already in the correct format
    return token;
  };

  const savePreferences = async () => {
    const allTimes = [...reminders.map((r) => r.time)];
    console.log(allTimes);

    const token = extractToken(userInfo.token); // Ensure the token is properly extracted
    console.log("Extracted Token:", token); // Log the token for debugging
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/users/setup",
        {
          times: allTimes,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      toast.success("Reminder saved successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      if (error.response?.status === 401) {
        // Handle unauthorized (token expired) error
        logOut(); // Call logout function if token expires
        toast.error("Session expired. Please log in again."); // Show user a message
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  const daysOfWeek = ["Everyday"];

  const isValidReminder = () => {
    return daysOfWeek.includes(reminder);
  };

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
              <p className=" text-[#8F96A3] text-[14px] ">
                &#123; add descriptive note &#125;
              </p>

              <form className=" w-[306px] md:w-[359px]" action="">
                <label
                  className=" text-[16px] text-black flex gap-[8px] flex-col  mb-[8px]"
                  htmlFor=""
                >
                  Reminder
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{ outline: "none", border: "none" }}
                      className={`border outline-none  rounded-sm  ${
                        !checkReminder
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
                      className={`border outline-none  rounded-sm  ${
                        !checkReminder
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

                        <div className=" items-center  w-[112px] my-auto h-[45px] grid grid-cols-2 p-[3.5px] rounded-[8px] bg-[#E0A7741A]">
                          <button
                            value="AM"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAlignment("AM");
                            }}
                            className={`w-[52px] h-[37px] m-auto rounded-[8px] ${
                              time.period === "AM"
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
                            className={`w-[52px] h-[37px] m-auto rounded-[8px] ${
                              time.period === "PM"
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
                        className="bg-[#DA9658] h-[34px] w-[34px] flex items-center justify-center text-[32px] font-light text-white rounded-full "
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
                        className="flex w-full h-[62px] p-[16px] rounded-[8px] border-[#FAF2EA] justify-between border  items-center gap-2"
                      >
                        <span>{` ${reminder.time}`}</span>
                        <button
                          type="button"
                          className=" text-white px-2 py-1 rounded"
                          onClick={() => deleteReminder(index)}
                        >
                          <img className=" h-[18px]" src={trash} alt="trash" />
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
