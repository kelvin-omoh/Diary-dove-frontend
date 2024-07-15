import React, { useContext, useEffect, useState } from 'react';
import { DateCalendar, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Usercontext } from '../../context/userContext';

const isInSameWeek = (dayA, dayB) => {
    if (dayB == null) {
        return false;
    }
    return dayA.isSame(dayB, 'week');
};

function Day(props) {
    const { day, selectedStart, selectedEnd, ...other } = props;

    const isInSelectedRange = selectedStart && selectedEnd
        ? (dayjs(day).isAfter(selectedStart, 'day') && dayjs(day).isBefore(selectedEnd, 'day')) ||
        dayjs(day).isSame(selectedStart, 'day') ||
        dayjs(day).isSame(selectedEnd, 'day')
        : false;

    const isStartDay = selectedStart && !selectedEnd && dayjs(day).isSame(selectedStart, 'day');

    const dayStyle = {
        borderRadius: 0,
        padding: '8px',
        margin: '0px',
        backgroundColor: isInSelectedRange || isStartDay ? '#DA9658' : 'white',
        color: isInSelectedRange || isStartDay ? 'white' : 'black',
        ...(day.day() === 0 && {
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
        }),
        ...(day.day() === 6 && {
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%',
        }),
    };

    return (
        <PickersDay
            {...other}
            day={day}
            disableMargin
            selected={false}
            style={dayStyle}
        />
    );
}

export default function CalendarWithNotes({ setAllTexts, allTexts }) {
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    const [hoveredDay, setHoveredDay] = useState(null);
    const [value, setValue] = useState(dayjs(''));
    const { userInfo } = useContext(Usercontext);

    useEffect(() => {
        const getAllNotes = async () => {
            try {
                const response = await axios.get("api/diaries/", {
                    headers: {
                        Authorization: userInfo?.token ? `Bearer ${userInfo?.token}` : "",
                        "Content-Type": "application/json",
                    },
                });
                console.log(response.data);
                setAllTexts(response.data.data);
            } catch (error) {
                toast.error("Error while getting notes");
                console.error("Error fetching notes:", error);
            }
        };
        getAllNotes();
    }, [userInfo?.token]);

    const handleDayClick = (day) => {
        if (!selectedStart || selectedEnd) {
            setSelectedStart(day);
            setSelectedEnd(null);
        } else if (day.isBefore(selectedStart)) {
            setSelectedEnd(selectedStart);
            setSelectedStart(day);
        } else {
            setSelectedEnd(day);
        }
    };

    const filteredNotes = React.useMemo(() => {
        if (!selectedStart || !selectedEnd) {
            return allTexts;
        }
        return allTexts.filter((note) => {
            const noteDate = dayjs(note.date);
            return (noteDate.isAfter(selectedStart.subtract(1, 'day')) && noteDate.isBefore(selectedEnd.add(1, 'day'))) ||
                noteDate.isSame(selectedStart, 'day') ||
                noteDate.isSame(selectedEnd, 'day');
        });
    }, [selectedEnd, selectedStart, allTexts]);

    useEffect(() => {
        setAllTexts(filteredNotes);
    }, [filteredNotes, setAllTexts]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: 'auto' }}>
                <div style={{ width: 'fit-content' }}>
                    <DateCalendar
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        showDaysOutsideCurrentMonth
                        displayWeekNumber
                        slots={{
                            day: (props) => (
                                <Day
                                    {...props}
                                    selectedStart={selectedStart}
                                    selectedEnd={selectedEnd}
                                    isInRange={props.isInRange}
                                />
                            ),
                        }}
                        slotProps={{
                            day: (ownerState) => ({
                                selectedStart,
                                selectedEnd,
                                onPointerEnter: () => setHoveredDay(ownerState.day),
                                onPointerLeave: () => setHoveredDay(null),
                                onClick: () => handleDayClick(ownerState.day),
                            }),
                        }}
                    />
                </div>
            </div>
        </LocalizationProvider>
    );
}
