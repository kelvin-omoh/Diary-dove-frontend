import React, { useState } from 'react'
import HomeTab from './Tabs'
import trash from '../../assets/trash2.png'
import list from '../../assets/Vector list.png'
import edit from '../../assets/Vector 2.png'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
const Notes = () => {
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

    return (
        <div className=' px-[80px] mt-[49px] '>
            <div className=''>
                <HomeTab isGrid={isGrid} setIsGrid={setIsGrid} />

                {/* Notes */}
                <div className={` notes grid ${isGrid ? 'grid-cols-4' : 'grid-cols-1'}  gap-[16px]`}>
                    {allNotes.map((note) => (
                        <div key={note.id} className=' bg-[#FFFFFF] p-[24px]'>
                            <p className='text-[#E0A774] text-[12px] justify-start flex '>{note.date} | {note.date}</p>
                            <div className=' mt-[8px]'>
                                <p className=' text-[14px] text-[#303236] justify-start flex text-start leading-[21px] text-'>{note.description}</p>
                            </div>
                            <div className=' mt-[24.94px] flex items-center justify-start gap-[10.4px]'>
                                <button>
                                    <img src={trash} alt={'trash'} className=" h-[16.13px]" />
                                </button>
                                <button>
                                    <img src={edit} alt={'trash'} className=" h-[16.13px]" />
                                </button>
                                <button>
                                    <img src={list} alt={'trash'} className=" h-[16.13px]" />
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
