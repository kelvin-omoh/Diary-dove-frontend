import React, { useEffect, useState } from 'react';
import { Button, Popover } from '@mui/material';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import menu from '../../assets/Menu Candy Box.png';
import list from '../../assets/Vector.png';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Box } from '@mui/material';
import CalendarWithNotes from './Calender';

dayjs.extend(isBetween);



const HomeTab = ({ setAllTexts, allTexts, isGrid, setIsGrid, ss, sss }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateSelect = (day) => {
        if (!selectedStartDate || selectedEndDate) {
            setSelectedStartDate(day);
            setSelectedEndDate(null);
        } else if (day.isBefore(selectedStartDate)) {
            setSelectedStartDate(day);
            setSelectedEndDate(null);
        } else {
            setSelectedEndDate(day);
        }
    };



    return (
        <div className='w-full mb-[32px] flex justify-between items-center'>
            <div className='bg-[#E0A7741A] flex gap-[4px] w-fit px-[4px] '>
                <button
                    onClick={() => setIsGrid(true)}
                    className={`transition-all duration-300 ease-out ${isGrid && 'bg-[white]'} w-[48px] md:w-[148px] justify-center px-[16px] py-[8px] gap-[8px] rounded-lg flex my-[4px] items-center`}
                >
                    <img className='size-[18px]' src={menu} alt='grid' />
                    <p className='hidden md:bold'>Grid View</p>
                </button>
                <button
                    onClick={() => setIsGrid(false)}
                    className={`transition-all duration-300 ease-out ${!isGrid && 'bg-[white]'} w-[48px] md:w-[148px] justify-center px-[16px] py-[8px] gap-[8px] rounded-lg flex my-[4px] items-center`}
                >
                    <img className='w-[14.06px] h-[10.5px]' src={list} alt='grid' />
                    <p className='hidden md:bold'>List View</p>
                </button>
            </div>
            <div>
                <Button
                    id='basic-button'

                    onClick={handleClick}
                    sx={{
                        color: '#8F96A3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3,
                        border: '1px solid #a5a5a5',
                        borderRadius: '8px',
                        padding: '8px 16px',
                    }}
                >
                    All Time {open ? <FaChevronUp /> : <FaChevronDown />}
                </Button>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box p={2}>
                        <CalendarWithNotes setAllTexts={setAllTexts} allTexts={allTexts} />
                        {console.log(allTexts)}
                    </Box>
                </Popover>






            </div>
        </div>
    );
}


export default HomeTab