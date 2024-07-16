import React, { useState } from 'react'
import HomeTab from './Tabs'
import trash from '../../assets/trash2.png'
import list from '../../assets/Vector list.png'
import edit from '../../assets/Vector 2.png'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import { AiOutlineBook } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { addHours, format, parseISO } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { PaginationItem } from '@mui/material'



// const allNotes = [
//     {
//         id: 1,
//         time: '12 pm',
//         date: dayjs('2024-05-29'),
//         description: 'Lorem ipsum dolor sit amet consectetur. Viverra mi suspendisse in sit volutpat lectus nam augue. In potenti suspendisse faucibus urna volutpat amet ullamcorper aliquet sit.'
//     },
//     {
//         id: 2,
//         time: '1 pm',
//         date: dayjs('2024-05-30'),
//         description: 'Quisque scelerisque eros ut elit sollicitudin, nec venenatis lectus commodo. Integer tincidunt risus ut sapien lacinia, ac egestas leo facilisis.'
//     },
//     {
//         id: 3,
//         time: '2 pm',
//         date: dayjs('2024-07-01'),
//         description: 'Nullam sed libero bibendum, tempus velit in, posuere neque. Sed vehicula ipsum et diam aliquet, sit amet fermentum ligula fringilla.'
//     },
//     {
//         id: 4,
//         time: '3 pm',
//         date: dayjs('2024-07-02'),
//         description: 'Aenean efficitur velit ac eros tempor, sit amet tincidunt mi feugiat. Maecenas vitae felis vel magna laoreet elementum.'
//     },
//     {
//         id: 5,
//         time: '4 pm',
//         date: dayjs('2024-07-03'),
//         description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec nunc eget libero efficitur aliquet.'
//     },
//     {
//         id: 6,
//         time: '5 pm',
//         date: dayjs('2024-07-04'),
//         description: 'Cras condimentum tortor nec odio facilisis, sed cursus ipsum varius. Sed vehicula urna ut sem vehicula, nec sollicitudin orci tempor.'
//     },
//     {
//         id: 7,
//         time: '6 pm',
//         date: dayjs('2024-07-05'),
//         description: 'Vivamus scelerisque ligula nec elit lacinia, nec tempus sapien laoreet. Phasellus ut urna ac justo interdum suscipit ut sed purus.'
//     },
//     {
//         id: 8,
//         time: '7 pm',
//         date: dayjs('2024-07-07'),
//         description: 'In non dui sit amet nisi fermentum tincidunt. Nulla facilisi. Proin fringilla turpis nec ex scelerisque, sit amet suscipit sapien hendrerit.'
//     },
//     {
//         id: 9,
//         time: '8 pm',
//         date: dayjs('2024-07-07'),
//         description: 'Fusce a nunc nec orci convallis vehicula. Vivamus ac dolor lacinia, laoreet lorem nec, viverra nunc. Aliquam id odio ut lorem interdum pretium.'
//     },
//     {
//         id: 10,
//         time: '9 pm',
//         date: dayjs('2024-07-08'),
//         description: 'Sed non urna varius, pharetra erat at, egestas est. Vestibulum ac dolor nec libero dictum gravida vel sit amet massa.'
//     },
//     {
//         id: 11,
//         time: '10 pm',
//         date: dayjs('2024-07-09'),
//         description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam pharetra velit non libero ullamcorper, a pharetra mi scelerisque.'
//     },
//     {
//         id: 12,
//         time: '11 pm',
//         date: dayjs('2024-07-10'),
//         description: 'Sed vehicula urna ut sem vehicula, nec sollicitudin orci tempor. In non dui sit amet nisi fermentum tincidunt. Nulla facilisi.'
//     },
//     {
//         id: 13,
//         time: '12 am',
//         date: dayjs('2024-07-11'),
//         description: 'Nullam sed libero bibendum, tempus velit in, posuere neque. Vivamus scelerisque ligula nec elit lacinia, nec tempus sapien laoreet.'
//     },
//     {
//         id: 14,
//         time: '1 am',
//         date: dayjs('2024-07-12'),
//         description: 'Quisque scelerisque eros ut elit sollicitudin, nec venenatis lectus commodo. Sed non urna varius, pharetra erat at, egestas est.'
//     },
//     {
//         id: 15,
//         time: '2 am',
//         date: dayjs('2024-07-13'),
//         description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec nunc eget libero efficitur aliquet.'
//     }
// ];



const Notes = ({ allTexts, onEdit, onDelete, setAllTexts }) => {


    const [isGrid, setIsGrid] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = isGrid ? 8 : 3;

    useGSAP(() => {
        gsap.from('.notes', {
            opacity: 0,
            y: 400,
            delay: .7
        })
        gsap.to('.notes', {
            opacity: 1,
            y: 0,
            delay: .9
        })
    }, [])


    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNotes = allTexts.slice(startIndex, startIndex + itemsPerPage);
    const pageCount = Math.ceil(allTexts.length / itemsPerPage);


    const formatNigerianTime = (isoDateString) => {
        try {
            const date = parseISO(isoDateString); // Parse ISO string to Date object
            const nigerianTime = addHours(date, 0); // Add 1 hour to convert from UTC to WAT
            const formattedTime = format(nigerianTime, 'h:mm a'); // Format time in 12-hour format
            const formattedDate = format(nigerianTime, 'MMMM d, yyyy'); // Format date as yyyy-MM-dd
            return `${formattedTime.toLowerCase()} | ${formattedDate}`; // Combine time and date in desired format
        } catch (error) {
            console.error('Error formatting time:', error);
            return 'Invalid Time'; // or any fallback value
        }
    };



    return (
        <div className=' w-full px-[24px] md:px-[80px] mt-[49px] '>
            <LocalizationProvider dateAdapter={AdapterDayjs}>


                <div className={` ${isGrid ? 'h-[85vh]' : 'h-[100vh]'} relative  w-full`}>
                    {/* <HomeTab allTexts={allTexts} isGrid={isGrid} setIsGrid={setIsGrid} /> */}
                    <HomeTab setAllTexts={setAllTexts} allTexts={allTexts} isGrid={isGrid} setIsGrid={setIsGrid} />

                    {/* Notes */}
                    {paginatedNotes && paginatedNotes.length === 0 && (
                        <p className='mt-[5.1rem] flex gap-2 justify-center text-gray-400 text-[3rem] items-center mx-auto w-full'>
                            <BiBookOpen size={60} /> Your diary is Empty ooooo.
                        </p>
                    )}
                    <div className={`w-full notes grid ${isGrid ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'} gap-[16px]`}>
                        {paginatedNotes && paginatedNotes.map((note, index) => (
                            <div key={note.id} className='flex justify-between flex-col md:max-h-[208px] h-[200px] bg-[#FFFFFF] p-[24px]'>
                                <div>
                                    <p className='text-[#E0A774] text-[12px] justify-start flex '>{formatNigerianTime(note.date)}</p>
                                    <div className='mt-[8px]'>
                                        {note?.content && (
                                            <p className='hidden md:flex text-sm text-[#303236] justify-start text-left leading-[21px] overflow-hidden max-w-full'>
                                                {note?.content.length > 230
                                                    ? (isGrid ? `${note?.content.slice(0, 140)}${note?.content.length > 140 ? '...' : ''}` : `${note?.content.slice(0, 900)}${note?.content.length > 900 ? '...' : ''}`)
                                                    : note?.content
                                                }
                                            </p>
                                        )}
                                        {note?.content && (
                                            <p className='flex md:hidden text-[14px] md:text-[14px] text-[#303236] justify-start text-start leading-[16px] md:leading-[21px] '>
                                                {note?.content.length > 230 ? `${note?.content.slice(0, isGrid ? 90 : 200)}${note?.content.length > (isGrid ? 90 : 200) ? '...' : ''}` : note?.content}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='mt-[18px] md:mt-[24.94px] flex items-center justify-start gap-[10.4px]'>
                                    <button>
                                        <img src={trash} onClick={() => onDelete(note.id)} alt={'trash'} className="h-[16.13px]" />
                                    </button>
                                    <button>
                                        <img src={edit} onClick={() =>
                                            onEdit(note.id)
                                        } alt={'edit'} className="h-[16.13px]" />
                                    </button>
                                    <button>
                                        <img src={list} onClick={() =>
                                            onEdit(note.id)
                                        } alt={'list'} className="h-[16.13px]" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* {paginatedNotes.map((note, index) => (
                            <div key={note.id} className='flex justify-between flex-col md:max-h-[208px] h-[200px] bg-[#FFFFFF] p-[24px]'>
                                <div>
                                    <p className='text-[#E0A774] text-[12px] justify-start flex '>{note.time} | {note.date.format('YYYY-MM-DD')}</p>
                                    <div className=' mt-[8px]'>
                                        <p className='hidden md:flex text-[14px] text-[#303236] justify-start text-start leading-[21px] text-'>
                                            {note.description.length > 230 ? ` ${note.description.slice(0, 300)}...` : note.description}
                                        </p>
                                        <p className='flex md:hidden text-[14px] md:text-[14px] text-[#303236] justify-start text-start leading-[16px] md:leading-[21px] '>
                                            {note.description.length > 230 ? ` ${note.description.slice(0, 90)}...` : note.description}
                                        </p>
                                    </div>
                                </div>
                                <div className='mt-[18px] md:mt-[24.94px] flex items-center justify-start gap-[10.4px]'>
                                    <button>
                                        <img src={trash} onClick={() => onDelete(index)} alt={'trash'} className="h-[16.13px]" />
                                    </button>
                                    <button>
                                        <img src={edit} onClick={() => onEdit(index)} alt={'edit'} className="h-[16.13px]" />
                                    </button>
                                    <button>
                                        <img src={list} onClick={() => onEdit(index)} alt={'list'} className="h-[16.13px]" />
                                    </button>
                                </div>
                            </div>
                        ))} */}

                    </div>

                    <Stack spacing={2} className={` absolute   left-0 ${isGrid ? 'bottom-[5.5rem]' : 'bottom-[0.5rem]'}  mt-4`}>
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={handleChangePage}
                            renderItem={(item) => (
                                <PaginationItem {...item} />
                            )}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    display: 'inline', // Ensure inline display for PaginationItem
                                    color: 'black',
                                    backgroundColor: '#F1F2F3',
                                    '&:hover': {
                                        backgroundColor: '#F1F2F3',
                                    },
                                },
                                '& .MuiPaginationItem-page.Mui-selected': {
                                    backgroundColor: '#DA9658',
                                    color: 'white',
                                },
                                '& .MuiPaginationItem-page:hover': {
                                    backgroundColor: '#da97588f',
                                    color: 'white',
                                },
                                '& .MuiPaginationItem-ellipsis': {
                                    display: 'none', // Hide ellipsis (...)
                                },
                                '& .MuiPaginationItem-previous, & .MuiPaginationItem-next': {
                                    backgroundColor: 'white', // Background color for left and right arrows
                                    color: 'black', // Text color for left and right arrows
                                }
                            }}
                        />
                    </Stack>
                </div>

            </LocalizationProvider>
        </div>
    )
}

export default Notes
