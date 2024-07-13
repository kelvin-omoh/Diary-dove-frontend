import React, { useState } from 'react'
import HomeTab from './Tabs'
import trash from '../../assets/trash2.png'
import list from '../../assets/Vector list.png'
import edit from '../../assets/Vector 2.png'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import { AiOutlineBook } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { format } from 'date-fns';

const Notes = ({ allTexts, onEdit, onDelete }) => {
    const allNotes = [
        {
            id: 1,
            time: '12 pm',
            date: 'May 29, 2024',
            description: 'Lorem ipsum dolor sit amet consectetur. Viverra mi suspendisse in sit volutpat lectus nam augue. In potenti suspendisse faucibus urna volutpat amet ullamcorper aliquet sit.'
        },
        {
            id: 2,
            time: '1 pm',
            date: 'May 30, 2024',
            description: 'Quisque scelerisque eros ut elit sollicitudin, nec venenatis lectus commodo. Integer tincidunt risus ut sapien lacinia, ac egestas leo facilisis.'
        },
        {
            id: 3,
            time: '2 pm',
            date: 'June 1, 2024',
            description: 'Nullam sed libero bibendum, tempus velit in, posuere neque. Sed vehicula ipsum et diam aliquet, sit amet fermentum ligula fringilla.'
        },
        {
            id: 4,
            time: '3 pm',
            date: 'June 2, 2024',
            description: 'Aenean efficitur velit ac eros tempor, sit amet tincidunt mi feugiat. Maecenas vitae felis vel magna laoreet elementum.'
        },
        {
            id: 5,
            time: '4 pm',
            date: 'June 3, 2024',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec nunc eget libero efficitur aliquet.'
        },
        {
            id: 6,
            time: '5 pm',
            date: 'June 4, 2024',
            description: 'Cras condimentum tortor nec odio facilisis, sed cursus ipsum varius. Sed vehicula urna ut sem vehicula, nec sollicitudin orci tempor.'
        },
        {
            id: 7,
            time: '6 pm',
            date: 'June 5, 2024',
            description: 'Vivamus scelerisque ligula nec elit lacinia, nec tempus sapien laoreet. Phasellus ut urna ac justo interdum suscipit ut sed purus.'
        },
        {
            id: 8,
            time: '7 pm',
            date: 'June 6, 2024',
            description: 'In non dui sit amet nisi fermentum tincidunt. Nulla facilisi. Proin fringilla turpis nec ex scelerisque, sit amet suscipit sapien hendrerit.'
        },
        {
            id: 9,
            time: '8 pm',
            date: 'June 7, 2024',
            description: 'Fusce a nunc nec orci convallis vehicula. Vivamus ac dolor lacinia, laoreet lorem nec, viverra nunc. Aliquam id odio ut lorem interdum pretium.'
        },
        {
            id: 10,
            time: '9 pm',
            date: 'June 8, 2024',
            description: 'Sed non urna varius, pharetra erat at, egestas est. Vestibulum ac dolor nec libero dictum gravida vel sit amet massa.'
        },
        {
            id: 11,
            time: '10 pm',
            date: 'June 9, 2024',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam pharetra velit non libero ullamcorper, a pharetra mi scelerisque.'
        },
        {
            id: 12,
            time: '11 pm',
            date: 'June 10, 2024',
            description: 'Sed vehicula urna ut sem vehicula, nec sollicitudin orci tempor. In non dui sit amet nisi fermentum tincidunt. Nulla facilisi.'
        },
        {
            id: 13,
            time: '12 am',
            date: 'June 11, 2024',
            description: 'Nullam sed libero bibendum, tempus velit in, posuere neque. Vivamus scelerisque ligula nec elit lacinia, nec tempus sapien laoreet.'
        },
        {
            id: 14,
            time: '1 am',
            date: 'June 12, 2024',
            description: 'Quisque scelerisque eros ut elit sollicitudin, nec venenatis lectus commodo. Sed non urna varius, pharetra erat at, egestas est.'
        },
        {
            id: 15,
            time: '2 am',
            date: 'June 13, 2024',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec nunc eget libero efficitur aliquet.'
        }
    ];


    const [isGrid, setIsGrid] = useState(true);


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


    console.log(allTexts);

    const formatTime = (isoDateString) => {
        try {
            const date = new Date(isoDateString);
            // Get hours and minutes
            let hours = date.getHours();
            const minutes = date.getMinutes();

            // Convert hours to 12-hour format and determine am/pm
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // Handle midnight (0 hours)

            // Format the time with correct minutes formatting
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            // Format the time
            return `${hours}:${formattedMinutes} ${ampm}`;


        } catch (error) {
            console.error('Error parsing or formatting date:', error);
            return 'Invalid Time'; // or any fallback value
        }
    };
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return format(date, 'MMMM d, yyyy');
    };
    return (
        <div className=' w-full px-[24px] md:px-[80px] mt-[49px] '>
            <div className=' h-[80vh] w-full'>
                <HomeTab isGrid={isGrid} setIsGrid={setIsGrid} />

                {/* Notes */}
                {allTexts && allTexts.length === 0 && (
                    <p className='mt-[5.1rem] flex gap-2 justify-center text-gray-400 text-[3rem] items-center mx-auto w-full'>
                        <BiBookOpen size={60} /> Your diary is Empty.
                    </p>
                )}
                <div className={`w-full notes grid ${isGrid ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'} gap-[16px]`}>
                    {allTexts && allTexts.map((note, index) => (
                        <div key={note.id} className='flex justify-between flex-col md:max-h-[208px] h-[200px] bg-[#FFFFFF] p-[24px]'>
                            <div>
                                <p className='text-[#E0A774] text-[12px] justify-start flex '>{formatTime(note.time)} | {formatDate(note.date)}</p>
                                <div className='mt-[8px]'>
                                    {note.content && (
                                        <p className='hidden md:flex text-[14px] text-[#303236] justify-start text-start leading-[21px] text-'>
                                            {note.content.length > 230 ? `${note.content.slice(0, isGrid ? 300 : 600)}...` : note.content}
                                        </p>
                                    )}
                                    {note.content && (
                                        <p className='flex md:hidden text-[14px] md:text-[14px] text-[#303236] justify-start text-start leading-[16px] md:leading-[21px] '>
                                            {note.content.length > 230 ? `${note.content.slice(0, isGrid ? 90 : 200)}...` : note.content}
                                        </p>
                                    )}
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
                    ))}



                </div>


            </div>

        </div>
    )
}

export default Notes
