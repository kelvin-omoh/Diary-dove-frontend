import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Usercontext } from '../../context/userContext';
import axiosInstance from '../../Utils/axiosInstance';
import { registerLocale } from 'react-datepicker';
import enUS from 'date-fns/locale/en-US';
import { CircularProgress, MenuItem, Select } from '@mui/material';
import rightIcon from '../../assets/Right 2.png'
registerLocale('en-US', enUS);

export default function CalendarWithNotes({ setAllTexts, handleClose, allTexts }) {
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    const [loading, setLoading] = useState(false);
    const { userInfo } = useContext(Usercontext);

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("api/diaries/", {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo?.token}` : "",
                    "Content-Type": "application/json",
                },
            });
            setAllTexts(response.data.data);
        } catch (error) {
            toast.error("Error while getting notes");
        }
    };

    useEffect(() => {

        getAllNotes();
    }, [userInfo?.token]);

    const handleFilterWithCalendar = async () => {

        try {
            setLoading(true)
            const startDayjs = selectedStart ? dayjs(selectedStart) : null;
            const endDayjs = selectedEnd ? dayjs(selectedEnd) : null;

            const filterParams = new URLSearchParams({
                startDate: startDayjs ? startDayjs.format('YYYY-MM-DD') : '',
                endDate: endDayjs ? endDayjs.format('YYYY-MM-DD') : '',
                limit: 12,
            }).toString();

            const res = await axiosInstance.get(`/api/diaries/filter?${filterParams}`, {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo?.token}` : "",
                    "Content-Type": "application/json",
                },
            });
            handleClose()
            if (res.data.data?.length === 0) {
                toast.error("Couldn't find any results for the date range");
            } else {
                toast.success('Filter selected successfully');
            }
            setLoading(false)
            setAllTexts(res.data.data);

        } catch (error) {
            setLoading(false)
            toast.error(error.message || 'An error occurred');
        }
    };

    const renderHeader = ({ date, decreaseMonth, increaseMonth, changeYear, changeMonth }) => {
        const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i);
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return (
            <div className="flex justify-between w-full gap-[3rem]  items-center px-2 py-2">


                <div className="relative flex gap-1  items-start">
                    <Select
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => changeYear(parseInt(value))}
                        className="mr-2 bg-white w-fit flex gap-1 rounded"
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: '10rem',
                                },
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 0,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 0,
                            },
                            '&.MuiOutlinedInput-root': {
                                paddingRight: '0 !important',
                            },
                            '&.MuiSelect-select': {
                                padding: 0,
                            },
                        }}
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={months[date.getMonth()]}
                        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                        className="bg-white rounded w-fit "
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: '10rem',
                                },
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 0,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 0,
                            },
                            '&.MuiOutlinedInput-root': {
                                paddingRight: '0 !important',
                            },
                            '&.MuiSelect-select': {
                                padding: 0,
                            },
                        }}
                    >
                        {months.map((month, index) => (
                            <MenuItem key={month} value={month}>
                                {month}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className=' flex items-center gap-[1rem]'>
                    <button onClick={decreaseMonth} className="focus:outline-none text-xl">
                        <img src={rightIcon} alt='icon' className=' rotate-[180deg] transform size-[24px] ' />
                    </button>
                    <button onClick={increaseMonth} className="focus:outline-none text-xl">
                        <img src={rightIcon} alt='icon' className=' size-[24px] ' />
                    </button>
                </div>

            </div>
        );
    };

    return (
        <div className="flex flex-col w-full items-center ">
            <DatePicker
                selected={selectedStart}
                onChange={(dates) => {
                    const [start, end] = dates;
                    setSelectedStart(start);
                    setSelectedEnd(end);
                }}
                startDate={selectedStart}
                endDate={selectedEnd}
                selectsRange
                inline
                renderCustomHeader={renderHeader}
                locale="en-US"
                showMonthDropdown
                className=' border-0 border-[#DA9658] p-0 m-0 border-none outline-0 outline-none'
                showYearDropdown
                dropdownMode="select"
                calendarClassName="calendar-custom"
            />
            <div className="flex w-full justify-between  px-4 mb-4 mt-4">
                <button
                    onClick={() => {
                        setSelectedStart(null); setSelectedEnd(null);
                        getAllNotes();
                        handleClose()
                    }}
                    className="mr-4 px-4 py-2 border border-gray-300 text-gray-700 rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={handleFilterWithCalendar}
                    className="px-4 py-2 bg-[#DA9658] text-white rounded"
                >

                    {loading ? 'Saving ...' : 'Save'}
                    {loading && (
                        <CircularProgress
                            size={20}
                            sx={{ color: "white" }}
                            className=" text-white ml-[.5rem]"
                        />
                    )}
                </button>
            </div>
        </div>
    );
}
